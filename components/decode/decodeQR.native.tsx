import { ImagePickerAsset } from "expo-image-picker"
import { useEffect } from 'react';
import { showUpdateComModal } from "../../lib/data";
import { FailModalItem } from "../modal/modalItem/failModalItem";
import { BarCodeScanner } from "expo-barcode-scanner";
// const jsQR = require("./../../lib/third/jsQR.min");


export const DecodeQR = (props: { imageAsset: ImagePickerAsset }) => {
  const { imageAsset } = props;
  useEffect(() => {
    if (!imageAsset) return;
    (async () => {
      const codeScannerResults = await BarCodeScanner.scanFromURLAsync(imageAsset.uri, [BarCodeScanner.Constants.BarCodeType.qr]);
      if (codeScannerResults && codeScannerResults[0]) {
        // todo goto connect
        showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={codeScannerResults[0].data} /> });
      } else {
        showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={"Unable to recognize QR code"} /> });
      }

    })()

  }, [imageAsset]);

  return <></>
}