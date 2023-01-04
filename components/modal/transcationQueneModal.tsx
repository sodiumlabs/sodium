
import { ScrollView, StyleSheet } from 'react-native';
import { hashcodeObj } from '../../lib/common/common';
import { IModalParam } from '../../lib/define';
import { transactionQueue, useRequestedTransactions } from '../../lib/transaction';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import TranscationQueueItem from '../item/transcationQueueItem';
import { ModalTitle } from './modalItem/modalTitle';

export const TranscationQueueModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const requestTranscations = useRequestedTransactions();
  const param = modalParam.param;
  const rejectAllClick = () => {
    console.log("rejectAllClick");
    transactionQueue.removeAll();
  }

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>
            <ModalTitle title='Transaction' />

            <MText style={{ marginBottom: 16 }}>Requested Transactions ({requestTranscations.length})</MText>
            {
              requestTranscations.map((txn, index) => {
                return (
                  <TranscationQueueItem transcation={txn} key={hashcodeObj(txn) + index} />
                )
              })
            }
          </ScrollView>
        </MVStack>
        <MVStack stretchW style={{ height: 45, paddingHorizontal: 15, marginBottom: 15 }}>
          <MButton stretchW onPress={rejectAllClick} style={{ flex: 1 }} >
            <MText style={{ color: "#ffffff", fontWeight: '700' }}>Reject All</MText>
          </MButton>
        </MVStack>

      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});