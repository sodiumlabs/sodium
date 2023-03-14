import { StyleSheet } from 'react-native';
import { useProjectSetting } from '../../lib/data/project';
import { IModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { BaseModal } from '../base/baseModal';
import { Spacer } from '../base/spacer';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { useCallback, useEffect, useState } from 'react';
import Constants from "expo-constants"
import { openUri } from '../../utils/linking';

export const UpdateConfirmModal = () => {
  const [modalParam, setModalParam] = useState<IModalParam>({ visible: false, hideImmediately: false });
  const projectSetting = useProjectSetting();

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
    const response = await fetch("https://subgraph-fallback.vercel.app/api/checkForUpdate")
    const lastestVersion = await response.text()
    if (parseInt(Constants.manifest.version.replace(/\./g,"")) < parseInt(lastestVersion.replace(/\./g,""))) {
      showModal({ visible: true, hideImmediately: false })
    }
  }, []);

  useEffect(() => {
    checkUpdate();
  }, [])
  
  const onConfirmClick = useCallback(async () => {
    // openUri("");
  }, [])
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
        <MText style={{ fontWeight: '700', textAlign: 'center' }} numberOfLines={null}>The version of Sodium Wallet you’re using is out of date and is missing critical upgrades.</MText>
        <Spacer />
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MButton stretchW style={{ backgroundColor: eColor.Blue, marginTop: 10, height: 30 }} onPress={onConfirmClick} >
            {/* <MButtonText title={"Download latest"} /> */}
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