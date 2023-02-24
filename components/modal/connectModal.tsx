import { ScrollView, StyleSheet } from 'react-native';
import { useProjectSetting } from '../../lib/data/project';
import { IConnectModalParam, IModalParam } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { OperateBtnItem } from './modalItem/operateBtnItem';
import { fixWidth } from '../../lib/define';

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
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>
            <MVStack stretchW stretchH>
              <MText numberOfLines={null} style={{ marginVertical: 20, textAlign: 'center', fontWeight: '700' }}>
                Do you want to allow {param?.options?.origin} to connect to your wallet?
              </MText>
            </MVStack>
          </ScrollView>
          <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} isConfirmLoading={isLoading} isConfirmEnable={true} />
        </MVStack>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {

  }
});