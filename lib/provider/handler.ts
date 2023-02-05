import { WalletRequestHandler, WalletUserPrompter, Web3Signer, Web3Provider } from '@0xsodium/provider';
import { testnetNetworks } from '@0xsodium/network';
import { Account, AccountOptions } from '@0xsodium/wallet';
import { Platform } from 'react-native';
import { Platform as SodiumPlatform } from '@0xsodium/config';
import { Wallet } from 'ethers';
import { WalletPrompter } from './prompter';
import { clearSession, loadSession, saveSession } from '../common/asyncStorage';
import { walletAtom, walletHandlerAtom } from './atom';
import { Session } from './types';

const prompter: WalletUserPrompter = new WalletPrompter();
const networks = testnetNetworks.filter(n => n.name == "mumbai").map((n) => {
    return {
        ...n,
        rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/fIbA8DRSTQXPAhcHKiPFo19SPqhHNHam",
        bundlerUrl: "http://localhost:3002",
    }
});

export const logout = () => {
    clearSession().then(() => walletAtom.set(null));
}

walletAtom.subscribe(newValue => {
    if (newValue == null) {

    } else {
        saveSession(newValue.session);
    }
})

export const initHandler = (): WalletRequestHandler => {
    const walletHandler = new WalletRequestHandler(
        null,
        prompter,
        [],
        networks
    );
    walletHandler.setDefaultNetwork(
        networks[0].chainId,
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
    await walletHandler.signIn(account, {
        connect: connect,
    });
    const walletAddress = await walletHandler.getAddress();
    const provider = new Web3Provider(walletHandler, walletHandler.defaultNetworkId);
    const web3signer = new Web3Signer(provider, parseInt(`${walletHandler.defaultNetworkId}`))
    walletAtom.set({
        address: walletAddress,
        handler: walletHandler,
        signer: account,
        web3signer: web3signer,
        session,
    });
}

export const initWalletByTest = async (email: string) => {
    const session: Session = {
        platform: getCurrentSodiumPlatform(),
        sodiumUserId: email,
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
    signIn(account, session, true);
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