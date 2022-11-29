import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import MText from './mText';

export default function MenuButton(props: { onPress?: (event: GestureResponderEvent) => void; title?: string; }) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MText> img </MText>
      <MText> {title} </MText>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 80,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  }
})
