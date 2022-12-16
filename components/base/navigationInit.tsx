

import { useEffect } from 'react';
import { useAuth } from '../../lib/data/auth';
import { Screens } from '../../lib/define';
import { useNavigation } from '../../lib/navigation';
export let navigation = null;


export default function NavigationInit() {
  navigation = useNavigation();
  const auth = useAuth();
  useEffect(() => {
    if (!navigation.isReady()) {
      return;
    }
    if (auth.isLogin) {
      console.log('navigate(Screens.Wallet)');
      navigation.navigate(Screens.Wallet);
    } else {
      console.log('navigate(Screens.Login)');
      navigation.navigate(Screens.Login);
    }
  }, [auth.isLogin, navigation.isReady()])
  return (
    <></>
  );
}
