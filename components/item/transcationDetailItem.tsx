import { TransactionERC20Transfer, TransactionHistory } from "@0xsodium/provider";
import { Divider } from "@ui-kitten/components"
import { View, Image, StyleSheet, ViewProps } from 'react-native';
import { BaseFoldFrame } from "../base/baseFoldFrame"
import MHStack from "../baseUI/mHStack"
import MImage from "../baseUI/mImage";
import MText from "../baseUI/mText"
import MVStack from "../baseUI/mVStack"
import { formatWei2Price } from '../../lib/common/common';
import { useAuth } from '../../lib/data/auth';


export const TranscationDetailItem = (props: ViewProps & { transfer: TransactionERC20Transfer }) => {
  const { transfer } = props;
  const auth = useAuth();
  const isSent = transfer.from == auth.blockchainAddress;
  // const isReceived = transfer.to == (auth.isLogin && auth.blockchainAddress);

  return (
    <BaseFoldFrame {...props} defaultExpansion header={isSent ? 'Sent' : 'Receive'}>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} />
        <MText style={{ flex: 1 }}>{transfer.token.symbol}</MText>
        <MText >{formatWei2Price(transfer.amount, transfer.token.decimals)} {transfer.token.symbol}</MText>
      </MHStack>

      <Divider />
      <MVStack style={styles.marginV}>
        <MText style={{ marginVertical: 5 }}>{isSent ? 'To' : 'From'}</MText>
        <MHStack stretchW style={{ padding: 15, backgroundColor: 'white', borderRadius: 10 }}>
          <MImage size={20} />
          <MText style={{ flex: 1 }}>{isSent ? transfer.to : transfer.from}</MText>
          <MImage size={20} />
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