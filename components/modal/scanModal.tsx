import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
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


export const ScanModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  const param = modalParam.param;
  const projectSetting = useProjectSetting();
  const [isLoading, setIsLoading] = useModalLoading(modalParam);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  useEffect(() => {
    if (modalParam.visible) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        // showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={'requestPermissionsAsync' + status} /> });
        setHasPermission(status === 'granted');
      })();
    }

  }, [modalParam.visible]);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  // };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const onBarCodeScanned = (qrData: { data: string }) => {
    // debugger
    console.log("onBarCodeScanned");
    console.log(qrData);
    showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={qrData.data} /> });

  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const image = result.assets[0].uri;
      // setImage(result.assets[0].uri);
      showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={'iamge'} /> });
    }
  };

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
      isFullScreen={projectSetting.isBeOpenedByThirdParty}
      isAnim={!projectSetting.isBeOpenedByThirdParty}
      contentStyle={{ paddingVertical: 0 }}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
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
              style={{ flex: 1 }}
              onBarCodeScanned={onBarCodeScanned}
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
            >
            </Camera>
          )}

          <MVStack style={[globalStyle.whiteBorderWidth, { padding: 25, borderRadius: 0 }]}>
            <MButton style={{ backgroundColor: eColor.Blue, height: 65, borderRadius: 15 }} onPress={pickImage}>
              <MButtonText title={'Upload QR Code image'} fontSize={16} />
            </MButton>
            <MHStack style={{ height: 15 }}></MHStack>
            <MButton style={{ backgroundColor: eColor.Blue, height: 65, borderRadius: 15 }}>
              <MButtonText title={'Paste code'} fontSize={16} />
            </MButton>
          </MVStack>
        </MVStack>
      </MVStack>
    </BaseModal >
  );
};

