import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Divider } from '@ui-kitten/components';
import { IModalParam, ISignTranscationModalParam } from '../../lib/define';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { BaseModal } from '../base/baseModal';
import { showSignTranscationModal, showTranscationQueueModal } from '../base/modalInit';
import NetworkFeeItem from '../item/networkFeeItem';
import { useEffect, useState } from 'react';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import MButton from '../baseUI/mButton';
import { formatWei2Price } from '../../lib/common/common';
import { getNetwork } from '../../lib/common/network';

// sign transcation - send transcation - deploy transcation

export const SignTranscationModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {

  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignTranscationModalParam;
  const [isLoading, setIsLoading] = useState(false);
  // reset
  useEffect(() => {
    if (!modalParam.visible) {
      setIsLoading(false);
    }
  }, [modalParam.visible])

  const onClickTranscationQueue = () => {
    showSignTranscationModal(false);
    showTranscationQueueModal(true);
  }
  const onConfirmClick = async () => {
    setIsLoading(true);
    await param.continueClick();
    setIsLoading(false);
    hideModal();
  }
  const onCancelClick = () => {
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
            {/* <Pressable onPress={onClickTranscationQueue}>
              <MText>Transcation Queue</MText>
            </Pressable> */}

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
                right={<MText>December 1, 2022 8:17:14 pm</MText>} />
            </MVStack>


            {
              param?.decodeTransfer && (
                param.decodeTransfer.map((decodeTxn, index) => {
                  return (
                    <BaseFoldFrame key={JSON.stringify(decodeTxn.origin) + index} defaultExpansion style={{ marginTop: 20 }}
                      header={<MText >{`Transfer(${index + 1}/${param.decodeTransfer.length})`}</MText>}>

                      <MText>Send</MText>
                      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                        <MImage size={20} />
                        <MText style={{ flex: 1 }}>{`${decodeTxn.decodeTransfer.token.name}(${decodeTxn.decodeTransfer.token.symbol})`}</MText>
                        <MText >{formatWei2Price(decodeTxn.decodeTransfer.amount.toString(), decodeTxn.decodeTransfer.token.decimals)} {decodeTxn.decodeTransfer.token.symbol}</MText>
                      </MHStack>

                      <Divider />
                      <MText>To Recipient</MText>
                      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
                        <MImage size={20} />
                        <MText style={{ flex: 1 }}>{decodeTxn.decodeTransfer.to}</MText>
                      </MHStack>
                    </BaseFoldFrame>
                  )
                })
              )
            }

            {
              param?.decodeTransfer && (
                <BaseFoldFrame header={<MText>{`Transcation Data(${param.decodeTransfer.length})`}</MText>} style={{ marginTop: 20 }}>
                  {
                    param.decodeTransfer.map((decodetxn, index) => {
                      return (
                        <MVStack stretchW key={JSON.stringify(decodetxn.origin) + index} style={{ backgroundColor: '#999', borderRadius: 15, padding: 15 }}>
                          <Text>
                            {
                              JSON.stringify(decodetxn.origin, null, 2)
                            }
                          </Text>
                        </MVStack>
                      )
                    })
                  }
                </BaseFoldFrame>
              )
            }

            <MVStack>
              <MHStack stretchW style={{ alignItems: 'center' }}>
                <MText>Network Fee</MText>
                <MHStack style={{ borderRadius: 999, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }}>
                  <MImage size={10} />
                </MHStack>
              </MHStack>

              <NetworkFeeItem />
              <NetworkFeeItem />

            </MVStack>

          </ScrollView>
        </MVStack>
        <MHStack stretchW>
          <MButton title={'Cancel'} onPress={onCancelClick} isLoading={isLoading} />
          <MButton title={'Confirm'} onPress={onConfirmClick} isLoading={isLoading} />
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