

import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

const operateTimeStampAtom = atom(Date.now());

export const useOperateTimeStamp = (): number => {
  return useStore(operateTimeStampAtom);
}

export const updateOperateTimeStamp = (time: number) => {
  operateTimeStampAtom.set(time);
}