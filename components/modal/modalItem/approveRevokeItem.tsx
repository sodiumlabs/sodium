import { ERC20Approve } from "../../../abi/erc20";
import { useAuth } from "../../../lib/data/auth";
import { eColor } from '../../../lib/globalStyles';
import { IconTokenDefault } from '../../../lib/imageDefine';
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MAvatar from '../../baseUI/mAvatar';
import { MDivider } from '../../baseUI/mDivider';
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";


export const ApproveRevokeItem = (props: {
  index: number, maxIndex: number,
  approveData: ERC20Approve,
}) => {
  const { index, maxIndex, approveData } = props;
  const auth = useAuth();

  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }} header={`Revoke Approve(${index}/${maxIndex})`}>

      <MText >Spender</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        {/* <MImage w={20} h={20} /> */}
        <MAvatar name={auth?.blockchainAddress} />
        <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 6 }}>{auth?.blockchainAddress}</MText>
      </MHStack>
      <MDivider style={{ marginVertical: 10 }} />
      <MText >Value</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage w={20} h={20} uri={approveData.token.centerData.logoURI} source={IconTokenDefault} />
        <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 5 }}>{0}</MText>
      </MHStack>

    </BaseFoldFrame>
  )
}