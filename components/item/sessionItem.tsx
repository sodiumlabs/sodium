import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import { MDivider } from "../baseUI/mDivider";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { Session } from "../../lib/auth";

export function SessionItem(props: { isSelected: boolean, session: Session, onLogout: (session: Session) => void }) {
  const { isSelected, session } = props;
  const selectStyle = {
    borderColor: isSelected ? eColor.Blue : eColor.Border
  }

  const onLogout = () => {
    props.onLogout(session);
  }

  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth, selectStyle]}>
      <MLineLR
        style={{ marginBottom: 10 }}
        left={<MText style={{ fontWeight: '700', flex: 1 }} >Carbon scrub</MText>}
        right={<MText style={{ fontWeight: '700', color: eColor.GrayText }} fontSize={12} >{isSelected ? "Current Session" : ""}</MText>} />
      <MText >Session key</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>{session.sessionKey}</MText>
      <MDivider style={{ marginVertical: 10 }} />
      <MText>Device</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>{session.deviceInfo}</MText>
      <MDivider style={{ marginVertical: 10 }} />
      <MText>Last Seen</MText>
      <MText style={{ color: eColor.GrayContentText, marginTop: 5 }}>{formatTimeYMDHMS(session.lastSeen * 1000)}</MText>
      <MDivider style={{ marginVertical: 10 }} />
      <MButton style={{ marginTop: 10 }} onPress={onLogout} >
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