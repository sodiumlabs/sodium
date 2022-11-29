



import { Image, StyleSheet, TextInputProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function CoinItem(props: TextInputProps) {
  const { style, ...reset } = props;
  return (
    <MVStack style={styles.container} stretchW>
      <Image style={{ width: 32, height: 32 }} source={require('./../../assets/favicon.png')} />

      <MVStack style={{ flex: 1 }}>
        <MHStack >
          <MHStack style={{ flex: 1 }}>
            <MText>USDC</MText>
            <Image style={{ width: 12, height: 12 }} source={require('./../../assets/favicon.png')} />
            <MText>POLYGON</MText>
          </MHStack>
          <MText>$3.12</MText>
        </MHStack>

        <MHStack>

        </MHStack>
      </MVStack>
    </MVStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 12
  }
});
