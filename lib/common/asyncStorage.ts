import AsyncStorage from "@react-native-async-storage/async-storage";
import { eStotageKey, ITranscation } from "../define";
import { Wallet } from 'ethers';
import { WalletConnectSessionSerialized } from '../walletconnect';
import { Logger } from "./utils";
import { AuthSessionResponse } from '../auth';

export const saveTxnQueue = (key: eStotageKey, queue: readonly ITranscation[]) => {
  AsyncStorage.setItem(key, JSON.stringify(queue));
}

export const loadTxnQueue = async (key: eStotageKey): Promise<ITranscation[]> => {
  Logger.debug('load AsyncStorage:' + key);
  const reqs = await AsyncStorage.getItem(key);
  try {
    const txs = JSON.parse(reqs);
    return txs || [];
  } catch (error) {
    return [];
  }
}

export const saveSessionByWallet = async (s: { 
  authResp: AuthSessionResponse, 
  w: Wallet
}) => {
  return AsyncStorage.setItem("@sodium.wallet.session", JSON.stringify({
    authResp: s.authResp,
    type: "eoa",
    // TODO
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
    pk: s.w.privateKey
  }));
}

export const clearSession = async () => {
  return AsyncStorage.removeItem("@sodium.wallet.session");
}

export const loadSession = async (): Promise<{
  authResp: AuthSessionResponse,
  extData: string
} | null> => {
  const value = await AsyncStorage.getItem("@sodium.wallet.session");
  try {
    if (value && value != "") {
      const sessionSerialized = JSON.parse(value);
      return Promise.resolve({
        authResp: sessionSerialized.authResp,
        extData: sessionSerialized.pk
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
  } catch (error) {
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
  } catch (error) {
    // TODO sentry
  }
  return [];
}