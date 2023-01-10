
import { useStore } from '@nanostores/react';
import { createNavigationContainerRef } from '@react-navigation/native';
import { atom } from "nanostores";
import { useEffect } from 'react';
import { waitFinish, waitTime } from "../../lib/common/common";
import { useAuth } from '../../lib/data/auth';
import { useProjectSetting } from '../../lib/data/project';
import { updateCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
const navigateInitAtom = atom(false);
// console.log("navigateInitAtom");
// console.log(navigateInitAtom.get());

const isNavigateInit = () => {
  return !!navigateInitAtom.get();
}

export const waitNavigateInit = async () => {
  // while (!isNavigateInit()) {
  //   console.log("waitNavigateInit");
  //   await waitTime(50);
  // }
  await waitFinish(isNavigateInit, 'waitNavigateInit');
}

type ParamList = ReactNavigation.RootParamList;
export const navigationRef = createNavigationContainerRef();
let last = null;

export const isNavigationReadyAtom = atom<boolean>(false);

export const navigate = <RouteName extends keyof ParamList>(...args: RouteName extends unknown ? undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]] : never) => {
  if (navigationRef.isReady()) {
    return navigationRef.navigate(...args);
  }
  last = args;
}

export default function NavigationInit() {
  const auth = useAuth();
  const isNavigationReady = useStore(isNavigationReadyAtom);
  const projectSetting = useProjectSetting();

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }
    if (last) {
      navigationRef.navigate(...last);
      last = null;
    }
    const url = new URL(window.location.href);

    if (url.searchParams.get("oauth_token")) {
      navigationRef.reset({ index: 0, routes: [{ name: Screens.AuthCallbackScreen }], });
      updateCurScreenTab(Screens.AuthCallbackScreen);
      return;
    }

    // If it is opened by a third party, the opening page is displayed directly
    if (projectSetting.isBeOpenedByThirdParty) {
      navigationRef.reset({ index: 0, routes: [{ name: Screens.Opening }], });
    }
    // Non-third party, display login or wallet page based on login or not
    else {
      if (auth.isLogin) {
        navigationRef.reset({ index: 0, routes: [{ name: Screens.Wallet }], });
        updateCurScreenTab(Screens.Wallet);
      } else {
        navigationRef.reset({ index: 0, routes: [{ name: Screens.Login }], });
        updateCurScreenTab(Screens.Login);
      }
    }
    navigateInitAtom.set(true);
  }, [auth.isLogin, isNavigationReady, projectSetting.isBeOpenedByThirdParty, window.location.href]);

  return (
    <></>
  );
}
