import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "../data/auth";
import { eStotageKey, ITranscation } from "../define";
import { Wallet } from 'ethers';
import { Platform as SodiumPlatform } from '@0xsodium/config';

export const saveTxnQueue = (key: eStotageKey, queue: readonly ITranscation[]) => {
  try {
    const auth = getAuth();
    if (auth.isLogin) {
      console.log('save AsyncStorage:' + key);
      AsyncStorage.setItem(key + auth.blockchainAddress, JSON.stringify(queue));
    }
  } catch (error) {
    //
  }
}

export const loadTxnQueue = async (key: eStotageKey): Promise<ITranscation[]> => {
  const auth = getAuth();
  if (auth.isLogin) {
    console.log('load AsyncStorage:' + key);
    const reqs = await AsyncStorage.getItem(key + auth.blockchainAddress);
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

export const loadSession = async (): Promise<{ sodiumUserId: string, platform: SodiumPlatform, w: Wallet } | null> => {
  return Promise.resolve({
    sodiumUserId: "r.albert.huang@gmail.com",
    platform: "web",
    w: Wallet.createRandom()
  })
}