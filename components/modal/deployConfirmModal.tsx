import { StyleSheet } from 'react-native';
import { IModalParam, IDeployConfirmModalParam } from '../../lib/define';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const DeployConfirmModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as IDeployConfirmModalParam;
  const onConfirmClick = async () => {
    await param.continueClick();
    hideModal();
  }
  const onCancelClick = () => {
    param.cancelClick();
    hideModal();
  }
  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      contentHeight={400}
    >
      <MVStack stretchH stretchW style={{ 'alignItems': 'center', flex: 1 }}>
        <MText>You Soduim wallet needs to be deployed on ploygon to sign messages.</MText>
        <MButton stretchW title={'Deploy'} onPress={onConfirmClick} />
        <MButton stretchW title={'Cancel'} onPress={onCancelClick} />
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({

  marginV: {
    marginVertical: 20
  }
});