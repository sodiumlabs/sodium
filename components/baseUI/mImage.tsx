import { Image, ImageProps } from 'react-native';


export default function MImage(props: ImageProps & { size?: number, w?: number, h?: number, url?: string }) {
  let { url, size, w, h, style, source, ...reset } = props;
  // test
  url = "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png";
  const sizeStyle = {
    width: w || size || 12,
    height: h || size || 12
  }
  if (url != null) {
    source = { uri: url }
  } else {
    if (source == null) {
      source = props.source || (require('./../../assets/favicon.png'))
      // source = require('./../../assets/favicon.png')
    }
  }

  return (
    <Image {...reset} style={[style, sizeStyle]} source={source} />
  )
}
