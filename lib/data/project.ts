import { atom } from "nanostores";
import { useStore } from '@nanostores/react';

export interface IProjectSetting {
  name?: string,
  isBeOpenedByThirdParty?: boolean,
  isBeOpenByWindow?: boolean,
  isBeOpenByIframe?: boolean,
}

const projectSettingAtom = atom<IProjectSetting>({});

export const initProjectSetting = () => {
  const isBeOpenByWindow = !!window.opener;
  const isBeOpenByIframe = window.self != window.top;
  projectSettingAtom.set({
    'name': "Sodium",
    'isBeOpenedByThirdParty': isBeOpenByWindow || isBeOpenByIframe,
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