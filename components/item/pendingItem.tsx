



import { StyleSheet, TextInputProps } from 'react-native';
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import { MLoading } from '../baseUI/mLoading';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { globalStyle, eColor } from '../../lib/globalStyles';
import { formatTime2Today } from '../../lib/common/time';
import { IconTokenDefault } from '../../lib/imageDefine';
import MAvatar from '../baseUI/mAvatar';
import { ITranscation } from '../../lib/define';

export default function PendingItem(props: TextInputProps & { data: ITranscation }) {
  const { data, style, ...reset } = props;

  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth]}>
      <MLineLR
        style={{ marginBottom: 20 }}
        left={
          <>
            <MLoading />
            <MText style={{ marginLeft: 10, color: eColor.Blue, fontWeight: '700' }} >Send tokens...</MText>
          </>
        }
        right={
          <MText style={{ color: eColor.GrayText }} >{formatTime2Today(Date.now())}</MText>
        } />

      <MLineLR
        left={
          <MHStack style={{ alignItems: 'center' }} >
            <MImage w={20} h={20} uri={null} source={IconTokenDefault} />
            <MText style={{ marginLeft: 6, fontWeight: '700' }} >PLOYGON(Matic)</MText>
          </MHStack>
        }
        right={<MText style={{ color: eColor.GrayContentText }} >-0.001 Matic</MText>} />

      <MDivider style={{ marginVertical: 10 }} />


      <MText style={{ marginBottom: 10 }} >Network Fee</MText>
      <MLineLR
        left={
          <MHStack style={{ alignItems: 'center' }}>
            <MImage w={20} h={20} uri={null} source={IconTokenDefault} />
            <MText style={{ marginLeft: 6, fontWeight: '700' }}>PLOYGON Matic</MText>
          </MHStack>
        }
        right={<MText style={{ color: eColor.GrayContentText }}>-0.001 Matic</MText>} />

      <MDivider style={{ marginVertical: 10 }} />

      <MText style={{ marginBottom: 10 }} >To Recipient</MText>
      <MHStack style={{ alignItems: 'center' }}>
        <MAvatar name={'test'} />
        <MText style={{ color: eColor.GrayContentText, marginLeft: 6 }}>0x178798731273218372818</MText>
      </MHStack>

    </MVStack>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    padding: 15,
    paddingBottom: 20,
    marginBottom: 10,
  }
});
