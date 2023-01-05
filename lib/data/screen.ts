import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { Screens } from "../define";



const curScreenTab = atom<Screens>(Screens.Login);

export const updateCurScreenTab = (screenName: Screens) => {
  curScreenTab.set(screenName);
}

export const useCurScreenTab = () => {
  return useStore(curScreenTab);
}