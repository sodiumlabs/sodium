
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from '../baseUI/menuButton';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <MenuButton title='wallet' />
        <MenuButton title='history' />
        <MenuButton title='history1' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: 0,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  list: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
