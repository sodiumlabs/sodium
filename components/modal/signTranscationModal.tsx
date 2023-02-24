import { BigNumber, FixedNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { encodeERC20Approve, ERC20Approve } from '../../abi/erc20';
import { useQueryGas } from '../../lib/api/gas';
import { useQueryTokens } from '../../lib/api/tokens';
import { hashcodeObj, removeAllDecimalPoint } from '../../lib/common/common';
import { getNetwork } from '../../lib/common/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useProjectSetting } from '../../lib/data/project';
import { eApproveType, IDecodeTranscation, IModalParam, ISignTranscationModalParam, MaxFixedNumber, Screens } from '../../lib/define';
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
import { ApproveRevokeItem } from './modalItem/approveRevokeItem';
import { ModalTitle } from './modalItem/modalTitle';
import { OperateBtnItem } from './modalItem/operateBtnItem';
import { TransferItem } from './modalItem/transferItem';
import { navigate } from '../base/navigation';
import { useCurrentChainId } from '../../lib/network';

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const currentChainId = useCurrentChainId();
  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const projectSetting = useProjectSetting();
  const [isTxHandling, setTxHandling] = useModalLoading(modalParam);
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens(currentChainId);
  const [gasQuery, paymasterInfos] = useQueryGas(param?.txn?.txReq);

  // Mainly used for UI display
  const [uiDecodeDatas, setUiDecodeDatas] = useState<IDecodeTranscation[]>(null);
  // const auth = useAuth();

  const [approveSelectedIndex, setApproveSelectedIndex] = useState(eApproveType.KeepUnlimted);
  const [approveSliderValue, setApproveSliderValue] = useState(1);

  useEffect(() => {
    if (!modalParam.visible) {
      setApproveSelectedIndex(eApproveType.KeepUnlimted);
      setApproveSliderValue(1);
      setUiDecodeDatas(null);
    } else {
      setUiDecodeDatas(param?.decodeDatas);
    }

  }, [modalParam.visible, param?.decodeDatas])

  const curNetwork = getNetwork(param?.chaindId);
  // 

  useEffect(() => {
    (async () => {
      if (!param?.decodeDatas) return;
      if (approveSelectedIndex == eApproveType.RevokeAfter) {
        const decodeApproveData = param.decodeDatas.find((decodeTxn) => !!decodeTxn.decodeApproveData);
        // encode from approve
        const revokeTx = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, BigNumber.from(0), decodeApproveData.decodeApproveData.token.address);
        // new revokeApprove
        const decodeApproveRevokeData = JSON.parse(JSON.stringify(decodeApproveData.decodeApproveData)) as ERC20Approve;
        decodeApproveRevokeData.amount = BigNumber.from(0);
        const decodeRevokeApprove = {
          'originTxReq': revokeTx,
          'decodeApproveData': decodeApproveRevokeData
          // 'decodeApproveData': await decodeERC20Approve(revokeTx, auth.web3signer)  // too slowly
        } as IDecodeTranscation;
        setUiDecodeDatas([...param?.decodeDatas, decodeRevokeApprove]);
      } else if (approveSelectedIndex == eApproveType.SetAllowance) {
        // const decodeApproveData = param.decodeDatas.find((decodeTxn) => !!decodeTxn.decodeApproveData);

        // const bigSlider = FixedNumber.fromString(approveSliderValue.toFixed(2));
        // const approveNum = BigNumber.from(removeAllDecimalPoint(MaxFixedNumber.mulUnsafe(bigSlider).toString()));
        // const revokeTx = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, approveNum, decodeApproveData.decodeApproveData.token.address);

        // const uiDecodeApproveData = uiDecodeDatas.find((decodeTxn) => !!decodeTxn.decodeApproveData);
        // uiDecodeApproveData.originTxReq = revokeTx;
        // setUiDecodeDatas([...uiDecodeDatas]);
        setUiDecodeDatas(param?.decodeDatas);
      } else {
        setUiDecodeDatas(param?.decodeDatas);
      }
    })()
  }, [approveSelectedIndex, approveSliderValue, param?.decodeDatas])

  const onConfirmClick = useCallback(async () => {
    if (!param) return;
    if (!tokenInfos || !paymasterInfos || !paymasterInfos.length) return;
    if (isTxHandling) return;
    // const tx = param.txn.txReq;
    if (!param?.decodeDatas) return;

    const decodeApproveData = param.decodeDatas.find((decodeTxn) => !!decodeTxn.decodeApproveData);
    const txs = param.decodeDatas.map(decodeTxn => decodeTxn.originTxReq);

    setTxHandling(true);
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
        console.log("onPendingStart");
        setTxHandling(false);
        hideModal();
        param.txn.txHash = txHash;
        param.txn.txGas = paymasterInfos[0]; // todo 

        transactionPending.addCurPending(param.txn);
        navigate(Screens.Wallet);
      }
      const onPendingEnd = () => {
        console.log("onPendingEnd");
        transactionPending.removeCurPending(param.txn);
      }
      const onError = () => {
        hideModal();
        transactionPending.removeCurPending(param.txn);
      }
      await param.continueClick(txs, onPendingStart, onPendingEnd, onError);
    }
    else {
      await param.continueClick(txs);
    }

  }, [param, isTxHandling, approveSliderValue, param?.decodeDatas, approveSelectedIndex, tokenInfos, paymasterInfos]);

  const onCancelClick = () => {
    if (!param) return;
    param.cancelClick();
    hideModal();
  }

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
      hideImmediately={modalParam.hideImmediately}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>
            <ModalTitle title='Sign Transaction' />

            {
              uiDecodeDatas && (
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
              !uiDecodeDatas && <MLoading />
            }

            {
              uiDecodeDatas && (
                uiDecodeDatas.map((decodeTxn, index) => {
                  const key = hashcodeObj(decodeTxn) + index;
                  const transcationIndex = index + 1;
                  const transcationMaxIndex = uiDecodeDatas.length;
                  if (decodeTxn.decodeTransferData) {
                    // send 
                    return <TransferItem
                      key={key}
                      index={transcationIndex} maxIndex={transcationMaxIndex}
                      transferData={decodeTxn.decodeTransferData} />
                  }
                  else if (decodeTxn.decodeApproveData) {
                    // approve 
                    return decodeTxn.decodeApproveData.amount.gt(0) ? (
                      <ApproveItem
                        disabled={isTxHandling}
                        key={key}
                        index={transcationIndex} maxIndex={transcationMaxIndex}
                        approveData={decodeTxn.decodeApproveData}
                        approveSelectedIndex={approveSelectedIndex}
                        setApproveSelectedIndex={setApproveSelectedIndex}
                        approveSliderValue={approveSliderValue}
                        setApproveSliderValue={setApproveSliderValue} />
                    ) : (
                      <ApproveRevokeItem
                        key={key}
                        index={transcationIndex}
                        maxIndex={transcationMaxIndex}
                        approveData={decodeTxn.decodeApproveData}
                      />
                    )
                  } else if (decodeTxn.decodeStr) {
                    // unknow decode str
                    return <BaseFoldFrame defaultExpansion key={key} header={`Transaction(${transcationIndex}/${transcationMaxIndex})`} style={{ marginTop: 20 }}>
                      <MText style={{ color: eColor.GrayContentText }}>{decodeTxn.decodeStr}</MText>
                    </BaseFoldFrame>
                  } else {
                    return <></>
                  }

                })
              )
            }

            {/* ---------------------Transcation Data------------------------- */}
            {
              uiDecodeDatas && (
                <BaseFoldFrame
                  header={`Transcation Data(${uiDecodeDatas.length})`}
                  style={{ marginTop: 20 }}>
                  {
                    uiDecodeDatas.map((decodetxn, index) => {
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
              uiDecodeDatas && (
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
          isConfirmLoading={isTxHandling} isConfirmEnable={!!tokenInfos && !!paymasterInfos && !!paymasterInfos.length} />
      </MVStack>
    </BaseModal >
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginBottom: 20
  }
});