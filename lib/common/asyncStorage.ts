import AsyncStorage from "@react-native-async-storage/async-storage";
import { eStotageKey, ITranscation } from "../define";
import { Wallet } from '../fixedEthersWallet';
import { Platform as SodiumPlatform } from '@0xsodium/config';
import { WalletConnectSessionSerialized } from '../walletconnect';

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
  console.debug("save session");
  return AsyncStorage.setItem("@sodium.wallet.session", JSON.stringify({
    sodiumUserId: s.sodiumUserId,
    platform: "web",

    // TODO
    // https://docs.expo.dev/versions/latest/sdk/securestore/#usage
    pk: s.w.privateKey
  }));
}

export const clearSession = async () => {
  return AsyncStorage.removeItem("@sodium.wallet.session");
}

export const loadSession = async (): Promise<{ sodiumUserId: string, platform: SodiumPlatform, w: Wallet } | null> => {
  const value = await AsyncStorage.getItem("@sodium.wallet.session");
  try {
    if (value && value != "") {
      console.debug("sync session")
      const sessionSerialized = JSON.parse(value);
      return Promise.resolve({
        sodiumUserId: sessionSerialized.sodiumUserId,
        platform: sessionSerialized.platform,
        w: new Wallet(sessionSerialized.pk)
      })
    }
  } catch (error) {
    console.warn(error);
  }
  return null;
}

export const saveWalletConnectSessions = async (walletConnectSessions: WalletConnectSessionSerialized[]) => {
  try {
    return AsyncStorage.setItem("@sodium.wcs", JSON.stringify(walletConnectSessions));
  } catch(error) {
    // TODO sentry
    console.warn(error);
  }
  return;
}

export const loadWalletConnectSessions = async (): Promise<WalletConnectSessionSerialized[]> => {
  try {
    const wcs = await AsyncStorage.getItem("@sodium.wcs");
    if (wcs) {
      return JSON.parse(wcs);
    }
    return [];
  } catch(error) {
    // TODO sentry
  }
  return [];
}