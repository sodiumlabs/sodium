import { ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../lib/data/auth';
import { IModalParam, ISignMessageModalParam } from '../../lib/define';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseFoldFrame } from '../base/baseFoldFrame';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';


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
          <ScrollView style={{ flex: 1 }}>
            <MHStack stretchW style={{ justifyContent: 'center' }}>
              <MText>Sign Message </MText>
            </MHStack>

            <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
              header={<MText >Detail</MText>}>

              <MText>Signee</MText>
              <MHStack stretchW style={{ padding: 15, borderRadius: 15, backgroundColor: '#999', flex: 1 }}>
                {/* <MImage size={20} url={auth.} /> */}
                <MVStack style={{ flex: 1 }}>
                  <MText >Me</MText>
                  <MText >{auth.blockchainAddress}</MText>
                </MVStack>
              </MHStack>


              <MText>Message</MText>
              <MVStack stretchW style={{ padding: 15, borderRadius: 15, backgroundColor: '#999' }}>
                <MText>Signed Message:</MText>
                <MText numberOfLines={null}>{param?.message?.message}</MText>
              </MVStack>
            </BaseFoldFrame>
          </ScrollView>

          <MHStack stretchW>
            <MButton style={{ flex: 1 }} onPress={onCancelClick} >
              <MText>Cancel</MText>
            </MButton>
            <MButton style={{ flex: 1 }} onPress={onConfirmClick} isLoading={isLoading} >
              <MText>Confirm</MText>
            </MButton>
          </MHStack>
        </MVStack>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});