import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { IModalParam } from '../../lib/define';
import { BaseModal } from '../base/baseModal';
import MVStack from '../baseUI/mVStack';

export const FullScreenModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param as ReactNode;
  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      isAnim={false}
      isFullScreen
    >
      <MVStack stretchH stretchW style={{ 'alignItems': 'center', justifyContent: 'center' }}>
        {param}
      </MVStack>
    </BaseModal>
  );
};

const styles = StyleSheet.create({

  marginV: {
    marginVertical: 20
  }
});