


import { GestureResponderEvent, Image, Pressable, StyleSheet, ViewProps } from 'react-native';
import MHStack from '../baseUI/mHStack';
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
            <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
            <MVStack>
              {
                props.children
              }
            </MVStack>
          </MHStack>
        }
        right={<Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 15,
    width: '100%'
  }
});
