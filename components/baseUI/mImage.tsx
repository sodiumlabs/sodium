import Image from 'next/image';
import { ImageProps } from "react-native";
import MHStack from './mHStack';

export default function MImage(props: ImageProps & { w?: number, h?: number, uri?: string }) {
  let { uri, w = 12, h = 12, source, style } = props;
  if (!source && !uri) {
    return <MHStack style={{ width: w, height: h }}></MHStack>
  }

  return (
    <MHStack style={style}>
      <Image width={w} height={h} src={uri || source as string} alt={""} />
    </MHStack>
  )

}
