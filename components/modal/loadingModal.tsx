import { Image, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const LoadingModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');

  return (
    <BaseModal
      visible={visible}
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