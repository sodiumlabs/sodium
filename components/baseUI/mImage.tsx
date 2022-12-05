import { ImageProps, Image, Text, TextProps } from 'react-native';


export default function MImage(props: ImageProps & { size?: number, w?: number, h?: number }) {
  let { size, w, h, style, source, ...reset } = props;
  const sizeStyle = {
    width: w || size || 12,
    height: h || size || 12
  }
  if (source == null) {
    source = props.source || (require('./../../assets/favicon.png'))
  }
  return (
    <Image {...reset} style={[style, sizeStyle]} source={source} />
  )
}
