import { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const ComModal = (props: { visible?: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');

  return (
    <BaseModal
      visible={visible}
      hideModal={hideModal}
    >
      <MVStack stretchH stretchW style={{ 'alignItems': 'center' }}>
        <MImage size={20} />
        <MText>Error</MText>
        <MText>Fail to fetch</MText>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({

  marginV: {
    marginVertical: 20
  }
});