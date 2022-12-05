import { GestureResponderEvent, Image, Pressable, StyleSheet } from 'react-native';
import MImage from './mImage';
import MText from './mText';

export default function MenuButton(props: { onPress?: (event: GestureResponderEvent) => void; title?: string; }) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MImage size={20} />
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
    // backgroundColor: '#bbb',
  }
})
