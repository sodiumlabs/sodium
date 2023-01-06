import { PressableProps, StyleSheet } from "react-native"
import { eColor } from "../../lib/globalStyles"
import MButton from "./mButton"
import { MButtonText } from "./mButtonText"


export const InputEndButton = (props: PressableProps & { title: string }) => {
  const { title, style, ...reset } = props;
  return <MButton
    // onPress={onAddressPasteClick}
    style={[styles.button, style as unknown]} {...reset}>
    <MButtonText style={{ color: eColor.Black, fontWeight: '700' }} title={title} />
  </MButton>
}


const styles = StyleSheet.create({
  button: { position: 'absolute', right: 20, top: 20, borderRadius: 15, backgroundColor: "#EDF2F5", borderColor: "#E5E7EB", borderWidth: 1 }
})