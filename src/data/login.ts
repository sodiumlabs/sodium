import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { ILoginData } from "../define";
import { waitTime } from '../common/common';

export const loginDataAtom = atom<ILoginData>({});

export const fetchLoginData = async () => {

  // fetch api
  await waitTime(2000);
  updateLoginData({ blockchainAddress: "0xa085ac63AfFe1cB76e5Fb23Aad567cAB8E51e" });
}

export const useLoginData = (): ILoginData => {
  return useStore(loginDataAtom);
}

export const updateLoginData = (data: ILoginData) => {
  // const login = loginDataAtom.get();
  loginDataAtom.set({ ...data });
}