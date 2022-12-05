
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';

export default function Footer() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <MVStack stretchW style={[styles.container, { bottom: insets.bottom }]}>
      <MHStack stretchW style={styles.list}>
        <MenuButton title='wallet' onPress={() => navigation.navigate('Wallet')} />
        <MenuButton title='history' onPress={() => navigation.navigate('History')} />
        {/* <MenuButton title='history' onPress={() => showTranscationQueueModal(true)} /> */}
        {/* <MenuButton title='history' onPress={() => showSignModal(true)} /> */}
      </MHStack>
    </MVStack>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    bottom: 0,
    // backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  list: {
    justifyContent: 'space-around',
  }
});
