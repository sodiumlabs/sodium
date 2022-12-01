import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';

export const SignModal = (props: { visible: boolean, hideModal: () => void }) => {
  const { visible, hideModal } = props;
  // const { width, height } = Dimensions.get('window');

  return (
    <BaseModal
      visible={visible}
      hideModal={hideModal}
    >
      {/* <MVStack stretchW stretchH style={{ maxWidth: 600, marginTop: 400, backgroundColor: '#888', padding: 15, alignItems: 'center', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>

      </MVStack> */}
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});