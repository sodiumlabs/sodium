import { StyleSheet } from 'react-native';
import { IComModalParam, IModalParam } from '../../lib/define';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const ComModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as IComModalParam;
  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      contentHeight={300}
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