import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { showUpdateComModal } from '../../lib/data/modal';
import { useProjectSetting } from '../../lib/data/project';
import { IModalParam } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useModalLoading } from '../../lib/hook/modalLoading';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { FailModalItem } from './modalItem/failModalItem';
import { DecodeQR } from '../decode/decodeQR';
import { useMClipboard } from '../../lib/hook/clipboard';
import ScanFrameSvg from '../svg/scanFrameSvg';

export const ScanModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param;
  const projectSetting = useProjectSetting();
  const [isLoading, setIsLoading] = useModalLoading(modalParam);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset>(null);
  const [clipboardContent, setClipboardContent] = useMClipboard();

  useEffect(() => {
    if (modalParam.visible) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } else {
      setImageAsset(null);
    }

  }, [modalParam.visible]);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  const onBarCodeScanned = (qrData: BarCodeScanningResult) => {
    // todo goto connect
    showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={qrData.data} /> });
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      // base64: true
    });

    console.log("pickImage:");
    console.log(result);

    if (!result.canceled) {
      setImageAsset(result.assets[0]);
      // setImageAsset(result.assets[0]);
    }
  };

  const onPasteCodeClick = () => {
    // todo goto connect
    console.log(clipboardContent);
  }

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
      contentStyle={{ paddingVertical: 0 }}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <DecodeQR imageAsset={imageAsset} />
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
                <MHStack style={{ position: 'absolute' }}>
                  <MText style={{ color: 'white', fontWeight: '700' }} fontSize={18}>Find a QR code to scan</MText>
                </MHStack>
              </MHStack>
            </Camera>
          )}

          <MVStack style={[globalStyle.whiteBorderWidth, { padding: 25, borderRadius: 0 }]}>
            <MButton style={{ backgroundColor: eColor.Blue, height: 65, borderRadius: 15 }} onPress={pickImage}>
              <MButtonText title={'Upload QR Code image'} fontSize={16} />
            </MButton>
            <MHStack style={{ height: 15 }}></MHStack>
            <MButton onPress={onPasteCodeClick} style={{ backgroundColor: eColor.Blue, height: 65, borderRadius: 15 }}>
              <MButtonText title={'Paste code'} fontSize={16} />
            </MButton>
          </MVStack>
        </MVStack>
      </MVStack>
    </BaseModal >
  );
};

