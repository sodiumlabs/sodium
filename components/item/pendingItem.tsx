



import { ActivityIndicator, Image, Pressable, StyleSheet, TextInputProps, View } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import MLineLR from '../baseUI/mLineLR';
import MImage from '../baseUI/mImage';
import { Divider } from '@ui-kitten/components';
import { MDivider } from '../baseUI/mDivider';

export default function PendingItem(props: TextInputProps) {
  const { style, ...reset } = props;
  return (
    <MHStack style={styles.container} stretchW>
      <MText style={{ marginVertical: 15 }}>Pending Transcations</MText>

      <MVStack stretchW>
        <MLineLR
          left={
            <>
              <ActivityIndicator size='small' color="#0000ff" />
              <MText>Send tokens...</MText>
            </>
          }
          right={
            <MHStack>
              <MText>a few seconds ago</MText>
              <MImage />
              <MImage />
            </MHStack>
          } />

        <MLineLR
          left={
            <MHStack>
              <MImage />
              <MText>PLOYGON Matic</MText>
            </MHStack>
          }
          right={<MText>-0.001 Matic</MText>} />

        <MDivider />


        <MText>Network Fee</MText>
        <MLineLR
          left={
            <MHStack>
              <MImage />
              <MText>PLOYGON Matic</MText>
            </MHStack>
          }
          right={<MText>-0.001 Matic</MText>} />

        <MDivider />

        <MText>To Recipient</MText>
        <MHStack>
          <MImage />
          <MText>0x178798731273218372818</MText>
        </MHStack>

      </MVStack>
    </MHStack >
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 10
  }
});
