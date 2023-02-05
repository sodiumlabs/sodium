import { atom } from "nanostores";
import { useStore } from '@nanostores/react';
import { Platform } from "react-native";

export interface IProjectSetting {
  name?: string,
  isBeOpenedByThirdParty?: boolean,
  isBeOpenByWindow?: boolean,
  isBeOpenByIframe?: boolean,
}

const projectSettingAtom = atom<IProjectSetting>({});

export const initProjectSetting = () => {
  let isBeOpenedByThirdParty = false;
  let isBeOpenByWindow = false;
  let isBeOpenByIframe = false;

  if (Platform.OS === "web") {
    isBeOpenByWindow = !!window.opener;
    isBeOpenByIframe = window.self != window.top;
    isBeOpenedByThirdParty = isBeOpenByWindow || isBeOpenByIframe;
  }

  projectSettingAtom.set({
    'name': "Sodium",
    'isBeOpenedByThirdParty': isBeOpenedByThirdParty,
    'isBeOpenByWindow': isBeOpenByWindow,
    'isBeOpenByIframe': isBeOpenByIframe,

  } as IProjectSetting)
}

export const useProjectSetting = (): IProjectSetting => {
  return useStore(projectSettingAtom);
}

export const getProjectSetting = () => {
  return projectSettingAtom.get();
}