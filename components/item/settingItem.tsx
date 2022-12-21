


import { GestureResponderEvent, Image, Pressable, StyleSheet, ViewProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function SettingItem(props: ViewProps & { onPress: (event: GestureResponderEvent) => void }) {
  const { style, onPress, ...reset } = props;
  return (
    <Pressable {...reset} style={[styles.container, style]} onPress={onPress}>
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
    padding: 15,
    marginBottom: 12,
    backgroundColor: 'rgba(200,200,200,0.6)',
    borderRadius: 15,
    width: '100%'
  }
});
