
import { Platform, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import MenuButton from '../baseUI/menuButton';
import AppsSvg from '../svg/appsSvg';
import HistorySvg from '../svg/historySvg';
import WalletSvg from '../svg/walletSvg';
import { navigationRef } from './navigation';

export default function Footer(props: ViewProps) {
  const { style, ...rest } = props;
  const insets = useSafeAreaInsets();
  const curScreenName = useCurScreenTab();

  const onWalletClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: Screens.Wallet }], })
  }
  const onHistoryClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: Screens.History }], })
  }
  const onAppsClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: Screens.Apps }], })
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
