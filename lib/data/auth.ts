import { initWalletWithSession, initWalletWithEOA, walletAtom, onboardAPIAtom } from '../provider';
import { transactionQueue } from "../transaction";
import { transactionPending } from '../transaction/pending';
import { authAtom } from './authAtom';
export * from './authAtom';
import { setProfile } from './profile';
import { ProfileData } from '../define';
import { AuthSessionResponse, getAuthService } from '../auth';
import { Wallet, Signer as ETHSigner } from 'ethers';
import { saveSessionByWallet } from '../common';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginOut = async () => {
  const onboardAPI = onboardAPIAtom.get();
  const auth = authAtom.get();
  if (onboardAPI) {
    await onboardAPI.disconnectWallet({
      label: auth.session.authre.displayName
    });
  }

  return AsyncStorage.clear().then(() => walletAtom.set(null))
}

let latestTimer: any = null;

walletAtom.subscribe(newValue => {
  if (newValue == null) {

  } else {
    // saveSession(newValue.session);

    // temp fix
    // 在UI让用户更新钱包合约
    // newValue.signer.getWalletUpgradeTransactions().then(txs => {
    //     if (txs.length > 0) {
    //         newValue.signer.sendTransaction(txs);
    //     }

    //     console.debug("auto update wallet", txs.length, txs)
    // })

    // / 每5秒查询一次session是否有效
    const authService = getAuthService();

    if (newValue.session && newValue.session.sodiumNetworkResponse) {
      const sessionExpires = newValue.session.sodiumNetworkResponse.authSession.sessionExpires
      const now = parseInt(`${new Date().getTime() / 1000}`);

      // 提前一小时过期防止发起交易的途中过期
      if (sessionExpires - 3600 < now) {
        loginOut();
      }

      if (latestTimer) {
        clearInterval(latestTimer);
      }
      latestTimer = setInterval(() => {
        authService.checkSessionKey({
          accountId: newValue.address.toLocaleLowerCase(),
          sessionKey: newValue.session.sessionKeyOwnerAddress
        }).then(res => {
          if (!res.valid) {
            loginOut()
          }
        })
      }, 5000);
    }
  }
})


authAtom.subscribe((value) => {
  if (value.isLogin) {
    transactionQueue.loadAsyncStorage();
    transactionPending.loadAsyncStorage();
  }

  if (value.session) {
    const authres = value.session.authre;

    setProfile({
      'authorizedSource': authres.authProvider,
      'userName': authres.displayName,
    } as ProfileData);
  }
});

export const loginIn = async (
  sodiumNetworkResponse: AuthSessionResponse,
  sessionKeyOwner: Wallet,
) => {
  await initWalletWithSession(
    sodiumNetworkResponse,
    sessionKeyOwner,
  );

  await saveSessionByWallet({
    authResp: sodiumNetworkResponse,
    w: sessionKeyOwner
  });
}

export const loginInWithEOA = async (
  owner: ETHSigner,
  label: string,
  autoConnect: boolean
) => {
  return initWalletWithEOA(
    owner,
    label,
    autoConnect
  );
}