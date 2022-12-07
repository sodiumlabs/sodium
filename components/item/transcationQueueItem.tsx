



import { Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '../../lib/navigation';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';

export default function TranscationQueueItem(props: { onPress: () => void }) {
  const { onPress } = props;
  return (
    <Pressable onPress={() => onPress()}>
      <MHStack style={styles.container} stretchW>
        <MHStack style={{ flex: 1 }}>
          <MText>Send tokens</MText>
          <MImage size={16} />
          <MText>POLYGON</MText>
        </MHStack>
        <MHStack>
          <MText >2022 3:30:00 pm</MText>
          <Pressable >
            <MImage size={16} />
          </Pressable>
        </MHStack>
      </MHStack>
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
