
import { ScrollView, StyleSheet } from 'react-native';
import { BaseModal } from '../base/baseModal';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import TranscationQueueItem from '../item/transcationQueueItem';
import { showTranscationDetailModal, showTranscationQueueModal, showSignTranscationModal } from '../base/modalInit';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import { IModalParam } from '../../lib/define';
import { TransactionRequest } from '@0xsodium/transactions';
import { useRequestedTransactions } from '../../lib/transaction';
import { hashcodeObj } from '../../lib/common/common';

export const TranscationQueueModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const requestTranscations = useRequestedTransactions();
  const param = modalParam.param;

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView >
            <MHStack stretchW style={{ justifyContent: 'center' }}>
              <MText>Transaction </MText>
            </MHStack>
            <MText style={styles.marginV}>Requested Transactions (4)</MText>
            {
              requestTranscations.map((txn, index) => {
                return (
                  <TranscationQueueItem transcation={txn} key={hashcodeObj(txn) + index} />
                )
              })
            }
          </ScrollView>
        </MVStack>

        <MVStack stretchW >
          <MButton title={'confirm'} />
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