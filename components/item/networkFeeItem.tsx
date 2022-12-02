

import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, TextInputProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function NetworkFeeItem(props: TextInputProps) {
  const { style, ...reset } = props;
  const navigation = useNavigation();
  return (
    <Pressable onPress={undefined}>
      <MHStack style={styles.container} stretchW>
        <Image style={{ width: 32, height: 32 }} source={require('./../../assets/favicon.png')} />

        <MVStack style={{ flex: 1 }}>
          <MLineLR left={<MText>Polygon(Matic)</MText>} right={<MText>3.12 Matic</MText>} />
          <MLineLR left={<MText>Balance : 111 Matic</MText>} right={<MText>$0.01</MText>} />
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
