import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import { MDivider } from "../baseUI/mDivider";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function SessionItem() {


  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth]}>
      <MHStack><MText style={{ fontWeight: '700', marginBottom: 10 }} >Carbon scrub</MText></MHStack>
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

      <MButton style={{ backgroundColor: eColor.Blue, marginTop: 10, height: 30 }} >
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