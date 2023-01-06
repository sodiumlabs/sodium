import { Divider } from '@ui-kitten/components';
import { ERC20Transfer } from "../../../abi/index";
import { formatWei2Price } from "../../../lib/common/common";
import { eColor } from '../../../lib/globalStyles';
import { IconTokenDefault } from '../../../lib/imageDefine';
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MAvatar from '../../baseUI/mAvatar';
import { MDivider } from '../../baseUI/mDivider';
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";


export const TransferItem = (props: { index: number, maxIndex: number, transferData: ERC20Transfer }) => {
  const { index, maxIndex, transferData } = props;
  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
      header={`Transfer(${index}/${maxIndex})`}>

      <MText  >Send</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage w={20} h={20} uri={transferData.token.centerData.logoURI} source={IconTokenDefault} />
        {/* <MText style={{ flex: 1, color: eColor.GrayContentText }}>{`${transferData.token.name}(${transferData.token.symbol})`}</MText> */}
        <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 5 }}>{`${transferData.token.symbol}`}</MText>
        <MText style={{ color: eColor.GrayContentText }}  >{formatWei2Price(transferData.amount.toString(), transferData.token.decimals, 10)} {transferData.token.symbol}</MText>
      </MHStack>

      <MDivider style={{ marginBottom: 20 }} />
      <MText >To Recipient</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MAvatar name={transferData.to} style={{ marginRight: 6 }} />
        <MText style={{ flex: 1, color: eColor.GrayContentText }}>{transferData.to}</MText>
      </MHStack>
    </BaseFoldFrame>
  )
}