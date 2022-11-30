



import { Image, Pressable, StyleSheet, TextInputProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { useNavigation } from '@react-navigation/native';

export default function TranscationItem(props: { onPress: () => void }) {
  const { onPress } = props;
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => onPress()}>
      <MVStack style={styles.container} stretchW>

        <MHStack style={{ flex: 1 }}>
          <MHStack style={{ flex: 1 }}>
            <MText>Received</MText>
            <Image style={{ width: 16, height: 16 }} source={require('./../../assets/favicon.png')} />
            <MText> $1.8</MText>
          </MHStack>
          <MText>November 24, 2022</MText>
        </MHStack>

        <MHStack style={{ flex: 1 }}>
          <MHStack style={{ flex: 1 }}>
            <Image style={{ width: 16, height: 16 }} source={require('./../../assets/favicon.png')} />
            <MText>USDC</MText>
          </MHStack>
          <MText>+ 22</MText>
        </MHStack>

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
