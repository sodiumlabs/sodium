
import { StyleSheet } from 'react-native';


export enum eColor {
  Red = 'red',
  GrayHover = '#eeeeee',
  Blue = '#2178DD',
  Black = '#8B8E9E',
  Border = '#EEF0F2',
  GrayText = '#9F9F9F',
  GrayContentText = '#6B6B6B',
  GrayWhite = '#dddddd',
}

export const globalStyle = StyleSheet.create({
  whiteBorderWidth: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEF0F2'
  }
});
