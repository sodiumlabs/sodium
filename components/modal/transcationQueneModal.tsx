
import { ScrollView, StyleSheet } from 'react-native';
import { hashcodeObj } from '../../lib/common/common';
import { btnScale, IModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { transactionQueue, useRequestedTransactions } from '../../lib/transaction';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
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



            {
              (!requestTranscations || requestTranscations.length <= 0) ? (
                <MHStack stretchW style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MText style={{ color: eColor.GrayContentText }}>Nothing</MText>
                </MHStack>
              ) : (
                <>
                  <MText style={{ marginBottom: 16 }}>Requested Transactions ({requestTranscations.length})</MText>
                  {
                    requestTranscations.map((txn, index) => {
                      return (
                        <TranscationQueueItem transcation={txn} key={hashcodeObj(txn) + index} hideModal={hideModal} />
                      )
                    })
                  }
                </>
              )
            }
          </ScrollView>
        </MVStack>
        <MVStack stretchW style={{ height: 45, paddingHorizontal: 15, marginBottom: 15 }}>
          <MButton scale={btnScale} stretchW hoverColor={eColor.Red}
            onPress={rejectAllClick} style={{ flex: 1 }}
          >
            <MButtonText title='Reject All' />
          </MButton>
        </MVStack>

      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginBottom: 20
  }
});