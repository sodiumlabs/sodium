import { ImageProps, Image, Text, TextProps } from 'react-native';


export default function MImage(props: ImageProps & { size?: number, w?: number, h?: number, url?: string }) {
  let { url, size, w, h, style, source, ...reset } = props;
  const sizeStyle = {
    width: w || size || 12,
    height: h || size || 12
  }
  if (url != null) {
    source = { uri: 'https://example.com/image.jpg' }
  } else {
    if (source == null) {
      source = props.source || (require('./../../assets/favicon.png'))
    }
  }

  return (
    <Image {...reset} style={[style, sizeStyle]} source={source} />
  )
}
