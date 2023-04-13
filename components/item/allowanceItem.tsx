import { StyleSheet } from "react-native";
import { formatTimeYMDHMS } from '../../lib/common/time';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import MHStack from "../baseUI/mHStack";
import MImage from '../baseUI/mImage';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { Allowance } from "@0xsodium/provider";
import { useAuth } from "../../lib/data/auth";
import { useCallback } from "react";
import { encodeERC20Approve } from '../../abi';
import { BigNumber } from 'ethers';
import { showUpdateSignTranscationModal } from "../../lib/data/modal";

export function AllowanceItem(props: { allowance: Allowance }) {
  const allowance = props.allowance;
  const authData = useAuth();

  const revokeAllowance = useCallback(async () => {
    if (authData.isLogin) {
      showUpdateSignTranscationModal(true, null);
      const tx = await encodeERC20Approve(allowance.to, BigNumber.from(0), allowance.token.address);
      const txr = await authData.web3signer.sendTransaction(tx);
      await txr.wait();
    }
  }, [authData, allowance]);

  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth]}>
      <MHStack>
        <MImage />
        <MText style={{ fontWeight: '700' }} >
          {allowance.token.name}({allowance.token.symbol})
        </MText>
      </MHStack>

      <TextItem title={"Secure Issue"} value={"Unlimited Allowance"} />
      <TextItem title={"Danger Level"} value={"High"} />
      <TextItem title={"Contract"} value={allowance.to} />
      <TextItem title={"Token"} value={allowance.token.address} />
      <TextItem title={"Approve Date"} value={formatTimeYMDHMS(allowance.blockTimestamp * 1000)} />
      <TextItem title={"TX"} value={allowance.transactionHash} />

      <MButton onPress={revokeAllowance} style={{ marginTop: 10 }} >
        <MButtonText title={"Revoke"} />
      </MButton>
    </MVStack>
  )
}


const TextItem = (props: { title: string, value: string }) => {
  return (
    <MHStack style={{ marginTop: 6 }}>
      <MText style={{ width: 100, textAlign: 'right' }}>{props.title}:</MText>
      <MText style={{ marginLeft: 15, color: eColor.GrayContentText }}>{props.value}</MText>
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20
  },
});