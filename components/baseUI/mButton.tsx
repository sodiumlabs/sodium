import { useState } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { eColor } from '../../lib/globalStyles';
import MHStack from './mHStack';
import { MLoading } from './mLoading';
import MPressable from './mPressable';

export default function MButton(props: PressableProps & { stretchW?: boolean, isLoading?: boolean, hoverColor?: string, isBanHover?: boolean } & { scale?: number }) {
  const { style, isBanHover, hoverColor, stretchW, isLoading, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);

  const stretchWidth = {
    width: stretchW ? '100%' : 'auto'
  }
  // const backgroundColorStyle = {
  //   backgroundColor: style['backgroundColor'] || eColor.Black
  // }
  return (
    <MPressable
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      style={[localStyles.button, stretchWidth, { backgroundColor: !isBanHover && isItemHovered ? hoverColor : eColor.Black, opacity: !isBanHover && isItemHovered ? 1 : 0.8 }, style as StyleProp<ViewStyle>]} {...reset}>
      {
        isLoading ? (
          <MLoading />
        ) : (
          <MHStack style={{ justifyContent: 'center', alignItems: 'center' }} >
            {
              props.children as React.ReactNode
            }
          </MHStack>
        )
      }

    </MPressable>
  )
}

const localStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    // elevation: 3,
    backgroundColor: eColor.Black,
    paddingVertical: 6,
    paddingHorizontal: 10
  }
})
