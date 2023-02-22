import { Atom, computed } from "nanostores";
import { SodiumWallet, walletAtom } from '../provider';
import { AuthData } from "../define";
import { useStore } from "@nanostores/react";

export const authAtom = computed<AuthData, Atom<SodiumWallet | null>>(walletAtom, (w) => {
    if (w === null) {
        return {
            isLogin: false,
        } as AuthData;
    }

    return {
        isLogin: true,
        blockchainAddress: w.address,
        wallet: w.handler,
        signer: w.signer,
        web3signer: w.web3signer
    } as AuthData
});

export const getAuth = (): AuthData => {
    return authAtom.get();
}

export const useAuth = (): AuthData => {
    return useStore(authAtom);
}