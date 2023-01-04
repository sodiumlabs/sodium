import { BigNumber, FixedNumber } from 'ethers';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { encodeERC20Approve } from '../../abi/erc20';
import { useQueryGas } from '../../lib/api/gas';
import { useQueryTokens } from '../../lib/api/tokens';
import { hashcodeObj, removeAllDecimalPoint } from '../../lib/common/common';
import { getNetwork } from '../../lib/common/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { eApproveType, IModalParam, ISignTranscationModalParam, MaxFixedNumber } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { BaseModal } from '../base/baseModal';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import NetworkFeeItem from '../item/networkFeeItem';
import { ApproveItem } from './modalItem/approveItem';
import { ModalTitle } from './modalItem/modalTitle';
import { OperateBtnItem } from './modalItem/operateBtnItem';
import { TransferItem } from './modalItem/transferItem';

// sign transcation - send transcation - deploy transcation

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {

  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const [isLoading, setIsLoading] = useModalLoading(modalParam);
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [gasQuery, paymasterInfos] = useQueryGas(param?.txn?.txReq);

  const [approveSelectedIndex, setApproveSelectedIndex] = useState(eApproveType.KeepUnlimted);
  const [approveSliderValue, setApproveSliderValue] = useState(1);

  const curNetwork = getNetwork(param?.chaindId);
  const decodeApproveData = param?.decodeDatas?.find((decodeTxn) => !!decodeTxn.decodeApproveData);

  const onConfirmClick = useCallback(async () => {
    if (!param) return;
    if (isLoading) return;
    // const tx = param.txn.txReq;
    if (!param?.decodeDatas) return;

    const txs = param.decodeDatas.map(decodeTxn => decodeTxn.originTxReq);

    setIsLoading(true);
    if (decodeApproveData) {
      const approveIndex = param.decodeDatas.findIndex((decodeTxn => !!decodeTxn.decodeApproveData));
      if (approveSelectedIndex == eApproveType.SetAllowance) {
        console.log("eApproveType.SetAllowance");
        // const bigFixed = FixedNumber.from(MaxBigNumber.toString());
        const bigSlider = FixedNumber.fromString(approveSliderValue.toFixed(2));
        const approveNum = BigNumber.from(removeAllDecimalPoint(MaxFixedNumber.mulUnsafe(bigSlider).toString()));

        const transaction = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, approveNum, decodeApproveData.decodeApproveData.token.address);
        txs.splice(approveIndex, 1, transaction);
      }
      else if (approveSelectedIndex == eApproveType.RevokeAfter) {
        console.log("eApproveType.RevokeAfter");
        const revokeTx = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, BigNumber.from(0), decodeApproveData.decodeApproveData.token.address);
        txs.push(revokeTx);
      }
      else {
        console.log("eApproveType.KeepUnlimted");
      }
      console.log("txs:");
      console.log(txs)
      await param.continueClick(txs);

    }
    else {
      console.log("txs:");
      console.log(txs)
      await param.continueClick(txs);
    }

    setIsLoading(false);
    hideModal();
  }, [decodeApproveData, param, isLoading, approveSliderValue, param?.decodeDatas, approveSelectedIndex]);

  const onCancelClick = () => {
    if (!param) return;
    param.cancelClick();
    hideModal();
  }

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>
            <ModalTitle title='Sign Transaction' />

            <MVStack stretchW  >
              <MLineLR
                left={<MText >Network</MText>}
                right={<MHStack>
                  <MImage size={12} />
                  <MText style={{ color: '#8247E5', fontWeight: '700' }} >{curNetwork?.name?.toUpperCase()}</MText>
                </MHStack>} />
              <MLineLR style={{ marginTop: 16 }}
                left={<MText  >Requested at</MText>}
                right={<MText fontSize={8} style={{ color: "#928B8B" }} >{formatTimeYMDHMS(param?.txn?.timeStamp)}</MText>} />
            </MVStack>


            {/* ---------------------approve------------------------- */}
            {
              decodeApproveData && (
                <ApproveItem
                  index={1} maxIndex={param.decodeDatas.length}
                  approveData={decodeApproveData.decodeApproveData}
                  approveSelectedIndex={approveSelectedIndex}
                  setApproveSelectedIndex={setApproveSelectedIndex}
                  approveSliderValue={approveSliderValue}
                  setApproveSliderValue={setApproveSliderValue} />
              )
            }

            {/* ---------------------send------------------------- */}
            {
              param?.decodeDatas && (
                param.decodeDatas.map((decodeTxn, index) => {
                  if (!decodeTxn.decodeTransferData) return;
                  return <TransferItem
                    key={hashcodeObj(decodeTxn) + index}
                    index={index + 1} maxIndex={param.decodeDatas.length}
                    transferData={decodeTxn.decodeTransferData} />
                })
              )
            }
            {/* ---------------------Transcation Data------------------------- */}
            {
              param?.decodeDatas && (
                <BaseFoldFrame
                  header={`Transcation Data(${param.decodeDatas.length})`}
                  style={{ marginTop: 20 }}>
                  {
                    param.decodeDatas.map((decodetxn, index) => {
                      return (
                        <MVStack stretchW key={hashcodeObj(decodetxn) + index}
                          style={{ borderRadius: 10, padding: 15, marginBottom: 10, backgroundColor: 'rgba(1,1,1,0.05)' }}>
                          <MText numberOfLines={null} style={{ color: "#6B6B6B" }}>
                            {
                              JSON.stringify(decodetxn.originTxReq, null, 2)
                            }
                          </MText>
                        </MVStack>
                      )
                    })
                  }
                </BaseFoldFrame>
              )
            }

            {/* ---------------------Fee------------------------- */}
            {
              tokenInfos && paymasterInfos && paymasterInfos.length && (
                <MVStack>
                  <MHStack stretchW style={{ alignItems: 'center', marginTop: 24, marginBottom: 14 }}>
                    <MText>Fee</MText>
                  </MHStack>

                  {
                    paymasterInfos.map((gasInfo, index) => {
                      const ownToken = tokenInfos && tokenInfos.find(t => t.token.address == gasInfo.token.address);
                      return (<NetworkFeeItem key={hashcodeObj(gasInfo) + index} gasInfo={gasInfo} ownToken={ownToken} />)
                    })
                  }
                </MVStack>)
            }
          </ScrollView>
        </MVStack>
        <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} isLoading={isLoading} />
      </MVStack>
    </BaseModal >
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});