
import { ScrollView, StyleSheet } from 'react-native';
import { BaseModal } from '../base/baseModal';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import TranscationQueueItem from '../item/transcationQueueItem';
import { showTranscationModal, showTranscationQueueModal } from '../base/screenInit';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';

export const TranscationQueueModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;

  const onQueueItemClick = () => {
    showTranscationQueueModal(false);
    showTranscationModal(true);
  }

  return (
    <BaseModal
      visible={visible}
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