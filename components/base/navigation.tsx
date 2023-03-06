
import { createNavigationContainerRef } from '@react-navigation/native';
import { atom } from "nanostores";
import { waitFinish, waitTime } from "../../lib/common/common";
export const navigateInitAtom = atom(false);
export const lastAtom = atom(null);

export const isNavigateInit = () => {
  return !!navigateInitAtom.get();
}

export const waitNavigateInit = async () => {
  await waitFinish(isNavigateInit, 'waitNavigateInit');
}

type ParamList = ReactNavigation.RootParamList;
export const navigationRef = createNavigationContainerRef();

export const isNavigationReadyAtom = atom<boolean>(false);

export const navigate = <RouteName extends keyof ParamList>(...args: RouteName extends unknown ? undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]] : never) => {
  if (navigationRef.isReady()) {
    return navigationRef.navigate(...args);
  }
  lastAtom.set(args);
}