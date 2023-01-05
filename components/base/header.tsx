
import { ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screens } from '../../lib/define';
import { IconLogo, IconArrow, IconMenuWallet, IconMenuHistory } from '../../lib/imageDefine';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import { navigationRef } from './navigationInit';


export default function Header(props) {
  const insets = useSafeAreaInsets();

  return (
    <MHStack stretchW style={[styles.container, { top: insets.top }]}>
      <MHStack stretchH stretchW style={{ position: 'relative', justifyContent: 'center' }}>

        <MImage w={40} h={40} style={{ position: 'absolute', left: 0 }} source={IconLogo} />

        <MHStack pointerEvents='auto'>
          <HeaderItem source={IconMenuWallet} screen={Screens.Wallet} title={'Wallet'} />
          <HeaderItem source={IconMenuHistory} screen={Screens.History} title={'History'} />
        </MHStack>

      </MHStack>

    </MHStack>
  );
}


const HeaderItem = (props: { screen: Screens, title: string, source: ImageSourcePropType }) => {
  const { screen, title, source } = props;
  return (
    <Pressable style={{ marginHorizontal: 20 }} onPress={() => navigationRef.reset({ index: 0, routes: [{ name: screen }], })}>
      <MLineLR
        left={<MImage w={14} h={14} source={source} />}
        right={<MText style={{ fontWeight: '700', marginLeft: 4 }} fontSize={12}>{title}</MText>}
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