import { useStore } from "@nanostores/react";
import { Atom, computed } from "nanostores";
import { waitTime } from "../common/common";
import { AuthData } from "../define";
import { initWalletByTest, logout, SodiumWallet, walletAtom } from '../provider';
import { transactionQueue } from "../transaction";

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
});

authAtom.subscribe((value) => {
  if (value.isLogin) {
    transactionQueue.loadAsyncStorage();
  }
});

export const getAuth = (): AuthData => {
  return authAtom.get();
}

export const useAuth = (): AuthData => {
  return useStore(authAtom);
}

export const loginOut = async () => {
  await waitTime(1500);// test code
  logout();
}

export const loginIn = async (email: string) => {
  await waitTime(1500);// test code
  await initWalletByTest(email);
}