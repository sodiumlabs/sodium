



import { Image, StyleSheet, TextInputProps, View } from 'react-native';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import MHStack from '../baseUI/mHStack';

export default function CoinItem(props: TextInputProps) {
  const { style, ...reset } = props;
  return (
    <MVStack style={styles.container}>
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
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 12
  },
  input: {
    borderStyle: 'solid',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 15,
    height: 65,
    width: '100%',
    paddingHorizontal: 20,
  }
});
