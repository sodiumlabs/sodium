import { Spinner } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { useProjectSetting } from '../../lib/data/project';
import { IModalParam } from '../../lib/define';
import { globalStyle } from '../../lib/globalStyles';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { newPair } from '../../lib/walletconnect';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { DecodeQR } from '../decode/decodeQR';
import ScanFrameSvg from '../svg/scanFrameSvg';

import * as Clipboard from 'expo-clipboard';
import { Logger } from '../../lib/common/utils';

export const ScanModal = (props: { hideModal: (hideImmediately?: boolean) => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param;
  const projectSetting = useProjectSetting();
  const [isLoading, setIsLoading] = useModalLoading(modalParam);
  const [connecting, setConnecting] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset>(null);

  useEffect(() => {
    if (modalParam.visible) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } else {
      setImageAsset(null);
    }
    return (() => {
      setConnecting(false);
    })
  }, [modalParam.visible]);

  const onBarCodeScanned = (qrData: BarCodeScanningResult) => {
    connect(qrData.data);
  }

  const connect = async (url: string) => {
    setConnecting(true)
    const meta = await newPair(url);
    hideModal(Platform.OS == 'ios');
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      // base64: true
    });

    Logger.debug("pickImage:");
    Logger.debug(result);

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
      // setImageAsset(result.assets[0]);
    }
  };

  const onPasteCodeClick = () => {
    Clipboard.getStringAsync().then((content) => {
      connect(content);
    })
  }

  const modalContent = useMemo(() => {
    if (connecting) {
      return (
        <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
          <MVStack stretchW style={{ flex: 1, overflow: 'hidden', borderRadius: 15 }}>
            <MVStack style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
              <MText style={{ fontWeight: '700', width: 300, height: 40, textAlign: 'center' }}>WalletConnect</MText>
              <Spinner size='giant' />
            </MVStack>
          </MVStack>
        </MVStack>
      )
    } else {
      return (
        <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
          <DecodeQR imageAsset={imageAsset} hideScanModal={hideModal} connect={connect} />
          <MVStack stretchW style={{ flex: 1, overflow: 'hidden', borderRadius: 15 }}>
            {
              hasPermission === null && (
                <MVStack style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                  <MText>Requesting for camera permission</MText>
                </MVStack>)
            }

            {
              hasPermission === false && (
                <MVStack style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                  <MText>No access to camera</MText>
                </MVStack>)
            }

            {hasPermission && (
              <Camera
                style={{ flex: 1, position: 'relative' }}
                onBarCodeScanned={onBarCodeScanned}
                barCodeScannerSettings={{
                  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
              >
                <MHStack stretchW stretchH style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <ScanFrameSvg />
                  <MHStack style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -150 }, { translateY: -20 }] }}>
                    <MText style={{ color: 'white', fontWeight: '700', width: 300, height: 40, textAlign: 'center' }} fontSize={18}>Find a QR code to scan</MText>
                  </MHStack>
                </MHStack>
              </Camera>
            )}

            <MVStack style={[globalStyle.whiteBorderWidth, { padding: 25, borderRadius: 0 }]}>
              <MButton style={{ height: 65, borderRadius: 15 }} onPress={pickImage}>
                <MButtonText title={'Upload QR Code image'} fontSize={16} />
              </MButton>
              <MHStack style={{ height: 15 }}></MHStack>
              <MButton onPress={onPasteCodeClick} style={{ height: 65, borderRadius: 15 }}>
                <MButtonText title={'Paste code'} fontSize={16} />
              </MButton>
            </MVStack>
          </MVStack>
        </MVStack>
      )
    }
  }, [connecting, hasPermission, imageAsset])

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      hideImmediately={modalParam.hideImmediately}
      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
      contentStyle={{ paddingVertical: 0 }}
    >
      {modalContent}
    </BaseModal >
  );
};