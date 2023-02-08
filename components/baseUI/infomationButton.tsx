import { GestureResponderEvent, Image, ImageSourcePropType, Pressable, PressableProps, StyleSheet } from 'react-native';
import { eColor } from '../../lib/globalStyles';
import MImage from './mImage';
import MText from './mText';
import MPressable from './mPressable';

export default function InfomationButton(props: PressableProps & { title?: string, source?: ImageSourcePropType }) {
  const { title, source, style, ...reset } = props;
  return (
    <MPressable style={[styles.button, style as unknown]} {...reset}>
      <MImage w={30} h={30} source={source} />
      <MText style={{ fontWeight: '700', color: eColor.GrayText, marginTop: 20 }}> {title} </MText>
    </MPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 100,
    borderRadius: 4,
    // elevation: 3,
  }
})
