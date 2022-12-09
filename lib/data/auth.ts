import { useStore } from "@nanostores/react";
import { Atom, computed } from "nanostores";
import { AuthData } from "../define";
import { initWalletByTest, logout, SodiumWallet, walletAtom } from '../provider';

export const authAtom = computed<AuthData, Atom<SodiumWallet | null>>(walletAtom, (w) => {
  console.log(w);
  if (w === null) {
    return {
      isLogin: false,
    } as AuthData;
  }
  return {
    isLogin: true,
    blockchainAddress: w.address,
    wallet: w.handler,
    web3signer: w.web3signer
  } as AuthData

  // window.wallet = w.handler;
});

export const getAuth = (): AuthData => {
  return authAtom.get();
}

export const useAuth = (): AuthData => {
  return useStore(authAtom);
}

export const loginOut = () => {
  logout();
}

export const loginIn = async (email: string) => {
  await initWalletByTest(email);
}