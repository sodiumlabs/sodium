import { useStore } from "@nanostores/react";
import { Atom, computed } from "nanostores";
import { waitTime } from "../common/common";
import { AuthData, ProfileData } from "../define";
import { initWalletByTest, logout, SodiumWallet, walletAtom } from '../provider';
import { transactionQueue } from "../transaction";
import { transactionPending } from '../transaction/pending';
import { setProfile } from './profile';

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
    web3signer: w.web3signer,
    session: w.session
  } as AuthData
});

authAtom.subscribe((value) => {
  if (value.isLogin) {
    transactionQueue.loadAsyncStorage();
    transactionPending.loadAsyncStorage();
  }
  console.log("auth");
  console.log(value);
  // todo 
  setProfile({
    'authorizedSource': 'Twitter',
    'userName': value?.session?.sodiumUserId
  } as ProfileData);
});

export const getAuth = (): AuthData => {
  return authAtom.get();
}

export const useAuth = (): AuthData => {
  return useStore(authAtom);
}

export const loginOut = async () => {
  logout();
}

export const loginIn = async (email: string) => {
  await initWalletByTest(email);
}