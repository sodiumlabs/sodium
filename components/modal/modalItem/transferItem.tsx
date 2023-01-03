import { Divider } from '@ui-kitten/components';
import { ERC20Transfer } from "../../../abi/index";
import { formatWei2Price } from "../../../lib/common/common";
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";


export const TransferItem = (props: { index: number, maxIndex: number, transferData: ERC20Transfer }) => {
  const { index, maxIndex, transferData } = props;
  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
      header={<MText >{`Transfer(${index}/${maxIndex})`}</MText>}>

      <MText>Send</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} />
        <MText style={{ flex: 1 }}>{`${transferData.token.name}(${transferData.token.symbol})`}</MText>
        <MText >{formatWei2Price(transferData.amount.toString(), transferData.token.decimals, 10)} {transferData.token.symbol}</MText>
      </MHStack>

      <Divider />
      <MText>To Recipient</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} />
        <MText style={{ flex: 1 }}>{transferData.to}</MText>
      </MHStack>
    </BaseFoldFrame>
  )
}