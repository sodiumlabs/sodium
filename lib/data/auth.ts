import { useStore } from "@nanostores/react";
import { atom, computed, Atom } from "nanostores";
import { AuthData } from "../define";
import { initWalletByTest, walletAtom, SodiumWallet, logout } from '../provider';

export const authAtom = computed<AuthData, Atom<SodiumWallet | null>>(walletAtom, (w) => {
  if (w === null) {
    return {
      isLogin: false,
    } as AuthData;
  }
  return {
    isLogin: true,
    blockchainAddress: w.address,
    wallet: w.handler
  } as AuthData
});

export const useAuth = (): AuthData => {
  return useStore(authAtom);
}

export const loginOut = () => {
  logout();
}

export const loginIn = async (email: string) => { 
  await initWalletByTest(email);
}