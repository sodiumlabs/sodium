import { ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../lib/data/auth';
import { IModalParam, ISignMessageModalParam } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { BaseModal } from '../base/baseModal';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { ModalTitle } from './modalItem/modalTitle';
import { OperateBtnItem } from './modalItem/operateBtnItem';


export const SignMessageModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as ISignMessageModalParam;

  const auth = useAuth();
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
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>

            <ModalTitle title='Sign Message' />

            <BaseFoldFrame defaultExpansion
              header={'Detail'}>

              <MText style={{ color: "#9F9F9F" }} >Signee</MText>
              <MHStack stretchW style={{ padding: 15, borderRadius: 10, marginTop: 15, backgroundColor: 'rgba(1,1,1,0.05)', flex: 1 }}>
                {/* <MImage size={20} url={auth.} /> */}
                <MVStack style={{ flex: 1 }}>
                  <MText style={{ color: "#6B6B6B" }}>Me</MText>
                  <MText style={{ color: "#6B6B6B" }}>{auth.blockchainAddress}</MText>
                </MVStack>
              </MHStack>

              <MText style={{ color: "#9F9F9F", marginTop: 15, }}>Message</MText>
              <MVStack stretchW style={{ padding: 15, borderRadius: 10, marginTop: 15, backgroundColor: 'rgba(1,1,1,0.05)' }}>
                <MText style={{ color: "#6B6B6B" }}>Signed Message:</MText>
                <MText style={{ color: "#6B6B6B" }} numberOfLines={null}>{param?.message?.message}</MText>
              </MVStack>
            </BaseFoldFrame>
          </ScrollView>

          <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} isLoading={isLoading} />
        </MVStack>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginTop: 20
  }
});