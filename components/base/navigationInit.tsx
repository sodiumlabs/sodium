
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../../lib/data/authAtom';
import { useProjectSetting } from '../../lib/data/project';
import { updateCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
import { isNavigationReadyAtom, navigationRef, lastAtom, navigateInitAtom } from './navigation';

export default function NavigationInit() {
  const auth = useAuth();
  const last = useStore(lastAtom);
  const [locationURL, setLocationURL] = useState("");
  const isNavigationReady = useStore(isNavigationReadyAtom);
  const projectSetting = useProjectSetting();

  if (Platform.OS == "web") {
    useEffect(() => {
      setLocationURL(window.location.href);
    }, [window.location.href])
  }

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }
    if (last) {
      navigationRef.navigate(...last);
      lastAtom.set(null);
    }

    if (locationURL != "") {
      const url = new URL(locationURL);
      if (url.searchParams.get("oauth_token")) {
        navigationRef.reset({ index: 0, routes: [{ name: Screens.AuthCallbackScreen }], });
        updateCurScreenTab(Screens.AuthCallbackScreen);
        return;
      }
    }

    // If it is opened by a third party, the opening page is displayed directly
    if (projectSetting.isBeOpenedByThirdParty) {
      if (!auth.isLogin) {
        navigationRef.reset({ index: 1, routes: [{ name: Screens.Opening }, { name: Screens.Login }], });
      } else {
        navigationRef.reset({ index: 0, routes: [{ name: Screens.Opening }], });
      }
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
  }, [auth.isLogin, isNavigationReady, projectSetting.isBeOpenedByThirdParty, locationURL]);

  return (
    <></>
  );
}
