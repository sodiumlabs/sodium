import { WalletRequestHandler, WalletUserPrompter, Web3Signer, Web3Provider } from '@0xsodium/provider';
import { Account, AccountOptions } from '@0xsodium/wallet';
import { createContext } from '@0xsodium/network';
import { calcAccountAddress } from '@0xsodium/config';
import { WalletPrompter } from './prompter';
import { loadSession } from '../common/asyncStorage';
import { walletAtom, walletHandlerAtom, onboardAPIAtom } from './atom';
import { Session } from './types';
import { testNetworks, mainNetworks, getCurrentChainId, currentChainIdAtom, networks } from '../network';
import { AuthSessionResponse, getAuthService } from '../auth';
import { Signer as AbstractSigner, Wallet, ethers } from 'ethers';

const prompter: WalletUserPrompter = new WalletPrompter();

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
    const s = await loadSession();
    if (s) {
        const sessionExpires = s.authResp.authSession.sessionExpires;
        const now = parseInt(`${new Date().getTime() / 1000}`);

        // 提前一小时过期防止发起交易的途中过期
        if (sessionExpires - 3600 < now) {
            return;
        }

        const sessionKeyOwner = new Wallet(s.extData);
        const sodiumNetworkResponse = s.authResp;
        const ownerAddress = await sessionKeyOwner.getAddress();
        const session: Session = {
            sodiumNetworkResponse: sodiumNetworkResponse,
            sessionKeyOwner: sessionKeyOwner,
            sessionKeyOwnerAddress: ownerAddress,
            authre: {
                authProvider: sodiumNetworkResponse.authProvider,
                displayName: sodiumNetworkResponse.displayName
            }
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
        authre: {
            authProvider: sodiumNetworkResponse.authProvider,
            displayName: sodiumNetworkResponse.displayName
        }
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

export const initWalletWithEOA = async (
    sessionKeyOwner: AbstractSigner,
    label: string
) => {
    const ownerAddress = await sessionKeyOwner.getAddress();
    const session: Session = {
        sessionKeyOwner: sessionKeyOwner,
        sessionKeyOwnerAddress: ownerAddress,
        authre: {
            authProvider: label,
            displayName: ownerAddress
        }
    }

    const salt = ethers.utils.keccak256(ownerAddress);
    const context = createContext();
    const walletAddress = calcAccountAddress(salt, context.factoryAddress);

    const options: AccountOptions = {
        networks: networks,
        initialConfig: {
            accountSlat: salt,
            address: walletAddress,
            isSafe: false,
        }
    };
    const account = new Account(
        options,
        session.sessionKeyOwner
    );
    return signIn(account, session, true);
}