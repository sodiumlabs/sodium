
import { ScrollView, StyleSheet } from 'react-native';
import { BaseModal } from '../base/baseModal';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import TranscationQueueItem from '../item/transcationQueueItem';
import { showTranscationDetailModal, showTranscationQueueModal } from '../base/modalInit';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import { IModalParam } from '../../lib/define';

export const TranscationQueueModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param;
  const onQueueItemClick = () => {
    showTranscationQueueModal(false);
    showTranscationDetailModal(true);
  }

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
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, index) => {
                return (
                  <TranscationQueueItem key={index} onPress={onQueueItemClick} />
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