



import { Image, Pressable, StyleSheet, TextInputProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { useNavigation } from '@react-navigation/native';
import MLineLR from '../baseUI/mLineLR';
import MImage from '../baseUI/mImage';

export default function HistoryItem(props: { onPress: () => void }) {
  const { onPress } = props;
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => onPress()}>
      <MVStack style={styles.container} stretchW>

        <MLineLR
          left={
            <MHStack style={{ flex: 1 }}>
              <MText>Received</MText>
              <MImage size={16} />
              <MText> $1.8</MText>
            </MHStack>
          }
          right={<MText>November 24, 2022</MText>}
        />

        <MLineLR
          left={
            <MHStack style={{ flex: 1 }}>
              <MImage size={16} />
              <MText>USDC</MText>
            </MHStack>
          }
          right={<MText>+ 22</MText>} />

      </MVStack>
    </Pressable>
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
