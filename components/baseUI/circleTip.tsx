import { eColor } from "../../lib/globalStyles"
import { MButtonText } from "./mButtonText"
import MHStack from "./mHStack"
import { ViewProps, StyleSheet } from 'react-native';


export const CircleTip = (props: ViewProps & { num: string }) => {
  const { num, style, ...reset } = props;
  if (+num <= 0) return <></>
  return (
    <MHStack style={[localStyles.button, style]} {...reset}>
      <MButtonText title={num} />
    </MHStack>
  )
}


const localStyles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: eColor.Blue
  }
})
