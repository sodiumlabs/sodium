import { BigNumber, FixedNumber } from 'ethers';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { encodeERC20Approve } from '../../abi/erc20';
import { useQueryGas } from '../../lib/api/gas';
import { useQueryTokens } from '../../lib/api/tokens';
import { hashcodeObj, removeAllDecimalPoint } from '../../lib/common/common';
import { getNetwork } from '../../lib/common/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useProjectSetting } from '../../lib/data/project';
import { eApproveType, IModalParam, ISignTranscationModalParam, ITranscation, MaxFixedNumber, Screens } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { transactionPending } from '../../lib/transaction/pending';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { BaseModal } from '../base/baseModal';
import MHStack from '../baseUI/mHStack';
import MLineLR from '../baseUI/mLineLR';
import { MLoading } from '../baseUI/mLoading';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import NetworkFeeItem from '../item/networkFeeItem';
import { ApproveItem } from './modalItem/approveItem';
import { ModalTitle } from './modalItem/modalTitle';
import { OperateBtnItem } from './modalItem/operateBtnItem';
import { TransferItem } from './modalItem/transferItem';
import { navigate } from '../base/navigationInit';

// sign transcation - send transcation - deploy transcation

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {

  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const projectSetting = useProjectSetting();
  const [isLoading, setIsLoading] = useModalLoading(modalParam);
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [gasQuery, paymasterInfos] = useQueryGas(param?.txn?.txReq);

  const [approveSelectedIndex, setApproveSelectedIndex] = useState(eApproveType.KeepUnlimted);
  const [approveSliderValue, setApproveSliderValue] = useState(1);

  const curNetwork = getNetwork(param?.chaindId);
  // 

  const onConfirmClick = useCallback(async () => {
    if (!param) return;
    if (!tokenInfos || !paymasterInfos || !paymasterInfos.length) return;
    if (isLoading) return;
    // const tx = param.txn.txReq;
    if (!param?.decodeDatas) return;

    const decodeApproveData = param.decodeDatas.find((decodeTxn) => !!decodeTxn.decodeApproveData);
    const txs = param.decodeDatas.map(decodeTxn => decodeTxn.originTxReq);

    setIsLoading(true);
    if (decodeApproveData) {
      if (approveSelectedIndex == eApproveType.SetAllowance) {
        console.log("eApproveType.SetAllowance");
        // const bigFixed = FixedNumber.from(MaxBigNumber.toString());
        const bigSlider = FixedNumber.fromString(approveSliderValue.toFixed(2));
        const approveNum = BigNumber.from(removeAllDecimalPoint(MaxFixedNumber.mulUnsafe(bigSlider).toString()));

        const approveIndex = param.decodeDatas.findIndex((decodeTxn => !!decodeTxn.decodeApproveData));
        const transaction = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, approveNum, decodeApproveData.decodeApproveData.token.address);
        txs.splice(approveIndex, 1, transaction);
      }
      else if (approveSelectedIndex == eApproveType.RevokeAfter) {
        console.log("eApproveType.RevokeAfter");
        const revokeTx = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, BigNumber.from(0), decodeApproveData.decodeApproveData.token.address);
        txs.push(revokeTx);
      }
      else {
        console.log("Let's keep our original tx the same");
      }
    }

    console.log("txs:");
    console.log(txs);

    const decodeTransferData = param?.decodeDatas?.find((decodeTxn) => !!decodeTxn.decodeTransferData);
    const isPending = !!decodeTransferData;

    if (isPending) {
      const onPendingStart = (txHash: string) => {
        setIsLoading(false);
        hideModal();
        param.txn.txHash = txHash;
        param.txn.txGas = paymasterInfos[0]; // todo 

        transactionPending.addCurPending(param.txn);
        navigate(Screens.Wallet);
      }
      const onPendingEnd = () => {
        transactionPending.removeCurPending(param.txn);
      }
      const onError = () => {
        transactionPending.removeCurPending(param.txn);
      }
      await param.continueClick(txs, onPendingStart, onPendingEnd, onError);
    }
    else {
      await param.continueClick(txs);
    }

  }, [param, isLoading, approveSliderValue, param?.decodeDatas, approveSelectedIndex, tokenInfos, paymasterInfos]);

  const onCancelClick = () => {
    if (!param) return;
    param.cancelClick();
    hideModal();
  }

  let transcationIndex = 0;

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>
            <ModalTitle title='Sign Transaction' />

            {
              param?.decodeDatas && (
                <MVStack stretchW  >
                  <MLineLR
                    left={<MText >Network</MText>}
                    right={<MHStack>
                      {/* <MImage w={12} h={12} uri={curNetwork?.bundlerUrl} /> */}
                      <MText style={{ color: '#8247E5', fontWeight: '700' }} >{curNetwork?.name?.toUpperCase()}</MText>
                    </MHStack>} />
                  <MLineLR style={{ marginTop: 16 }}
                    left={<MText  >Requested at</MText>}
                    right={<MText fontSize={8} style={{ color: "#928B8B" }} >{formatTimeYMDHMS(param?.txn?.timeStamp)}</MText>} />
                </MVStack>
              )
            }

            {
              !param?.decodeDatas && <MLoading />
            }

            {/* ---------------------approve------------------------- */}
            {
              param?.decodeDatas && (
                param.decodeDatas.map((decodeTxn, index) => {
                  if (!decodeTxn.decodeApproveData) return;
                  return <ApproveItem
                    key={hashcodeObj(decodeTxn) + index}
                    index={++transcationIndex} maxIndex={param.decodeDatas.length}
                    approveData={decodeTxn.decodeApproveData}
                    approveSelectedIndex={approveSelectedIndex}
                    setApproveSelectedIndex={setApproveSelectedIndex}
                    approveSliderValue={approveSliderValue}
                    setApproveSliderValue={setApproveSliderValue} />
                })
              )
            }

            {/* ---------------------send------------------------- */}
            {
              param?.decodeDatas && (
                param.decodeDatas.map((decodeTxn, index) => {
                  if (!decodeTxn.decodeTransferData) return;
                  return <TransferItem
                    key={hashcodeObj(decodeTxn) + index}
                    index={++transcationIndex} maxIndex={param.decodeDatas.length}
                    transferData={decodeTxn.decodeTransferData} />
                })
              )
            }
            {/* ---------------------unknow Decode data------------------------- */}
            {
              param?.decodeDatas && (
                param.decodeDatas.map((decodeTxn, index) => {
                  if (!decodeTxn.decodeStr) return;
                  return (
                    <BaseFoldFrame defaultExpansion key={hashcodeObj(decodeTxn) + index} header={`Transcation(${++transcationIndex}/${param.decodeDatas.length})`} style={{ marginTop: 20 }}>
                      <MText style={{ color: eColor.GrayContentText }}>{decodeTxn.decodeStr}</MText>
                    </BaseFoldFrame>
                  )
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
                          <MText numberOfLines={null} style={{ color: eColor.GrayContentText }}>
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
              param?.decodeDatas && (
                <>
                  <MHStack stretchW style={{ alignItems: 'center', marginTop: 24, marginBottom: 14 }}>
                    <MText>Fee</MText>
                  </MHStack>

                  {
                    tokenInfos && paymasterInfos && paymasterInfos.length ? (
                      <MVStack style={{ marginBottom: 20 }}>
                        {
                          paymasterInfos.map((gasInfo, index) => {
                            const ownToken = tokenInfos && tokenInfos.find(t => t.token.address == gasInfo.token.address);
                            return (<NetworkFeeItem key={hashcodeObj(gasInfo) + index} gasInfo={gasInfo} ownToken={ownToken} />)
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

          </ScrollView>
        </MVStack>
        <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick}
          isConfirmLoading={isLoading} isConfirmEnable={!!tokenInfos && !!paymasterInfos && !!paymasterInfos.length} />
      </MVStack>
    </BaseModal >
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginBottom: 20
  }
});