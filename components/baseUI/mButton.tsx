import { ReactNode, useState } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { eColor } from '../../lib/globalStyles';
import MHStack from './mHStack';
import { MLoading } from './mLoading';
import MPressable from './mPressable';
import BtnTipSvg from '../svg/btnTipSvg';
import MVStack from './mVStack';


export const MButtomTheme = {
  Blue: {
    Normal: eColor.Blue,
    Hover: eColor.HoverBlue,
    Disable: eColor.Disable,
  },
  Grey: {
    Normal: eColor.Black,
    Hover: eColor.HoverBlack,
    Disable: eColor.Disable,
  }
}

export default function MButton(props: PressableProps & { theme?: typeof MButtomTheme.Blue, stretchW?: boolean, isLoading?: boolean, isDisable?: boolean, imageIcon?: ReactNode }) {
  const { theme = MButtomTheme.Blue, style, isDisable, stretchW, isLoading, imageIcon, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);

  const stretchWidth = {
    width: stretchW ? '100%' : 'auto'
  }
  const mButtonStyle = {
    backgroundColor: isDisable ? theme.Disable : (isItemHovered ? theme.Hover : theme.Normal),

  }
  return (
    <MPressable
      disabled={isDisable}
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      style={[localStyles.button, stretchWidth, mButtonStyle, style as StyleProp<ViewStyle>]} {...reset}>
      {
        isLoading ? (
          <MLoading />
        ) : (
          <MHStack style={{ justifyContent: 'center', alignItems: 'center' }} >
            <MVStack style={{ marginRight: 6, justifyContent: 'center', alignItems: 'center' }}>
              {
                imageIcon
              }
              {
                imageIcon === undefined && <BtnTipSvg />
              }

            </MVStack>
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
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,

  }
})
