import MText from "./mText"
import { TextProps } from 'react-native';


export const MButtonText = (props: TextProps & { title: string } & { fontSize?: number }) => {
  const { title, style, fontSize, ...reset } = props;
  return (
    <MText selectable={false} style={[{ color: '#ffffff', fontWeight: '700' }, style]} {...reset} fontSize={fontSize}>{title}</MText>
  )
}