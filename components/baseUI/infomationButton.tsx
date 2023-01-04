import { GestureResponderEvent, Image, Pressable, PressableProps, StyleSheet } from 'react-native';
import MImage from './mImage';
import MText from './mText';

export default function InfomationButton(props: PressableProps & { title?: string; }) {
  const { title, style, ...reset } = props;
  return (
    <Pressable style={[styles.button, style as unknown]} {...reset}>
      <MImage size={20} />
      <MText style={{ fontWeight: '700', color: "#9F9F9F" }}> {title} </MText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 80,
    borderRadius: 4,
    elevation: 3,
  }
})
