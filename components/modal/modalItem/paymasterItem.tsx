import { ViewProps } from "react-native";
import { hashcodeObj } from "../../../lib/common";
import MHStack from "../../baseUI/mHStack";
import { MLoading } from "../../baseUI/mLoading";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import NetworkFeeItem from "../../item/networkFeeItem";
import { IUserTokenInfo, PaymasterInfo } from "../../../lib/define";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryGas } from "../../../lib/api/gas";
import { TransactionRequest } from "@0xsodium/transactions";

export function PaymasterItem(props: ViewProps & {
  selectedPayinfo: PaymasterInfo,
  setSelectedPayinfo: Dispatch<SetStateAction<PaymasterInfo>>,
  tokenInfos: IUserTokenInfo[],
  txq: TransactionRequest
}) {
  const { selectedPayinfo, setSelectedPayinfo, tokenInfos, txq } = props;

  const [gasQuery, paymasterInfos] = useQueryGas(txq);

  useEffect(() => {
    if (paymasterInfos && paymasterInfos.length) {
      setSelectedPayinfo(paymasterInfos[0]);
    }
  }, [paymasterInfos])

  return (
    <>
      <MHStack stretchW style={{ alignItems: 'center', marginTop: 24, marginBottom: 14 }}>
        <MText>Fee</MText>
      </MHStack>

      {
        tokenInfos && paymasterInfos && paymasterInfos.length ? (
          <MVStack style={{ marginBottom: 20 }}>
            {
              paymasterInfos.map((gasInfo, index) => {
                const ownToken = tokenInfos && tokenInfos.find(t => t.token.symbol == gasInfo.token.symbol);
                return (<NetworkFeeItem
                  isSelected={selectedPayinfo == gasInfo}
                  key={hashcodeObj(gasInfo) + index}
                  gasInfo={gasInfo} ownToken={ownToken} />)
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