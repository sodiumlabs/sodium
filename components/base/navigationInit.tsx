

import { useEffect } from 'react';
import { useAuth } from '../../lib/data/auth';
import { Screens } from '../../lib/define';
import { createNavigationContainerRef } from '@react-navigation/native';

type ParamList = ReactNavigation.RootParamList;
export const navigationRef = createNavigationContainerRef();
let last = null;
export const navigate = <RouteName extends keyof ParamList>(...args: RouteName extends unknown ? undefined extends ParamList[RouteName] ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]] : [screen: RouteName, params: ParamList[RouteName]] : never) => {
  if (navigationRef.isReady()) {
    return navigationRef.navigate(...args);
  }
  last = args;
}

export default function NavigationInit() {
  const auth = useAuth();
  useEffect(() => {
    if (!navigationRef.isReady()) {
      return;
    }

    if (last) {
      navigationRef.navigate(...last);
      last = null;
    }

    if (auth.isLogin) {
      navigationRef.reset({ index: 0, routes: [{ name: Screens.Wallet }], });
    } else {
      navigationRef.reset({ index: 0, routes: [{ name: Screens.Login }], });
    }
  }, [auth.isLogin, navigationRef.isReady()])
  return (
    <></>
  );
}
