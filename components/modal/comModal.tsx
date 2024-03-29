import { ScrollView } from 'react-native';
import { IComModalParam, IModalParam } from '../../lib/define';
import { BaseModal } from '../base/baseModal';

export const ComModal = (props: { hideModal: (immediately?: boolean) => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as IComModalParam;
  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      contentHeight={param?.height || 300}
      hideImmediately={modalParam.hideImmediately}
    >
      <ScrollView style={{ flex: 1, padding: 15 }}>
        {param?.reactNode}
      </ScrollView>
    </BaseModal>
  );
};
