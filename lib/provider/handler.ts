import { WalletRequestHandler, WalletUserPrompter, Web3Signer, Web3Provider } from '@0xsodium/provider';
import { testnetNetworks } from '@0xsodium/network';
import { Account, AccountOptions } from '@0xsodium/wallet';
import { Platform } from 'react-native';
import { Platform as SodiumPlatform } from '@0xsodium/config';
import { atom } from 'nanostores';
import { Wallet } from 'ethers';
import { WalletPrompter } from './prompter';
import { loadSession } from '../common/asyncStorage';

export type SodiumWallet = {
    address: string,
    handler: WalletRequestHandler,
    signer: Account,
    web3signer: Web3Signer
}

const prompter: WalletUserPrompter = new WalletPrompter();
const networks = testnetNetworks.filter(n => n.name == "mumbai").map((n) => {
    return {
        ...n,
        rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/fIbA8DRSTQXPAhcHKiPFo19SPqhHNHam",
        bundlerUrl: "http://localhost:3002",
    }
});
// const prompter: WalletUserPrompter = null;

export const walletAtom = atom<SodiumWallet | null>(null);
export const walletHandlerAtom = atom<WalletRequestHandler>();

export const logout = () => {
    walletAtom.set(null);
}

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
        await signIn(account, false);
    }
}

const signIn = async (account: Account, connect: boolean) => {
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
        web3signer: web3signer
    });
}

export const initWalletByTest = async (email: string) => {
    const options: AccountOptions = {
        networks: networks,
        initialConfig: {
            platform: getCurrentSodiumPlatform(),
            sodiumUserId: email,
        }
    };
    const w = Wallet.createRandom();
    const account = new Account(options, w);
    signIn(account, true);
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