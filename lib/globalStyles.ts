
import { StyleSheet } from 'react-native';


export enum eColor {
  Red = 'red',
  Green = 'green',
  GrayHover = '#eeeeee',
  Blue = '#1C92FF',
  HoverBlue = '#1983e6',
  Black = '#8B8E9E',
  HoverBlack = '#7d808e',
  Border = '#EEF0F2',
  GrayText = '#9F9F9F',
  GrayContentText = '#6B6B6B',
  GrayWhite = '#dddddd',
  Disable = '#b9bbc5',
}

export const globalStyle = StyleSheet.create({
  whiteBorderWidth: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEF0F2'
  }
});
