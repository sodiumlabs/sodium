import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { showUpdateComModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from '../baseUI/mImage';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { FailModalItem } from "../modal/modalItem/failModalItem";
import { eColor, globalStyle } from '../../lib/globalStyles';

export function AllowanceItem() {
  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth]}>
      <MHStack>
        <MImage />
        <MText style={{ fontWeight: '700' }} >BNB</MText>
      </MHStack>

      <TextItem title={"Secure Issue"} value={"Unlimited Allowance"} />
      <TextItem title={"Danger Level"} value={"High"} />
      <TextItem title={"Contract"} value={"0x93a...97bd"} />
      <TextItem title={"Token"} value={"0x93a...97bd"} />
      <TextItem title={"Approve Date"} value={formatTimeYMDHMS(new Date().getTime())} />
      <TextItem title={"TX"} value={"0x93a...97bd"} />

      <MButton style={{ backgroundColor: eColor.Blue, marginTop: 10, height: 30 }} >
        <MText style={{ color: '#ffffff', fontWeight: '700' }} >Revoke</MText>
      </MButton>
    </MVStack>
  )
}


const TextItem = (props: { title: string, value: string }) => {
  return (
    <MHStack style={{ marginTop: 6 }}>
      <MText style={{ width: 100, textAlign: 'right' }}>{props.title}:</MText>
      <MText style={{ marginLeft: 15 }}>{props.value}</MText>
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20
  },
});