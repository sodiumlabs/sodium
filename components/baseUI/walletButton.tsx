import { GestureResponderEvent, Image, Pressable, StyleSheet } from 'react-native';
import MImage from './mImage';
import MText from './mText';
import MVStack from './mVStack';

export default function WalletButton(props: { onPress?: (event: GestureResponderEvent) => void; title?: string; }) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MVStack style={styles.button}>
        <MImage size={12} />
      </MVStack>
      <MText > {title} </MText>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 40
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(200,200,200,1)',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
