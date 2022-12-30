import { Divider } from '@ui-kitten/components';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useQueryGas } from '../../lib/api/gas';
import { useQueryTokens } from '../../lib/api/tokens';
import { formatWei2Price, hashcodeObj } from '../../lib/common/common';
import { getNetwork } from '../../lib/common/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useAuth } from '../../lib/data/auth';
import { IModalParam, ISignTranscationModalParam } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import NetworkFeeItem from '../item/networkFeeItem';

// sign transcation - send transcation - deploy transcation

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {

  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const [isLoading, setIsLoading] = useModalLoading(modalParam);
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [gasQuery, paymasterInfos] = useQueryGas(param?.txn?.txReq);
  const auth = useAuth();

  // const onClickTranscationQueue = () => {
  //   showSignTranscationModal(false);
  //   showTranscationQueueModal(true);
  // }
  const onConfirmClick = async () => {
    if (!param) return;
    if (isLoading) return;
    setIsLoading(true);
    await param.continueClick();
    setIsLoading(false);
    hideModal();
  }
  const onCancelClick = () => {
    if (!param) return;
    param.cancelClick();
    hideModal();
  }
  const curNetwork = getNetwork(param?.chaindId);

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView >
            <MHStack stretchW style={{ justifyContent: 'center' }}>
              <MText>Sign Transaction </MText>
            </MHStack>

            <MVStack stretchW>
              <MLineLR
                left={
                  <>
                    <MText >Network</MText>
                    <MImage size={20} />
                  </>}
                right={<MText >{curNetwork?.name?.toUpperCase()}</MText>} />
              <MLineLR
                left={<MText >Requested at</MText>}
                right={<MText>{formatTimeYMDHMS(param?.txn?.timeStamp)}</MText>} />
            </MVStack>


            {/* ---------------------approve------------------------- */}
            {
              param?.decodeDatas && (
                param.decodeDatas.map((decodeTxn, index) => {
                  if (!decodeTxn.decodeApproveData) return;
                  return (
                    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
                      header={<MText >{`Approve(${index + 1}/${param.decodeDatas.length})`}</MText>}>

                      <MText>Spender</MText>
                      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                        <MImage size={20} />
                        <MText style={{ flex: 1 }}>{auth?.blockchainAddress}</MText>
                      </MHStack>

                      <Divider />
                      <MText>Value</MText>
                      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                        <MImage size={20} />
                        <MText style={{ flex: 1 }}>{formatWei2Price(decodeTxn.decodeTransferData.amount.toString(), decodeTxn.decodeTransferData.token.decimals, 10)} {decodeTxn.decodeTransferData.token.symbol}</MText>
                      </MHStack>
                    </BaseFoldFrame>
                  )
                })
              )
            }

            {/* ---------------------send------------------------- */}
            {
              param?.decodeDatas && (
                param.decodeDatas.map((decodeTxn, index) => {
                  if (!decodeTxn.decodeTransferData) return;
                  return (
                    <BaseFoldFrame key={hashcodeObj(decodeTxn) + index} defaultExpansion style={{ marginTop: 20 }}
                      header={<MText >{`Transfer(${index + 1}/${param.decodeDatas.length})`}</MText>}>

                      <MText>Send</MText>
                      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                        <MImage size={20} />
                        <MText style={{ flex: 1 }}>{`${decodeTxn.decodeTransferData.token.name}(${decodeTxn.decodeTransferData.token.symbol})`}</MText>
                        <MText >{formatWei2Price(decodeTxn.decodeTransferData.amount.toString(), decodeTxn.decodeTransferData.token.decimals, 10)} {decodeTxn.decodeTransferData.token.symbol}</MText>
                      </MHStack>

                      <Divider />
                      <MText>To Recipient</MText>
                      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                        <MImage size={20} />
                        <MText style={{ flex: 1 }}>{decodeTxn.decodeTransferData.to}</MText>
                      </MHStack>
                    </BaseFoldFrame>
                  )
                })
              )
            }
            {/* ---------------------Transcation Data------------------------- */}
            {
              param?.decodeDatas && (
                <BaseFoldFrame header={<MText>{`Transcation Data(${param.decodeDatas.length})`}</MText>} style={{ marginTop: 20 }}>
                  {
                    param.decodeDatas.map((decodetxn, index) => {
                      return (
                        <MVStack stretchW key={hashcodeObj(decodetxn) + index} style={{ backgroundColor: '#999', borderRadius: 15, padding: 15 }}>
                          <Text>
                            {
                              JSON.stringify(decodetxn.originTxReq, null, 2)
                            }
                          </Text>
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
                  <MHStack stretchW style={{ alignItems: 'center' }}>
                    <MText>Network Fee</MText>
                    <MHStack style={{ borderRadius: 999, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }}>
                      <MImage size={10} />
                    </MHStack>
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
        <MHStack stretchW>
          <MButton style={{ flex: 1 }} onPress={onCancelClick} >
            <MText>Cancel</MText>
          </MButton>
          <MButton style={{ flex: 1 }} onPress={onConfirmClick} isLoading={isLoading} >
            <MText>Confirm</MText>
          </MButton>
        </MHStack>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});