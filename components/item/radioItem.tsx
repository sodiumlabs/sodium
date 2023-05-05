import { StyleProp, ViewProps, ViewStyle } from "react-native";
import MHStack from "../baseUI/mHStack";
import { eColor } from "../../lib/globalStyles";
export const theme = {
  blue: {
    borderStyle: 'solid',
    borderColor: eColor.Blue,
    borderRadius: 100
  } as StyleProp<ViewStyle>,
}

export function MRadioItem(props: ViewProps & { checked?: boolean }) {
  const isCheckedStyle = {
    borderWidth: props.checked ? 5 : 2
  }
  return (
    <MHStack style={[{ width: 16, height: 16 }, theme.blue, isCheckedStyle]} >

    </MHStack >
  )
} 