import { ImageSourcePropType, Pressable, PressableProps, StyleSheet } from 'react-native';
import MImage from './mImage';
import MText from './mText';

export default function MenuButton(props: PressableProps & { title?: string, source: ImageSourcePropType }) {
  const { title, source, style, ...reset } = props;
  return (
    <Pressable style={[styles.button, style as unknown]} {...reset}>
      <MImage w={20} h={20} source={source} />
      <MText style={{ fontWeight: '700' }}> {title} </MText>
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
