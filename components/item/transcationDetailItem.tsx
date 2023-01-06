import { TransactionERC20Transfer } from "@0xsodium/provider";
import { StyleSheet, ViewProps } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { useAuth } from '../../lib/data/auth';
import { eColor } from "../../lib/globalStyles";
import { BaseFoldFrame } from "../base/baseFoldFrame";
import { MDivider } from "../baseUI/mDivider";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { IconArrowR, IconLogo } from '../../lib/imageDefine';
import MAvatar from "../baseUI/mAvatar";


export const TranscationDetailItem = (props: ViewProps & { transfer: TransactionERC20Transfer }) => {
  const { transfer } = props;
  const auth = useAuth();
  const isSent = transfer.from == auth.blockchainAddress;
  // const isReceived = transfer.to == (auth.isLogin && auth.blockchainAddress);

  return (
    <BaseFoldFrame {...props} defaultExpansion header={isSent ? 'Sent' : 'Receive'}>
      <MHStack style={{ flex: 1, alignItems: 'center' }}>
        <MImage w={20} h={20} uri={transfer.token.centerData.logoURI} />
        <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 5 }}>{transfer.token.symbol}</MText>
        <MText style={{ color: eColor.GrayContentText }} >{formatWei2Price(transfer.amount, transfer.token.decimals)} {transfer.token.symbol}</MText>
      </MHStack>

      <MDivider style={{ marginTop: 20 }} />
      <MVStack style={{ marginTop: 20 }}>
        <MText style={{ marginVertical: 5 }}>{isSent ? 'To' : 'From'}</MText>
        <MHStack stretchW style={{ padding: 15, backgroundColor: 'rgba(1,1,1,0.05)', borderRadius: 10, marginTop: 10, alignItems: 'center' }}>
          {/* <MImage w={20} h={20} /> */}
          <MAvatar style={{ marginRight: 10 }} name={isSent ? transfer.to : transfer.from} />
          <MText style={{ flex: 1, color: eColor.GrayContentText }}>{isSent ? transfer.to : transfer.from}</MText>
          {/* <MImage w={14} h={10} style={{ opacity: 0.6 }} source={IconArrowR} /> */}
          {/* <MText style={{ color: eColor.GrayText }}>{"->"}</MText> */}
        </MHStack>
      </MVStack>
    </BaseFoldFrame>
  )
}



const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});