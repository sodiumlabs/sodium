



import { Image, Pressable, StyleSheet, TextInputProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { useNavigation } from '@react-navigation/native';
import MLineLR from '../baseUI/mLineLR';
import MImage from '../baseUI/mImage';

export default function CoinItem(props: TextInputProps) {
  const { style, ...reset } = props;
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Coin')}>
      <MHStack style={styles.container} stretchW>
        <MImage size={32} />

        <MVStack style={{ flex: 1 }}>
          <MLineLR
            left={
              <MHStack >
                <MText>USDC</MText>
                <MImage size={12} />
                <MText>POLYGON</MText>
              </MHStack>
            }
            right={<MText>$3.12</MText>}
          />

          <MLineLR
            left={<MText>0.02223 Matic $1.8</MText>}
            right={<MText>+$3.12%</MText>} />
        </MVStack>
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
