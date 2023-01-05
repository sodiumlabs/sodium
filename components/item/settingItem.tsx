


import { useState } from 'react';
import { GestureResponderEvent, ImageSourcePropType, Pressable, StyleSheet, ViewProps } from 'react-native';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { IconArrowR } from '../../lib/imageDefine';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MVStack from '../baseUI/mVStack';

export default function SettingItem(props: ViewProps & { onPress: (event: GestureResponderEvent) => void, source: ImageSourcePropType }) {
  const { style, source, onPress, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  return (
    <Pressable
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      style={[styles.container, globalStyle.whiteBorderWidth, style, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]} onPress={onPress}  {...reset} >
      <MLineLR
        left={
          <MHStack style={{ alignItems: 'center' }}>
            <MImage w={15} h={15} style={{ marginRight: 7 }} source={source} />
            <MVStack>
              {
                props.children
              }
            </MVStack>
          </MHStack>
        }
        right={<MImage w={14} h={11} source={IconArrowR} />} />
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
