import { TransactionRequest } from "@0xsodium/transactions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ViewProps } from "react-native";
import { useQueryGas } from "../../../lib/api/gas";
import { hashcodeObj } from "../../../lib/common";
import { PaymasterInfo } from "../../../lib/define";
import MHStack from "../../baseUI/mHStack";
import { MLoading } from "../../baseUI/mLoading";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import NetworkFeeItem from "../../item/networkFeeItem";

export function PaymasterItem(props: ViewProps & {
  selectedPayinfo: PaymasterInfo,
  setSelectedPayinfo: Dispatch<SetStateAction<PaymasterInfo>>,
  txq: TransactionRequest,
  chainId: number,
  visible: boolean
}) {

  const { selectedPayinfo, setSelectedPayinfo, txq, visible } = props;

  const [gasQuery, paymasterInfos] = useQueryGas(txq, props.chainId);
  // const [tokensQuery, tokenInfos] = useQueryTokens(currentChainId);

  useEffect(() => {
    if (!visible) {
      gasQuery.remove();
      setSelectedPayinfo(null);
    }
  }, [visible])

  useEffect(() => {
    if (paymasterInfos && paymasterInfos.length) {
      setSelectedPayinfo(paymasterInfos[0]);
    }
  }, [paymasterInfos])

  const onFeeItemClick = (item: PaymasterInfo) => {
    setSelectedPayinfo(item);
  }

  return (
    <>
      <MHStack stretchW style={{ alignItems: 'center', marginTop: 24, marginBottom: 14 }}>
        <MText>Fee</MText>
      </MHStack>

      {
        selectedPayinfo && paymasterInfos && paymasterInfos.length ? (
          <MVStack style={{ marginBottom: 20 }}>
            {
              paymasterInfos.map((gasInfo, index) => {
                return (<NetworkFeeItem
                  onPress={() => { onFeeItemClick(gasInfo) }}
                  isSelected={selectedPayinfo == gasInfo}
                  key={hashcodeObj(gasInfo) + index}
                  gasInfo={gasInfo} 
                  onPress={() => { setSelectedPayinfo(gasInfo) }}
                />)
              })
            }
          </MVStack>)
          : (
            <MVStack style={{ marginVertical: 20 }}>
              <MLoading />
            </MVStack>
          )
      }
    </>
  )
}