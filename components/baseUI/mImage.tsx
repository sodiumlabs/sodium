// import { Image, ImageProps } from 'react-native';

import { Avatar } from "@ui-kitten/components";
import Image from "next/image";
import { ImageProps, Platform } from "react-native";
import MHStack from './mHStack';


export default function MImage(props: ImageProps & { w?: number, h?: number, uri?: string }) {
  let { uri: url, w = 12, h = 12, source, style } = props;
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

  if (Platform.OS === 'web' && source != null) {
    return (
      <MHStack style={style}>
        <Image width={w} height={h} src={source as string} alt={""} />
      </MHStack>
    )
  } else {
    if (url != null) { source = { uri: url } }
    return (
      <MHStack style={style}>
        <Avatar source={source} style={{ width: w, height: h }} />
      </MHStack>
    )
  }

  // return (
  // <Image {...reset} style={[style, sizeStyle]} src={source} />
  // <Image source={require('./../../assets/icon.png')} style={{ width: 12, height: 12 }} />

  // <Avatar source={{ uri: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png" }} style={{ width: 12, height: 12 }} />
  // <Image src={require('./../../assets/close.png')} alt={""} />

  // )
}
