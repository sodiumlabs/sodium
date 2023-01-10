import { atom } from "nanostores";
import { useStore } from '@nanostores/react';

export interface IProjectSetting {
  name?: string,
  isBeOpenedByThirdParty?: boolean
}

const projectSettingAtom = atom<IProjectSetting>({});

export const initProjectSetting = () => {
  projectSettingAtom.set({
    'name': "Sodium",
    // 'isBeOpenedByThirdParty': !!window.opener
    'isBeOpenedByThirdParty': window.self != window.top  // open by iframe
  })
}

export const useProjectSetting = () => {
  return useStore(projectSettingAtom);
}

export const getProjectSetting = () => {
  return projectSettingAtom.get();
}