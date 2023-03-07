import Image from 'next/image';
import { ImageProps, ImageSourcePropType } from "react-native";
import MHStack from './mHStack';

export default function MImage(props: Omit<ImageProps, 'source'> & { w?: number, h?: number, uri?: string, source?: ImageSourcePropType }) {
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
