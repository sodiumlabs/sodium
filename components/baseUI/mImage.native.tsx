import { Image, ImageProps } from "react-native";
import MHStack from './mHStack';
import { SvgUri } from 'react-native-svg';

export default function MImage(props: ImageProps & { w?: number, h?: number, uri?: string }) {
  let { uri, w = 12, h = 12, source, style } = props;
  if (uri != null) { source = { uri: uri } }

  if (uri && uri.endsWith(".svg")) {
    return <SvgUri width={w} height={h} uri={uri} />
  }

  return (
    <MHStack style={style}>
      <Image source={source} style={{ width: w, height: h }} ></Image>
    </MHStack>
  )
}
