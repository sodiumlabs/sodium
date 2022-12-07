import { Image, StyleSheet } from 'react-native';
import { IModalParam } from '../../lib/define';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const LoadingModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param;
  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      isAnim={false}
      isFullScreen
    >
      <MVStack stretchH stretchW style={{ 'alignItems': 'center', justifyContent: 'center' }}>
        <MText>Loading....</MText>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({

  marginV: {
    marginVertical: 20
  }
});