import { Dispatch, SetStateAction } from 'react';
import { Image, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
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
        <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
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