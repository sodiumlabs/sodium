// import { Image, ImageProps } from 'react-native';

import { Avatar } from "@ui-kitten/components";
// import { Image } from 'expo-image';
import { ImageProps, Platform } from "react-native";
import MHStack from './mHStack';
import { StyleSheet, View } from 'react-native';

export default function MImage(props: ImageProps & { w?: number, h?: number, uri?: string }) {
  let { uri, w = 12, h = 12, source, style } = props;
  // test
  // url = url || "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png";
  // const sizeStyle = {
  //   width: w || size || 12,
  //   height: h || size || 12
  // }
  // if (url != null) {
  //   source = { uri: url }
  // } else {
  //   if (source == null) {
  //     source = require('./../../assets/icon.png')
  //     // source = require('./../../assets/favicon.png')
  //   }
  // }

  // source = require('./../../assets/icon.png')
  const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: w,
      height: h,
      backgroundColor: '#0553',
    },
  });

  if (Platform.OS === 'web' && source != null && uri == null) {
    return (
      <MHStack style={style}>
        {/* <Image style={styles.image} source={source as string} placeholder={""} /> */}
      </MHStack>
    )
  } else {
    if (uri != null) { source = { uri: uri } }
    return (
      <MHStack style={style}>
        <Avatar source={source} style={{ width: w, height: h }} />
      </MHStack>
    )
  }
}
