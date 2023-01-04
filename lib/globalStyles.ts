
import { StyleSheet } from 'react-native';


export enum eColor {
  Blue = '#2178DD',
  Black = '#8B8E9E',
  Border = '#EEF0F2',
  GrayText = '#9F9F9F'
}

export const globalStyle = StyleSheet.create({
  whiteBorderWidth: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEF0F2'
  }
});
