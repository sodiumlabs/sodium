


import { GestureResponderEvent, Image, Pressable, StyleSheet, ViewProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { globalStyle } from '../../lib/globalStyles';

export default function SettingItem(props: ViewProps & { onPress: (event: GestureResponderEvent) => void }) {
  const { style, onPress, ...reset } = props;
  return (
    <Pressable {...reset} style={[styles.container, globalStyle.whiteBorderWidth, style]} onPress={onPress}>
      <MLineLR
        left={
          <MHStack style={{ alignItems: 'center' }}>
            <MImage size={20} style={{ marginRight: 5 }} />
            <MVStack>
              {
                props.children
              }
            </MVStack>
          </MHStack>
        }
        right={<MImage size={10} />} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    // paddingVertical: 20,
    height: 60,
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%',
  }
});
