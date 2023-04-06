
import { ImageSourcePropType, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateCurScreenTab, useCurScreenTab } from '../../lib/data/screen';
import { Screens, fixWidth } from '../../lib/define';
import { IconLogoAll, IconMenuHistory, IconMenuWallet } from '../../lib/imageDefine';
import { useRequestedTransactions } from '../../lib/transaction';
import { CircleTip } from '../baseUI/circleTip';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import { navigationRef } from './navigation';
import { useAdapterScale } from '../../lib/hook';
import MVStack from '../baseUI/mVStack';


export default function Header(props) {
  const insets = useSafeAreaInsets();
  const curScreenName = useCurScreenTab();
  const { isInited, handleLayout, scaleStyleCenter: scaleStyle, scale, originSize } = useAdapterScale();

  const bgHeightStyle = {
    height: originSize != null ? originSize?.height * scale : ""
  }
  console.log("originSize+" + originSize?.height)
  return (
    <MHStack stretchW style={[styles.container, { top: insets.top }]}>
      <MVStack stretchW style={[bgHeightStyle, { position: 'relative', alignItems: 'center', backgroundColor: '#F7F7F7', }]}>
        <MHStack style={[{ position: 'absolute', left: 60 * scale * 0.5 + 10, top: 60 * scale * 0.5 + 30, alignItems: 'center' }, scaleStyle]}>
          <MImage w={60} h={60} source={IconLogoAll} style={{ marginLeft: -20, marginTop: -50 }} />
        </MHStack>

        <MHStack onLayout={handleLayout} pointerEvents='auto' style={[{ maxWidth: fixWidth }, scaleStyle]} >
          <HeaderItem isShowReqTip isSelect={curScreenName == Screens.Wallet} source={IconMenuWallet} screen={Screens.Wallet} />
          <HeaderItem isShowReqTip={false} isSelect={curScreenName == Screens.History} source={IconMenuHistory} screen={Screens.History} />
        </MHStack>

      </MVStack >
    </MHStack >
  );
}


const HeaderItem = (props: { screen: Screens, source: ImageSourcePropType, isSelect: boolean, isShowReqTip: boolean }) => {
  const { screen, source, isSelect, isShowReqTip } = props;
  const requestTranscations = useRequestedTransactions();
  const onItemClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: screen }], })
    updateCurScreenTab(screen);
  }
  return (
    <Pressable style={[{ marginHorizontal: 20, position: 'relative', paddingTop: 33, paddingBottom: 15, }, { opacity: isSelect ? 1 : 0.5 }]} onPress={onItemClick}>
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
    // backgroundColor: "#000000",
    // backgroundColor: "#F7F7F7",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // paddingLeft: 15,
    // paddingRight: 12,
    // paddingTop: 33,
    // paddingBottom: 15,
  }
});