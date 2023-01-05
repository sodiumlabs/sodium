import { GestureResponderEvent, ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import { globalStyle } from '../../lib/globalStyles';
import MImage from './mImage';
import MText from './mText';
import MVStack from './mVStack';

export default function WalletButton(props: { onPress?: (event: GestureResponderEvent) => void; title?: string, source: ImageSourcePropType }) {
  const { onPress, source, title } = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MVStack style={[globalStyle.whiteBorderWidth, styles.button]}>
        <MImage w={20} h={20} source={source} />
      </MVStack>
      <MText style={{ marginTop: 5, fontWeight: '700' }} > {title} </MText>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 40
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
