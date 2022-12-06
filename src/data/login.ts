import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { eStorageKey, ILoginData } from "../define";
import { waitTime } from '../common/common';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginDataAtom = atom<ILoginData>({});

export const fetchLoginData = async () => {
  // fetch api
  await waitTime(200);
  // updateLoginData({ blockchainAddress: "0xa085ac63AfFe1cB76e5Fb23Aad567cAB8E51e", isLogin: true });
  const token = "0xdasds2e1e23213";
  loginIn(token);
}


export const useLoginData = (): ILoginData => {
  return useStore(loginDataAtom);
}

export const updateLoginData = (data: ILoginData) => {
  loginDataAtom.set({ ...loginDataAtom.get(), ...data });
}


export const loadLoginDataFromLocal = async () => {
  const stoken = await AsyncStorage.getItem(eStorageKey.stoken) || "";
  updateLoginData({ token: stoken } as ILoginData);
}

export const loginOut = () => {
  const token = "";
  updateLoginData({ isLogin: false, token: token });
  AsyncStorage.setItem(eStorageKey.stoken, token);
}


export const loginIn = (token: string) => {
  updateLoginData({ isLogin: true, token: token });
  AsyncStorage.setItem(eStorageKey.stoken, token);
}