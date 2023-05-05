import { BigNumber, FixedNumber } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { encodeERC20Approve, ERC20Approve } from '../../abi/erc20';
import { useQueryGas } from '../../lib/api/gas';
import { useQueryTokens } from '../../lib/api/tokens';
import { hashcodeObj, removeAllDecimalPoint } from '../../lib/common/common';
import { getNetwork } from '../../lib/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useProjectSetting } from '../../lib/data/project';
import { eApproveType, IDecodeTranscation, IModalParam, ISignTranscationModalParam, MaxFixedNumber, PaymasterInfo, Screens } from '../../lib/define';
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
import { useMabyeCurrentChainId } from '../../lib/network';
import { ABITransaction } from './transactionDecodes';
import { Logger } from '../../lib/common/utils';
import { PaymasterItem } from './modalItem/paymasterItem';
import { TranscationDataItem } from './modalItem/transcationDataItem';

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const currentChainId = useMabyeCurrentChainId(param?.chaindId);
  const currentNetwork = getNetwork(currentChainId);
  const projectSetting = useProjectSetting();
  const [isTxHandling, setTxHandling] = useModalLoading(modalParam);
  const [tokensQuery, tokenInfos] = useQueryTokens(currentChainId);

  // Mainly used for UI display
  const [uiDecodeDatas, setUiDecodeDatas] = useState<IDecodeTranscation[]>(null);
  const [approveSelectedIndex, setApproveSelectedIndex] = useState(eApproveType.KeepUnlimted);
  const [approveSliderValue, setApproveSliderValue] = useState(1);
  const [selectedPayinfo, setSelectedPayinfo] = useState<PaymasterInfo>(null);

  useEffect(() => {
    if (!modalParam.visible) {
      setApproveSelectedIndex(eApproveType.KeepUnlimted);
      setApproveSliderValue(1);
      setUiDecodeDatas(null);
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
    if (!tokenInfos || !selectedPayinfo) return;
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
        const bigSlider = FixedNumber.fromString(approveSliderValue.toFixed(2));
        const approveNum = BigNumber.from(removeAllDecimalPoint(MaxFixedNumber.mulUnsafe(bigSlider).toString()));
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
      await param.continueClick(txs, onPendingStart, onPendingEnd, onError);
    }
    else {
      await param.continueClick(txs);
    }

  }, [param, isTxHandling, approveSliderValue, param?.decodeDatas, approveSelectedIndex, tokenInfos, selectedPayinfo]);

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
                      <></>
                    )
                  }
                })
              )
            }

            {/* ---------------------Transcation Data------------------------- */}
            {
              uiDecodeDatas && (
                <TranscationDataItem uiDecodeDatas={uiDecodeDatas} />
              )
            }

            {/* ---------------------Fee------------------------- */}
            {
              uiDecodeDatas && (
                <PaymasterItem
                  selectedPayinfo={selectedPayinfo}
                  setSelectedPayinfo={setSelectedPayinfo}
                  tokenInfos={tokenInfos}
                  txq={param?.txn?.txReq} />
              )
            }

          </ScrollView>
        </MVStack>
        <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick}
          isConfirmLoading={isTxHandling} isConfirmEnable={!!tokenInfos && !!selectedPayinfo} />
      </MVStack>
    </BaseModal >
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginBottom: 20
  }
});