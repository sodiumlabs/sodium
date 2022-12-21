import { StyleSheet } from 'react-native';
import { IDeployConfirmModalParam, IModalParam } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const DeployConfirmModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as IDeployConfirmModalParam;
  const [isLoading, setIsLoading] = useModalLoading(modalParam);

  const onConfirmClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await param.continueClick();
    setIsLoading(false);
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
        <MText>Your Sodium wallet needs to be deployed on {param?.network?.name.toUpperCase()} to sign messages.</MText>
        <MButton style={{ flex: 1 }} onPress={onCancelClick} >
          <MText>Cancel</MText>
        </MButton>
        <MButton style={{ flex: 1 }} onPress={onConfirmClick} isLoading={isLoading} >
          <MText>Deploy</MText>
        </MButton>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({

  marginV: {
    marginVertical: 20
  }
});