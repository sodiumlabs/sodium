import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "../data/auth";
import { eStotageKey, ITranscation } from "../define";
import { Wallet } from 'ethers';
import { Platform as SodiumPlatform } from '@0xsodium/config';

export const saveTxnQueue = (queue: readonly ITranscation[]) => {
  try {
    const auth = getAuth();
    if (auth.isLogin) {
      console.log('save AsyncStorage：' + eStotageKey.requestedTxs);
      AsyncStorage.setItem(eStotageKey.requestedTxs + auth.blockchainAddress, JSON.stringify(queue));
    }
  } catch (error) {
    //
  }
}

export const loadTxnQueue = async () => {
  const auth = getAuth();
  if (auth.isLogin) {
    console.log('load AsyncStorage：' + eStotageKey.requestedTxs);
    const reqs = await AsyncStorage.getItem(eStotageKey.requestedTxs + auth.blockchainAddress);
    try {
      const txs = JSON.parse(reqs);
      return txs || [];
    } catch (error) {
      return [];
    }
  }
}

export const saveSession = async (s: { sodiumUserId: string, platform: string, w: Wallet }) => {
  // TODO
}

export const loadSession = async (): Promise<{ sodiumUserId: string, platform: SodiumPlatform, w: Wallet }|null> => {
  return Promise.resolve({
    sodiumUserId: "r.albert.huang@gmail.com",
    platform: "web",
    w: Wallet.createRandom()
  })
}