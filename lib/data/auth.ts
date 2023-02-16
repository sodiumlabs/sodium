import { initWallet, logout, SodiumWallet, walletAtom } from '../provider';
import { transactionQueue } from "../transaction";
import { transactionPending } from '../transaction/pending';
import { authAtom } from './authAtom';
export * from './authAtom';
import { setProfile } from './profile';
import { ProfileData } from '../define';

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

export const loginOut = async () => {
  logout();
}

export const loginIn = async (authId: string) => {
  await initWallet(authId);
}