
import { ImageSourcePropType, Pressable, StyleSheet, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
import { IconLogoAll, IconMenuHistory, IconMenuWallet } from '../../lib/imageDefine';
import { useRequestedTransactions } from '../../lib/transaction';
import { CircleTip } from '../baseUI/circleTip';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import AppsSvg from '../svg/appsSvg';
import { navigationRef } from './navigation';


export default function Header(props: ViewProps) {
  const { style, ...rest } = props;
  const insets = useSafeAreaInsets();
  const curScreenName = useCurScreenTab();

  return (
    <MHStack stretchW style={[styles.container, { top: insets.top }]} {...rest}>
      <MHStack stretchH stretchW style={{ position: 'relative', justifyContent: 'center' }}>
        <MHStack style={{ position: 'absolute', left: 20, top: -15, alignItems: 'center', }}>
          {/* <MImage w={126} h={30} source={IconLogoAll} style={{ marginRight: 8 }} /> */}
          <MImage w={60} h={60} source={IconLogoAll} style={{ marginRight: 8 }} />
          {/* <MText fontSize={20} style={{ fontWeight: '700' }}>Sodium</MText> */}
        </MHStack>


        <MHStack pointerEvents='auto'>
          <HeaderItem isShowReqTip isSelect={curScreenName == Screens.Wallet} source={IconMenuWallet} screen={Screens.Wallet} />
          <HeaderItem isShowReqTip isSelect={curScreenName == Screens.Apps} source={IconMenuWallet} screen={Screens.Apps} />
          <HeaderItem isShowReqTip={false} isSelect={curScreenName == Screens.History} source={IconMenuHistory} screen={Screens.History} />
        </MHStack>

      </MHStack>

    </MHStack>
  );
}


const HeaderItem = (props: { screen: Screens, source: ImageSourcePropType, isSelect: boolean, isShowReqTip: boolean }) => {
  const { screen, source, isSelect, isShowReqTip } = props;
  const requestTranscations = useRequestedTransactions();
  const onItemClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: screen }], })
  }
  return (
    <Pressable style={[{ marginHorizontal: 20, position: 'relative' }, { opacity: isSelect ? 1 : 0.5 }]} onPress={onItemClick}>
      <MLineLR
        left={<MImage w={14} h={14} source={source} />}
        right={<MText style={{ fontWeight: '700', marginLeft: 4 }} fontSize={12}>{screen}</MText>}
      />
      {
        isShowReqTip && (
          <CircleTip num={requestTranscations.length + ''} style={{ position: 'absolute', right: -10, top: -20, width: 15, height: 15 }} fontSize={8} />
        )
      }

    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    // top: 0,
    // backgroundColor: 'transparent',
    backgroundColor: "#F7F7F7",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 15,
    paddingRight: 12,
    paddingTop: 33,
    paddingBottom: 15,
  }
});