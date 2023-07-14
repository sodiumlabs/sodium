import { WalletRequestHandler, WalletUserPrompter, Web3Signer, Web3Provider } from '@0xsodium/provider';
import { Account, AccountOptions } from '@0xsodium/wallet';
import { WalletPrompter } from './prompter';
import { loadSession } from '../common/asyncStorage';
import { walletAtom, walletHandlerAtom } from './atom';
import { Session } from './types';
import { testNetworks, mainNetworks, getCurrentChainId, currentChainIdAtom, networks } from '../network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthSessionResponse, getAuthService } from '../auth';
import { Signer as AbstractSigner, Wallet } from 'ethers';

const prompter: WalletUserPrompter = new WalletPrompter();

export const logout = async () => {
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

        /// 每5秒查询一次session是否有效
        const authService = getAuthService();

        // if (newValue.session) {
        //     if (latestTimer) {
        //         clearInterval(latestTimer);
        //     }
        //     latestTimer = setInterval(() => {
        //         authService.checkSessionKey({
        //             accountId: newValue.address.toLocaleLowerCase(),
        //             sessionKey: newValue.session.sessionKeyOwnerAddress
        //         }).then(res => {
        //             if (!res.valid) {
        //                 logout()
        //             }
        //         })
        //     }, 5000);
        // }
    }
})

currentChainIdAtom.subscribe(newChainId => {
    const walletHandler = walletHandlerAtom.get();
    if (walletHandler) {
        if (walletHandler.defaultNetworkId != newChainId) {
            walletHandler.setDefaultNetwork(newChainId);
        }
    }

    const wallet = walletAtom.get();
    if (wallet && wallet.web3signer) {
        wallet.web3signer.setDefaultChainId(newChainId);
    }
});

export const initHandler = (): WalletRequestHandler => {
    const walletHandler = new WalletRequestHandler(
        null,
        prompter,
        mainNetworks,
        testNetworks
    );
    walletHandler.setDefaultNetwork(
        getCurrentChainId(),
        false
    );
    walletHandlerAtom.set(walletHandler);
    return walletHandler;
}

export const asyncSession = async () => {
    return;
    const s = await loadSession();
    if (s) {
        const sessionKeyOwner = new Wallet(s.extData);
        const sodiumNetworkResponse = s.authResp;
        const ownerAddress = await sessionKeyOwner.getAddress();
        const session: Session = {
            sodiumNetworkResponse: sodiumNetworkResponse,
            sessionKeyOwner: sessionKeyOwner,
            sessionKeyOwnerAddress: ownerAddress,
        }
        const options: AccountOptions = {
            networks: networks,
            initialConfig: {
                accountSlat: sodiumNetworkResponse.account.salt,
                address: sodiumNetworkResponse.account.id,
                isSafe: false,
            }
        };
        const account = new Account(
            options,
            session.sessionKeyOwner,
            {
                addSessionStruct: sodiumNetworkResponse.authSession,
                authProof: sodiumNetworkResponse.authSessionProof
            }
        );
        return signIn(account, session, true);
    }
}

const signIn = async (account: Account, session: Session, connect: boolean) => {
    const walletHandler = walletHandlerAtom.get();
    account.setNetworks(mainNetworks, testNetworks, getCurrentChainId());
    await walletHandler.signIn(account, {
        connect: connect,
    });
    const walletAddress = await walletHandler.getAddress();
    const provider = new Web3Provider(walletHandler, walletHandler.defaultNetworkId);
    const web3signer = new Web3Signer(provider, parseInt(`${walletHandler.defaultNetworkId}`));
    walletAtom.set({
        address: walletAddress,
        handler: walletHandler,
        signer: account,
        web3signer: web3signer,
        session,
    });
}

export const initWalletWithSession = async (
    sodiumNetworkResponse: AuthSessionResponse,
    sessionKeyOwner: AbstractSigner,
) => {
    const ownerAddress = await sessionKeyOwner.getAddress();
    const session: Session = {
        sodiumNetworkResponse: sodiumNetworkResponse,
        sessionKeyOwner: sessionKeyOwner,
        sessionKeyOwnerAddress: ownerAddress,
    }
    const options: AccountOptions = {
        networks: networks,
        initialConfig: {
            accountSlat: sodiumNetworkResponse.account.salt,
            address: sodiumNetworkResponse.account.id,
            isSafe: false,
        }
    };
    const account = new Account(
        options,
        session.sessionKeyOwner,
        {
            addSessionStruct: sodiumNetworkResponse.authSession,
            authProof: sodiumNetworkResponse.authSessionProof
        }
    );
    return signIn(account, session, true);
}