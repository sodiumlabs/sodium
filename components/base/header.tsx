
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screens } from '../../lib/define';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import { navigation } from './navigationInit';


export default function Header(props) {
  const insets = useSafeAreaInsets();

  return (
    <MHStack style={[styles.container, { top: insets.top }]}>
      <MHStack stretchH stretchW style={{ position: 'relative', justifyContent: 'center' }}>

        <MImage size={40} style={{ position: 'absolute', left: 0 }} />

        <Pressable onPress={() => navigation.navigate(Screens.Wallet)}>
          <MLineLR
            left={<MImage size={20} />}
            right={<MText>wallet</MText>}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate(Screens.History)}>
          <MLineLR
            left={<MImage size={20} />}
            right={<MText>history</MText>}
          />
        </Pressable>

      </MHStack>

    </MHStack>
  );
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