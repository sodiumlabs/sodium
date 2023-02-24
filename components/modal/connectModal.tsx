import { StyleSheet } from 'react-native';
import { useProjectSetting } from '../../lib/data/project';
import { IConnectModalParam, IModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import { Spacer } from '../base/spacer';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const ConnectModal = (props: { hideModal: () => void, modalParam: IModalParam<IConnectModalParam> }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param
  const projectSetting = useProjectSetting();
  const [isLoading, setIsLoading] = useModalLoading(modalParam);

  const onConfirmClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await param?.continueClick();
    setIsLoading(false);
    hideModal();
  }

  const onCancelClick = async () => {
    await param?.cancelClick();
    hideModal();
  }
  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={onCancelClick}
      hideImmediately={modalParam.hideImmediately}
      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
      contentHeight={500}
    >

      <MVStack stretchH stretchW style={{ 'alignItems': 'center', padding: 15 }}>
        <MText style={{ fontWeight: '700', textAlign: 'center' }} numberOfLines={null}>Do you want to allow {param?.options?.origin} to connect to your wallet?</MText>
        <Spacer />
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MButton stretchW style={{ height: 30 }} onPress={onCancelClick} >
            <MButtonText title={"Cancel"} />
          </MButton>

          <MButton stretchW style={{ backgroundColor: eColor.Blue, marginTop: 10, height: 30 }} onPress={onConfirmClick} isLoading={isLoading} >
            <MButtonText title={"Confirm"} />
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

  }
});