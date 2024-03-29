import { StyleSheet } from 'react-native';
import { useProjectSetting } from '../../lib/data/project';
import { IDeployConfirmModalParam, IModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import { Spacer } from '../base/spacer';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const DeployConfirmModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as IDeployConfirmModalParam;
  const [isLoading, setIsLoading] = useModalLoading(modalParam);
  const projectSetting = useProjectSetting();
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
      hideImmediately={modalParam.hideImmediately}

      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
      contentHeight={500}
    >
      <MVStack stretchH stretchW style={{ 'alignItems': 'center', padding: 15 }}>
        <MText style={{ fontWeight: '700', textAlign: 'center' }} numberOfLines={null}>Your Sodium wallet needs to be deployed on {param?.network?.name?.toUpperCase()} to sign messages.</MText>
        <Spacer />
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MButton stretchW onPress={onCancelClick} >
            <MButtonText title={"Cancel"} />
          </MButton>

          <MButton stretchW style={{ marginTop: 10 }} onPress={onConfirmClick} isLoading={isLoading} >
            <MButtonText title={"Deploy"} />
          </MButton>
        </MVStack>

        {
          projectSetting.isBeOpenedByThirdParty && <Spacer />
        }


      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({

  marginV: {
    marginVertical: 20
  }
});