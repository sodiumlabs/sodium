import MText from "./mText"
import { TextProps } from 'react-native';


export const MButtonText = (props: TextProps & { title: string }) => {
  const { title, ...reset } = props;
  return (
    <MText style={{ color: '#ffffff', fontWeight: '700' }} {...reset} >{title}</MText>
  )
}