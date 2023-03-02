import { StyleSheet } from 'react-native';
import { useProjectSetting } from '../../lib/data/project';
import { IModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import { Spacer } from '../base/spacer';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import * as Updates from 'expo-updates';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../../lib/hook';

export const UpdateConfirmModal = () => {
  const [modalParam, setModalParam] = useState<IModalParam>({ visible: false, hideImmediately: false });
  const [isLoading, setIsLoading] = useModalLoading(modalParam);
  const projectSetting = useProjectSetting();
  const [fetching, setFetching] = useState(false);

  const hideModal = useCallback(() => {
    if (modalParam.visible) {
      setModalParam({ ...modalParam, visible: false });
    }
  }, [modalParam]);

  const showModal = useCallback((param: IModalParam) => {
    if (!modalParam.visible) {
      setModalParam({ ...param, visible: true });
    }
  }, [modalParam])

  const checkUpdate = useCallback(async () => {
    if (fetching) return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        showModal({
          visible: true,
          hideImmediately: true,
          param: {}
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }, [fetching]);

  // 每次进入页面检查一次更新
  useEffect(() => {
    checkUpdate();
  }, [])

  // 每隔30分钟检查一次更新
  useInterval(() => {
    checkUpdate();
    // 每隔30分钟检查一次更新
  }, 1000 * 60 * 30);
  
  const onConfirmClick = useCallback(async () => {
    setFetching(true);
    setIsLoading(true);
    try {
      const result = await Updates.fetchUpdateAsync();

      if (result.isNew) {
        await Updates.reloadAsync();
      }

      hideModal();
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
      setIsLoading(false);
    }
  }, [fetching])
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
        <MText style={{ fontWeight: '700', textAlign: 'center' }} numberOfLines={null}>Wallet will be updated soon</MText>
        <Spacer />
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MButton stretchW style={{ backgroundColor: eColor.Blue, marginTop: 10, height: 30 }} onPress={onConfirmClick} isLoading={isLoading} >
            <MButtonText title={"Update"} />
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