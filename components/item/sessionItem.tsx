import { Divider } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { showUpdateComModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { FailModalItem } from "../modal/modalItem/failModalItem";
import { globalStyle } from '../../lib/globalStyles';

export function SessionItem() {
  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth]}>
      <MHStack><MText>Carbon scrub</MText></MHStack>
      <MText>Session key</MText>
      <MText>0x899880842ejlrjljr</MText>
      <Divider />
      <MText>Device</MText>
      <MText>MacIntel</MText>
      <Divider />
      <MText>Last Seen</MText>
      <MText>{formatTimeYMDHMS(new Date().getTime())}</MText>
      <Divider />

      <MText>Networks</MText>
      <MText>Polygon</MText>

      <MButton onPress={() => showUpdateComModal(true, { 'height': 300, 'reactNode': <FailModalItem /> })} >
        <MText>Sign out</MText>
      </MButton>
    </MVStack>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 20
  },
});