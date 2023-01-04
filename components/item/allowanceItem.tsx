import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { showUpdateComModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from '../baseUI/mImage';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { FailModalItem } from "../modal/modalItem/failModalItem";

export function AllowanceItem() {
  return (
    <MVStack stretchW style={styles.container}>
      <MHStack>
        <MImage />
        <MText>BNB</MText>
      </MHStack>

      <TextItem title={"Secure Issue"} value={"Unlimited Allowance"} />
      <TextItem title={"Danger Level"} value={"High"} />
      <TextItem title={"Contract"} value={"0x93a...97bd"} />
      <TextItem title={"Token"} value={"0x93a...97bd"} />
      <TextItem title={"Approve Date"} value={formatTimeYMDHMS(new Date().getTime())} />
      <TextItem title={"TX"} value={"0x93a...97bd"} />

      <MButton onPress={() => showUpdateComModal(true, { 'height': 300, 'reactNode': <FailModalItem /> })} >
        <MText>Revoke</MText>
      </MButton>
    </MVStack>
  )
}


const TextItem = (props: { title: string, value: string }) => {
  return (
    <MHStack>
      <MText style={{ width: 100, textAlign: 'right' }}>{props.title}:</MText>
      <MText style={{ marginLeft: 15 }}>{props.value}</MText>
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 15,
    backgroundColor: 'rgba(200,200,200,0.6)',
    marginVertical: 20
  },
});