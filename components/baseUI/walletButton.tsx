import { ReactNode, useState } from 'react';
import { GestureResponderEvent, ImageSourcePropType, Pressable, StyleSheet } from 'react-native';
import { globalStyle, eColor } from '../../lib/globalStyles';
import MImage from './mImage';
import MText from './mText';
import MVStack from './mVStack';
import MPressable from './mPressable';

export default function WalletButton(props: { onPress?: (event: GestureResponderEvent) => void; title?: string, source: ReactNode }) {
  const { onPress, source, title } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  return (
    <MPressable scale={1.05} style={[styles.container]}
      onPress={onPress}
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
    >
      <MVStack style={[globalStyle.whiteBorderWidth, styles.button, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]}>
        {/* <MImage w={20} h={20} source={source} /> */}
        {source}
      </MVStack>
      <MText style={{ marginTop: 5, fontWeight: '700' }} > {title} </MText>
    </MPressable>

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
