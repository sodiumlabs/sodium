import { ImagePickerAsset } from "expo-image-picker"
import { useEffect } from 'react';
import { showUpdateComModal } from "../../lib/data";
import { FailModalItem } from "../modal/modalItem/failModalItem";
import { BarCodeScanner } from "expo-barcode-scanner";
import { waitTime } from "../../lib/common";
import { Platform } from 'react-native';
// const jsQR = require("./../../lib/third/jsQR.min");


export const DecodeQR = (props: { imageAsset: ImagePickerAsset, hideScanModal: (hideImmediately?: boolean) => void, connect: (url: string) => void }) => {
  const { imageAsset, hideScanModal, connect } = props;
  useEffect(() => {
    if (!imageAsset) return;
    (async () => {
      const codeScannerResults = await BarCodeScanner.scanFromURLAsync(imageAsset.uri, [BarCodeScanner.Constants.BarCodeType.qr]);
      if (codeScannerResults && codeScannerResults[0]) {
        connect(codeScannerResults[0].data);
      } else {
        if (Platform.OS == 'ios') {
          hideScanModal(true);
          await waitTime(1);
        } else {
          hideScanModal(false);
        }
        showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={"Unable to recognize QR code"} /> });
      }
    })()

  }, [imageAsset]);

  return <></>
}