import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import { MDivider } from "../baseUI/mDivider";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function SessionItem(props: { isSelected: boolean }) {
  const { isSelected } = props;
  const selectStyle = {
    borderColor: isSelected ? eColor.Blue : eColor.Border
  }
  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth, selectStyle]}>
      <MLineLR
        style={{ marginBottom: 10 }}
        left={<MText style={{ fontWeight: '700', flex: 1 }} >Carbon scrub</MText>}
        right={<MText style={{ fontWeight: '700', color: eColor.GrayText }} fontSize={12} >{isSelected ? "Current Session" : ""}</MText>} />
      <MText >Session key</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>0x899880842ejlrjljr</MText>
      <MDivider style={{ marginVertical: 10 }} />
      <MText>Device</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>MacIntel</MText>
      <MDivider style={{ marginVertical: 10 }} />
      <MText>Last Seen</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>{formatTimeYMDHMS(new Date().getTime())}</MText>
      <MDivider style={{ marginVertical: 10 }} />

      <MText>Networks</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>Polygon</MText>

      <MButton style={{ marginTop: 10, height: 30 }} >
        <MButtonText title={"Sign out"} />
      </MButton>
    </MVStack>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20
  },
});