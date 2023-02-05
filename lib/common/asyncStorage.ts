import AsyncStorage from "@react-native-async-storage/async-storage";
import { eStotageKey, ITranscation } from "../define";
import { Wallet } from 'ethers';
import { Platform as SodiumPlatform } from '@0xsodium/config';

export const saveTxnQueue = (key: eStotageKey, queue: readonly ITranscation[]) => {
  AsyncStorage.setItem(key, JSON.stringify(queue));
}

export const loadTxnQueue = async (key: eStotageKey): Promise<ITranscation[]> => {
  console.log('load AsyncStorage:' + key);
  const reqs = await AsyncStorage.getItem(key);
  try {
    const txs = JSON.parse(reqs);
    return txs || [];
  } catch (error) {
    return [];
  }
}

export const saveSession = async (s: { sodiumUserId: string, platform: string, w: Wallet }) => {
  return AsyncStorage.setItem("@sodium.wallet.session", JSON.stringify({
    sodiumUserId: s.sodiumUserId,
  }));
}

export const clearSession = async () => {
  return AsyncStorage.removeItem("@sodium.wallet.session");
}

export const loadSession = async (): Promise<{ sodiumUserId: string, platform: SodiumPlatform, w: Wallet } | null> => {
  const value = await AsyncStorage.getItem("@sodium.wallet.session");
  if (value && value != "") {
    return Promise.resolve({
      sodiumUserId: "r.albert.huang@gmail.com",
      platform: "web",
      w: Wallet.createRandom()
    })
  }
  return null;
}