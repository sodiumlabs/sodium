import { ReactNode } from 'react';
import { PressableProps, StyleSheet } from 'react-native';
import { useRequestedTransactions } from '../../lib/transaction';
import { CircleTip } from './circleTip';
import MPressable from './mPressable';
import MText from './mText';
import MVStack from './mVStack';

export default function MenuButton(props: PressableProps & { title?: string, isShowReqTip: boolean, source: ReactNode, isSelect: boolean, w?: number, h?: number }) {
  const { title, isShowReqTip, isSelect, source, style, w, h, ...reset } = props;
  const requestTranscations = useRequestedTransactions();
  return (
    <MPressable
      style={[styles.button, style as unknown]} {...reset}>
      <MVStack style={{ opacity: isSelect ? 1 : 0.5, justifyContent: 'center', alignItems: 'center' }}>
        {source}
        <MText style={{ fontWeight: '700', marginTop: 8 }}> {title} </MText>
        {
          isShowReqTip && (
            <CircleTip num={requestTranscations.length + ''} style={{ position: 'absolute', right: 8, top: 10, width: 15, height: 15 }} fontSize={8} />
          )
        }
      </MVStack>
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
