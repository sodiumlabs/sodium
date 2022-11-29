import { Text, TextProps } from 'react-native';


export default function MText(props: TextProps & { fontSize?: number }) {
  const { fontSize, style, ...reset } = props;
  const font = {
    fontSize: fontSize || 14
  }
  return (
    <Text numberOfLines={1} ellipsizeMode={'tail'} style={[style, font]}  {...reset}> {props.children} </Text>
  )
}
