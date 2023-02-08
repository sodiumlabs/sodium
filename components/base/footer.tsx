
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurScreenTab, updateCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
import { IconMenuHistory, IconMenuWallet } from '../../lib/imageDefine';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import { navigationRef } from './navigation';

export default function Footer() {
  const insets = useSafeAreaInsets();
  const curScreenName = useCurScreenTab();

  const onWalletClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: Screens.Wallet }], })
    updateCurScreenTab(Screens.Wallet);
  }
  const onHistoryClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: Screens.History }], })
    updateCurScreenTab(Screens.History);
  }
  return (

    <MVStack stretchW style={[styles.container, { bottom: insets.bottom }]}>
      {/* <BlurView style={{ width: '100%' }}> */}
      <MHStack stretchW style={styles.list}>
        <MenuButton isSelect={curScreenName == Screens.Wallet} w={17} h={15} source={IconMenuWallet} title={Screens.Wallet} onPress={onWalletClick} />
        <MenuButton isSelect={curScreenName == Screens.History} w={17} h={17} source={IconMenuHistory} title={Screens.History} onPress={onHistoryClick} />
      </MHStack>
      {/* </BlurView> */}
    </MVStack>

  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    // bottom: 0,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  list: {
    justifyContent: 'space-around',
  }
});
