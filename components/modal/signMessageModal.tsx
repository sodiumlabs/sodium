import { toUtf8String } from 'ethers/lib/utils';
import { ScrollView, StyleSheet } from 'react-native';
import { sanitizeMessage } from '../../lib/common/utils';
import { useAuth } from '../../lib/data/authAtom';
import { useProjectSetting } from '../../lib/data/project';
import { IModalParam, ISignMessageModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
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
  const projectSetting = useProjectSetting();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useModalLoading(modalParam);

  const infoMap: { title: string, contents: string[] }[] = [];
  const message = param?.message?.message;
  const typeData = param?.message?.typedData;

  if (auth?.blockchainAddress) {
    infoMap.push({ title: "Signee", contents: [auth.blockchainAddress] });
  }

  if (typeData) {
    const parseData = sanitizeMessage(typeData.message, typeData.primaryType, typeData.types);
    // debugger

    if (parseData.from) {
      infoMap.push({ title: "From", contents: [parseData.from.name, parseData.from.wallet] });
    }

    if (parseData.to) {
      infoMap.push({ title: "To", contents: [parseData.to.name, parseData.to.wallet] });
    }

    if (parseData.contents) {
      infoMap.push({ title: "Message", contents: [parseData.contents] });
    }

  }
  else if (message) {
    infoMap.push({ title: "Message", contents: [toUtf8String(message)] });
  }


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
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>

            <ModalTitle title='Sign Message' />

            <BaseFoldFrame defaultExpansion
              header={'Detail'}>

              {
                infoMap.map((item, index) => {
                  return (
                    <MVStack key={index + item.title} stretchW style={{ marginBottom: 10 }}>
                      <MText  >{item.title}</MText>
                      <MHStack stretchW style={{ padding: 15, borderRadius: 10, marginTop: 15, backgroundColor: 'rgba(1,1,1,0.05)', flex: 1 }}>
                        <MVStack style={{ flex: 1 }}>
                          {
                            item.contents.map((content, index) => {
                              return (<MText key={content + index} style={{ color: eColor.GrayContentText, marginTop: 10 }} >{content}</MText>)
                            })
                          }
                        </MVStack>
                      </MHStack>
                    </MVStack>
                  )
                })
              }
            </BaseFoldFrame>
          </ScrollView>

          <OperateBtnItem onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} isConfirmLoading={isLoading} isConfirmEnable={true} />
        </MVStack>
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    // marginTop: 20
  }
});