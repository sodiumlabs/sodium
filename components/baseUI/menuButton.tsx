import { ImageSourcePropType, Pressable, PressableProps, StyleSheet } from 'react-native';
import MImage from './mImage';
import MText from './mText';

export default function MenuButton(props: PressableProps & { title?: string, source: ImageSourcePropType, isSelect: boolean, w?: number, h?: number }) {
  const { title, isSelect, source, style, w, h, ...reset } = props;
  return (
    <Pressable style={[styles.button, style as unknown, { opacity: isSelect ? 1 : 0.5 }]} {...reset}>
      <MImage w={w || 20} h={h || 20} source={source} />
      <MText style={{ fontWeight: '700', marginTop: 8 }}> {title} </MText>
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
