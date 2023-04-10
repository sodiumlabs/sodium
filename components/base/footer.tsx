
import { Platform, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurScreenTab, updateCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import HistorySvg from '../svg/historySvg';
import WalletSvg from '../svg/walletSvg';
import AppsSvg from '../svg/appsSvg';
import { navigationRef } from './navigation';

export default function Footer(props: ViewProps) {
  const { style, ...rest } = props;
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
  const onAppsClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: Screens.Apps }], })
    updateCurScreenTab(Screens.Apps);
  }
  return (
    <MVStack stretchW style={[styles.container, { bottom: insets.bottom }]} {...rest}>
      {/* <BlurView style={{ width: '100%' }}> */}
      <MHStack stretchW style={styles.list}>
        <MenuButton isShowReqTip isSelect={curScreenName == Screens.Wallet} source={<WalletSvg />} title={Screens.Wallet} onPress={onWalletClick} />
        {
          Platform.OS != "web" && (<MenuButton isShowReqTip={false} isSelect={curScreenName == Screens.Apps} source={<AppsSvg />} title={Screens.Apps} onPress={onAppsClick} />)
        }
        <MenuButton isShowReqTip={false} isSelect={curScreenName == Screens.History} source={<HistorySvg />} title={Screens.History} onPress={onHistoryClick} />
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
