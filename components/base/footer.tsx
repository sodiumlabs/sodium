
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screens } from '../../lib/define';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';
import { navigation } from './navigationInit';

export default function Footer() {
  const insets = useSafeAreaInsets();
  // const size = useDimensionSize();
  // debugger
  return (

    <MVStack stretchW style={[styles.container, { bottom: insets.bottom }]}>
      <BlurView style={{ width: '100%' }}>
        {/* <MVStack stretchW style={[styles.container, { top: size[1] - insets.bottom - 80 }]}> */}
        <MHStack stretchW style={styles.list}>
          <MenuButton title='wallet' onPress={() => navigation.navigate(Screens.Wallet)} />
          <MenuButton title='history' onPress={() => navigation.navigate(Screens.History)} />
          {/* <MenuButton title='history' onPress={() => showTranscationQueueModal(true)} /> */}
          {/* <MenuButton title='history' onPress={() => showSignModal(true)} /> */}
        </MHStack>

      </BlurView>
    </MVStack>

  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    // bottom: 0,
    backgroundColor: '#rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  list: {
    justifyContent: 'space-around',
  }
});
