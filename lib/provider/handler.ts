import { WalletRequestHandler, WalletUserPrompter, Web3Signer, Web3Provider } from '@0xsodium/provider';
import { Account, AccountOptions } from '@0xsodium/wallet';
import { Platform } from 'react-native';
import { Platform as SodiumPlatform } from '@0xsodium/config';
import { Wallet } from '../fixedEthersWallet';
import { WalletPrompter } from './prompter';
import { loadSession, saveSession } from '../common/asyncStorage';
import { walletAtom, walletHandlerAtom } from './atom';
import { Session } from './types';
import { testNetworks, mainNetworks, getCurrentChainId, currentChainIdAtom, networks } from '../network';
import AsyncStorage from '@react-native-async-storage/async-storage';

const prompter: WalletUserPrompter = new WalletPrompter();

export const logout = () => {
    AsyncStorage.clear().then(() => walletAtom.set(null))
    // clearSession().then(() => walletAtom.set(null));
}

walletAtom.subscribe(newValue => {
    if (newValue == null) {

    } else {
        saveSession(newValue.session);

        // temp fix
        // 在UI让用户更新钱包合约
        newValue.signer.getWalletUpgradeTransactions().then(txs => {
            if (txs.length > 0) {
                newValue.signer.sendTransaction(txs);
            }

            console.debug("auto update wallet", txs.length, txs)
        })
    }
})

currentChainIdAtom.subscribe(newChainId => {
    const walletHandler = walletHandlerAtom.get();
    if (walletHandler) {
        walletHandler.setDefaultNetwork(newChainId);
    }
})

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
    const s = await loadSession();
    if (s) {
        const options: AccountOptions = {
            networks: networks,
            initialConfig: {
                platform: s.platform,
                sodiumUserId: s.sodiumUserId,
            }
        };
        const w = s.w;
        const account = new Account(options, w);
        await signIn(account, s, false);
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

export const initWallet = async (authId: string) => {
    const session: Session = {
        platform: getCurrentSodiumPlatform(),
        sodiumUserId: authId,
        w: Wallet.createRandom()
    }
    const options: AccountOptions = {
        networks: networks,
        initialConfig: {
            platform: session.platform,
            sodiumUserId: session.sodiumUserId,
        }
    };
    const account = new Account(options, session.w);
    return signIn(account, session, true);
}

function getCurrentSodiumPlatform(): SodiumPlatform {
    if (Platform.OS == "web") {
        return "web";
    } else if (Platform.OS == "ios" || Platform.OS == "android") {
        return "mobile";
    } else if (Platform.OS == "windows" || Platform.OS == "macos") {
        return "pc";
    }
    throw new Error("invalid platform");
}