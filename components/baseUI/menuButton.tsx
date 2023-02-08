import { ImageSourcePropType, Pressable, PressableProps, StyleSheet } from 'react-native';
import { useRequestedTransactions } from '../../lib/transaction';
import { CircleTip } from './circleTip';
import MImage from './mImage';
import MText from './mText';
import MPressable from './mPressable';

export default function MenuButton(props: PressableProps & { title?: string, source: ImageSourcePropType, isSelect: boolean, w?: number, h?: number }) {
  const { title, isSelect, source, style, w, h, ...reset } = props;
  const requestTranscations = useRequestedTransactions();
  return (
    <MPressable
      style={[styles.button, style as unknown, { opacity: isSelect ? 1 : 0.5 }]} {...reset}>
      <MImage w={w || 20} h={h || 20} source={source} />
      <MText style={{ fontWeight: '700', marginTop: 8 }}> {title} </MText>
      <CircleTip num={requestTranscations.length + ''} style={{ position: 'absolute', right: 8, top: 10, width: 15, height: 15 }} fontSize={8} />
    </MPressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    width: 80,
    borderRadius: 4,
    // elevation: 3,
    position: 'relative'
  }
})
