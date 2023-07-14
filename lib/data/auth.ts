import { initWalletWithSession, logout } from '../provider';
import { transactionQueue } from "../transaction";
import { transactionPending } from '../transaction/pending';
import { authAtom } from './authAtom';
export * from './authAtom';
import { setProfile } from './profile';
import { ProfileData } from '../define';
import { AuthSessionResponse } from '../auth';
import { Wallet } from 'ethers';

authAtom.subscribe((value) => {
  if (value.isLogin) {
    transactionQueue.loadAsyncStorage();
    transactionPending.loadAsyncStorage();
  }

  if (value.session) {
    const authres = value.session.sodiumNetworkResponse;

    setProfile({
      'authorizedSource': authres.authProvider,
      'userName': authres.displayName,
    } as ProfileData);
  }
});

export const loginOut = async () => {
  logout();
}

export const loginIn = async (
  sodiumNetworkResponse: AuthSessionResponse,
  sessionKeyOwner: Wallet,
) => {
  await initWalletWithSession(
    sodiumNetworkResponse,
    sessionKeyOwner,
  );

  // await saveSessionByWallet({
  //   authResp: sodiumNetworkResponse,
  //   w: sessionKeyOwner
  // });
}