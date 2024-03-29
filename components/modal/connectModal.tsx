import { StyleSheet } from 'react-native';
import { waitTime } from '../../lib/common';
import { showUpdateFullScreenModal } from '../../lib/data';
import { loginOut } from '../../lib/data/auth';
import { useProjectSetting } from '../../lib/data/project';
import { IConnectModalParam, IModalParam } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import { Spacer } from '../base/spacer';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { LogoutLoading } from '../full/logoutLoading';

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

  const onUseOtherWallet = async () => {
    hideModal();
    showUpdateFullScreenModal(true, <LogoutLoading />);
    await loginOut();
    await waitTime(1000); // Call next frame to avoid flash screen
    showUpdateFullScreenModal(false);
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
        <MText style={{ fontWeight: '700', textAlign: 'center' }} numberOfLines={null}>Do you want to allow to connect to your wallet?</MText>
        <Spacer />
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MButton stretchW onPress={onCancelClick} >
            <MButtonText title={"Cancel"} />
          </MButton>

          <MButton stretchW style={{ marginTop: 10 }} onPress={onConfirmClick} isLoading={isLoading} >
            <MButtonText title={"Confirm"} />
          </MButton>
        </MVStack>

        {
          projectSetting.isBeOpenedByThirdParty && <Spacer />
        }

        {
          projectSetting.isBeOpenedByThirdParty &&
          <MButton stretchW style={{ marginTop: 10 }} onPress={onUseOtherWallet} >
            <MButtonText title={"Use Other Wallet"} />
          </MButton>
        }


      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {

  }
});