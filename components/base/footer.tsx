
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from '../baseUI/menuButton';
import MHStack from '../baseUI/mHStack';
import MVStack from '../baseUI/mVStack';

export default function Footer() {
  return (
    <MVStack stretchW style={styles.container}>
      <MHStack stretchW style={styles.list}>
        <MenuButton title='wallet' />
        <MenuButton title='history' />
        <MenuButton title='history1' />
      </MHStack>
    </MVStack>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    bottom: 0,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  list: {
    justifyContent: 'space-around',
  }
});
