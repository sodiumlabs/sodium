import { ERC20Approve } from "../../../abi/erc20"
import { Divider } from '@ui-kitten/components';
import { hashcodeObj, formatWei2Price } from "../../../lib/common/common"
import { useAuth } from "../../../lib/data/auth"
import { MaxBigNumber } from "../../../lib/define"
import { BaseFoldFrame } from "../../base/baseFoldFrame"
import MHStack from "../../baseUI/mHStack"
import MImage from "../../baseUI/mImage"
import MText from "../../baseUI/mText"
import MVStack from "../../baseUI/mVStack"


export const ApproveItem = (props: { index: number, maxIndex: number, approveData: ERC20Approve }) => {
  const { index, maxIndex, approveData } = props;
  const auth = useAuth();

  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
      header={<MText >{`Approve(${index}/${maxIndex})`}</MText>}>

      <MText>Spender</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} />
        <MText style={{ flex: 1 }}>{auth?.blockchainAddress}</MText>
      </MHStack>

      <Divider />
      <MText>Value</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} url={approveData.token.centerData.logoURI} />
        {
          approveData.amount.eq(MaxBigNumber) ? (
            <MText numberOfLines={null} style={{ flex: 1 }}>Unlimted</MText>
          ) : (
            <MText numberOfLines={null} style={{ flex: 1 }}>{formatWei2Price(approveData.amount.toString(), approveData.token.decimals, 10)}</MText>
          )
        }
      </MHStack>
      <MVStack>

      </MVStack>
    </BaseFoldFrame>
  )
}