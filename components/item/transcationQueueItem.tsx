



import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';

export default function TranscationQueueItem(props: { onPress: () => void }) {
  const { onPress } = props;
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => onPress()}>
      <MHStack style={styles.container} stretchW>
        <MHStack style={{ flex: 1 }}>
          <MText>Send tokens</MText>
          <Image style={{ width: 16, height: 16 }} source={require('./../../assets/favicon.png')} />
          <MText>POLYGON</MText>
        </MHStack>
        <MHStack>
          <MText >2022 3:30:00 pm</MText>
          <Pressable >
            <Image style={{ width: 16, height: 16 }} source={require('./../../assets/favicon.png')} />
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
