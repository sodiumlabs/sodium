
import { ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateCurScreenTab, useCurScreenTab } from '../../lib/data/screen';
import { Screens } from '../../lib/define';
import { IconLogo, IconArrow, IconMenuWallet, IconMenuHistory } from '../../lib/imageDefine';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import { navigationRef } from './navigationInit';


export default function Header(props) {
  const insets = useSafeAreaInsets();
  const curScreenName = useCurScreenTab();

  return (
    <MHStack stretchW style={[styles.container, { top: insets.top }]}>
      <MHStack stretchH stretchW style={{ position: 'relative', justifyContent: 'center' }}>

        <MImage w={40} h={40} style={{ position: 'absolute', left: 0 }} source={IconLogo} />

        <MHStack pointerEvents='auto'>
          <HeaderItem isSelect={curScreenName == Screens.Wallet} source={IconMenuWallet} screen={Screens.Wallet} />
          <HeaderItem isSelect={curScreenName == Screens.History} source={IconMenuHistory} screen={Screens.History} />
        </MHStack>

      </MHStack>

    </MHStack>
  );
}


const HeaderItem = (props: { screen: Screens, source: ImageSourcePropType, isSelect: boolean }) => {
  const { screen, source, isSelect } = props;
  const onItemClick = () => {
    navigationRef.reset({ index: 0, routes: [{ name: screen }], })
    updateCurScreenTab(screen);
  }
  return (
    <Pressable style={[{ marginHorizontal: 20 }, { opacity: isSelect ? 1 : 0.5 }]} onPress={onItemClick}>
      <MLineLR
        left={<MImage w={14} h={14} source={source} />}
        right={<MText style={{ fontWeight: '700', marginLeft: 4 }} fontSize={12}>{screen}</MText>}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    // top: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 15,
    paddingRight: 12,
    paddingTop: 33,
    paddingBottom: 15,
  }
});