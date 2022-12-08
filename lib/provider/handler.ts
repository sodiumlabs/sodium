import { WalletRequestHandler, WalletUserPrompter, Web3Signer, Web3Provider } from '@0xsodium/provider';
import { testnetNetworks } from '@0xsodium/network';
import { Account, AccountOptions } from '@0xsodium/wallet';
import { Platform } from 'react-native';
import { Platform as SodiumPlatform } from '@0xsodium/config';
import { atom } from 'nanostores';
import { Wallet } from 'ethers';
import { WalletPrompter } from './prompter';

export type SodiumWallet = {
    address: string,
    handler: WalletRequestHandler,
    web3signer: Web3Signer
}

const prompter: WalletUserPrompter = new WalletPrompter();
// const prompter: WalletUserPrompter = null;

export const walletAtom = atom<SodiumWallet | null>(null);

export const logout = () => {
    walletAtom.set(null);
}

export const initWalletByTest = async (email: string) => {
    const networks = testnetNetworks.filter(n => n.name == "mumbai").map((n) => {
        return {
            ...n,
            rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/fIbA8DRSTQXPAhcHKiPFo19SPqhHNHam",
            bundlerUrl: "http://localhost:3002",
        }
    });
    const walletHandler = new WalletRequestHandler(
        null,
        prompter,
        [],
        networks
    );
    walletHandler.walletSession
    walletHandler.setDefaultNetwork(
        networks[0].chainId,
        false
    );
    const options: AccountOptions = {
        networks: networks,
        initialConfig: {
            platform: getCurrentSodiumPlatform(),
            sodiumUserId: email,
        }
    };
    const account = new Account(options, Wallet.createRandom());
    await walletHandler.signIn(account);
    const walletAddress = await walletHandler.getAddress();

    const provider = new Web3Provider(walletHandler, walletHandler.defaultNetworkId);
    const web3signer = new Web3Signer(provider, parseInt(`${walletHandler.defaultNetworkId}`))

    walletAtom.set({
        address: walletAddress,
        handler: walletHandler,
        web3signer: web3signer
    });
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