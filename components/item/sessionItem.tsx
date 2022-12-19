import MVStack from "../baseUI/mVStack";
import { StyleSheet } from "react-native";
import MLineLR from "../baseUI/mLineLR";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import { Divider } from "@ui-kitten/components";
import { formatTimeYMDHMS } from '../../lib/common/time';
import MButton from "../baseUI/mButton";
import { showUpdateComModal } from "../base/modalInit";

export function SessionItem() {
  return (
    <MVStack stretchW style={styles.container}>
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

      <MButton title={"Sign out"} onPress={() => showUpdateComModal(true)} />
    </MVStack>
  )
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 15,
    backgroundColor: 'rgba(200,200,200,0.6)',
    marginVertical: 20
  },
});