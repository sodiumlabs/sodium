
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screens } from '../../lib/define';
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

        <MImage size={40} style={{ position: 'absolute', left: 0 }} />

        <MHStack pointerEvents='auto'>
          <HeaderItem screen={Screens.Wallet} title={'Wallet'} />
          <HeaderItem screen={Screens.History} title={'History'} />
        </MHStack>

      </MHStack>

    </MHStack>
  );
}


const HeaderItem = (props: { screen: Screens, title: string }) => {
  const { screen, title } = props;
  return (
    <Pressable style={{ marginLeft: 20 }} onPress={() => navigationRef.reset({ index: 0, routes: [{ name: screen }], })}>
      <MLineLR
        left={<MImage size={20} />}
        right={<MText style={{ fontWeight: '700' }}>{title}</MText>}
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