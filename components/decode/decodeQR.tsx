import { ImagePickerAsset } from "expo-image-picker"
import { useEffect } from 'react';
import { showUpdateComModal } from "../../lib/data";
import { FailModalItem } from "../modal/modalItem/failModalItem";
const jsQR = require("./../../lib/third/jsQR.min");
const decode = require('image-decode');

export const DecodeQR = (props: { imageAsset: ImagePickerAsset }) => {
  const { imageAsset } = props;
  useEffect(() => {
    if (!imageAsset) return;
    // const canvas = document.createElement('canvas');
    // canvas.width = imageAsset.width;
    // canvas.height = imageAsset.height;
    // const context = canvas.getContext('2d', { alpha: false });
    // let image = new Image();
    // image.onload = function () {
    //   context.drawImage(image, 0, 0, imageAsset.width, imageAsset.height);
    //   const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    //   if (imageData) {
    //     const qrResult = jsQR(imageData.data, imageData.width, imageData.height);
    //     showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={qrResult.data} /> });
    //   } else {
    //     showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={"fail to identify"} /> });
    //   }
    // }
    // image.src = imageAsset.uri;

    const decodeImage = decode(imageAsset.uri); // uri to buffer
    const qrResult = decodeImage ? jsQR(decodeImage.data, decodeImage.width, decodeImage.height) : null;
    if (qrResult) {
      // todo goto connect
      showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={qrResult.data} /> });
    } else {
      showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={"Unable to recognize QR code"} /> });
    }
  }, [imageAsset])
  return <></>
}