import { BigNumber } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ERC20Approve, encodeERC20Approve } from '../../abi/erc20';
import { formatPrice2Wei, hashcodeObj } from '../../lib/common/common';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { Logger } from '../../lib/common/utils';
import { useProjectSetting } from '../../lib/data/project';
import { IDecodeTranscation, IModalParam, ISignTranscationModalParam, PaymasterInfo, Screens, eApproveType } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { getNetwork, useMabyeCurrentChainId } from '../../lib/network';
import { transactionPending } from '../../lib/transaction/pending';
import { BaseModal } from '../base/baseModal';
import { navigate } from '../base/navigation';
import MHStack from '../baseUI/mHStack';
import MLineLR from '../baseUI/mLineLR';
import { MLoading } from '../baseUI/mLoading';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { ApproveItem } from './modalItem/approveItem';
import { ApproveRevokeItem } from './modalItem/approveRevokeItem';
import { ModalTitle } from './modalItem/modalTitle';
import { OperateBtnItem } from './modalItem/operateBtnItem';
import { PaymasterItem } from './modalItem/paymasterItem';
import { TranscationDataItem } from './modalItem/transcationDataItem';
import { TransferItem } from './modalItem/transferItem';
import { ABITransaction } from './transactionDecodes';

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const currentChainId = useMabyeCurrentChainId(param?.chaindId);
  const currentNetwork = getNetwork(currentChainId);
  const projectSetting = useProjectSetting();
  const [isTxHandling, setTxHandling] = useModalLoading(modalParam);

  // Mainly used for UI display
  const [uiDecodeDatas, setUiDecodeDatas] = useState<IDecodeTranscation[]>(null);
  const [approveSelectedIndex, setApproveSelectedIndex] = useState(eApproveType.KeepUnlimted);
  const [approveInputValue, setApproveInputValue] = useState(1);
  const [selectedPayinfo, setSelectedPayinfo] = useState<PaymasterInfo>(null);

  useEffect(() => {
    if (!modalParam.visible) {
      setApproveSelectedIndex(eApproveType.KeepUnlimted);
      setApproveInputValue(0);
      setUiDecodeDatas(null);
      setSelectedPayinfo(null);
    } else {
      setUiDecodeDatas(param?.decodeDatas);
    }

  }, [modalParam.visible, param?.decodeDatas])

  // 所有交易总共花费了多少钱.
  const totalValue: BigNumber = useMemo(() => {
    if (param && param.decodeDatas) {
      return param.decodeDatas.reduce((total, decodeTxn) => {
        return total.add(BigNumber.from(decodeTxn.originTxReq.value ?? 0));
      }, BigNumber.from(0))
    }
    return BigNumber.from(0);
  }, [param?.decodeDatas]);

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

        // const bigSlider = FixedNumber.fromString(approveInputValue.toFixed(2));
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
  }, [approveSelectedIndex, approveInputValue, param?.decodeDatas])

  const onConfirmClick = useCallback(async () => {
    if (!param) return;
    if (!selectedPayinfo) return;
    if (isTxHandling) return;
    // const tx = param.txn.txReq;
    if (!param?.decodeDatas) return;

    const decodeApproveData = param.decodeDatas.find((decodeTxn) => !!decodeTxn.decodeApproveData);
    const txs = param.decodeDatas.map(decodeTxn => decodeTxn.originTxReq);

    setTxHandling(true);
    if (decodeApproveData) {
      if (approveSelectedIndex == eApproveType.SetAllowance) {
        Logger.debug("eApproveType.SetAllowance");
        // const bigFixed = FixedNumber.from(MaxBigNumber.toString());
        // const bigSlider = FixedNumber.fromString(approveInputValue.toFixed(2));
        // const approveNum = BigNumber.from(removeAllDecimalPoint(MaxFixedNumber.mulUnsafe(bigSlider).toString()));
        const approveNum = BigNumber.from(formatPrice2Wei(approveInputValue.toString(), decodeApproveData.decodeApproveData.token.decimals));
        const approveIndex = param.decodeDatas.findIndex((decodeTxn => !!decodeTxn.decodeApproveData));
        const transaction = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, approveNum, decodeApproveData.decodeApproveData.token.address);
        txs.splice(approveIndex, 1, transaction);
      }
      else if (approveSelectedIndex == eApproveType.RevokeAfter) {
        Logger.debug("eApproveType.RevokeAfter");
        const revokeTx = await encodeERC20Approve(decodeApproveData.decodeApproveData.to, BigNumber.from(0), decodeApproveData.decodeApproveData.token.address);
        txs.push(revokeTx);
      } else {
        Logger.debug("Let's keep our original tx the same");
      }
    }

    Logger.debug("txs:");
    Logger.debug(txs);

    const decodeTransferData = param?.decodeDatas?.find((decodeTxn) => !!decodeTxn.decodeTransferData);
    const isPending = !!decodeTransferData;

    if (isPending) {
      const onPendingStart = (txHash: string) => {
        setTxHandling(false);
        hideModal();
        param.txn.txHash = txHash;
        param.txn.txGas = selectedPayinfo;
        transactionPending.addCurPending(param.txn);
        navigate(Screens.Wallet);
      }
      const onPendingEnd = () => {
        Logger.debug("onPendingEnd");
        transactionPending.removeCurPending(param.txn);
      }
      const onError = () => {
        hideModal();
        transactionPending.removeCurPending(param.txn);
      }
      await param.continueClick(selectedPayinfo.userOp, onPendingStart, onPendingEnd, onError);
    }
    else {
      await param.continueClick(selectedPayinfo.userOp);
    }

  }, [param, isTxHandling, approveInputValue, param?.decodeDatas, approveSelectedIndex, selectedPayinfo]);

  const onCancelClick = () => {
    if (!param) return;
    param.cancelClick();
    hideModal();
  }

  const onEstimateFailed = (msg: string) => {
    if (!param) return;
    hideModal();
    param.estimateFailed(msg);
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
                      <MText style={{ color: '#8247E5', fontWeight: '700' }} >{currentNetwork?.name?.toUpperCase()}</MText>
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
                        approveInputValue={approveInputValue}
                        setApproveInputValue={setApproveInputValue} />
                    ) : (
                      <ApproveRevokeItem
                        key={key}
                        index={transcationIndex}
                        maxIndex={transcationMaxIndex}
                        approveData={decodeTxn.decodeApproveData}
                      />
                    )
                  } else if (param) {
                    return (
                      <ABITransaction
                        key={key}
                        transcationIndex={transcationIndex}
                        transcationMaxIndex={transcationMaxIndex}
                        decodeTxn={decodeTxn}
                        chainId={param.chaindId}
                      ></ABITransaction>
                    )
                  } else {
                    return (
                      <View key={key}></View>
                    )
                  }
                })
              )
            }

            {/* ---------------------Transcation Data------------------------- */}
            {
              uiDecodeDatas && ( // key={hashcodeObj(uiDecodeDatas)}
                <TranscationDataItem uiDecodeDatas={uiDecodeDatas} />
              )
            }

            {/* ---------------------Fee------------------------- */}
            {
              uiDecodeDatas && (
                <PaymasterItem
                  selectedPayinfo={selectedPayinfo}
                  setSelectedPayinfo={setSelectedPayinfo}
                  txq={param?.txn?.txReq}
                  chainId={param?.chaindId}
                  visible={modalParam.visible}
                  estimateFailed={onEstimateFailed}
                />
              )
            }

          </ScrollView>
        </MVStack>
        <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick}
          isConfirmLoading={isTxHandling} isConfirmEnable={!!selectedPayinfo} />
      </MVStack>
    </BaseModal >
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginBottom: 20
  }
});