
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from '../button/menuButton';

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <MenuButton />
        <MenuButton />
        <MenuButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    bottom: '0px',
    backgroundColor: '#fff',
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
