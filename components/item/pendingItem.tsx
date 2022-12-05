



import { Image, Pressable, StyleSheet, TextInputProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { useNavigation } from '@react-navigation/native';
import MLineLR from '../baseUI/mLineLR';
import MImage from '../baseUI/mImage';

export default function PendingItem(props: TextInputProps) {
  const { style, ...reset } = props;
  return (
    <MHStack style={styles.container} stretchW>
      <MVStack stretchW>
        <MLineLR
          left={<MText>Send tokens...</MText>}
          right={<MText>a few seconds ago</MText>} />

        <MLineLR
          left={
            <MHStack>
              <MImage />
              <MText>Send tokens...</MText>
            </MHStack>
          }
          right={<MText>a few seconds ago</MText>} />
      </MVStack>
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 15
  }
});
