import MHStack from "./mHStack"
import { ViewProps } from 'react-native';


export const MDivider = (props: ViewProps) => {
  const { style, ...reset } = props;
  return (
    <MHStack style={[{ height: 0, borderWidth: 0, borderTopWidth: 0.5, borderColor: 'rgba(0, 0, 0, 0.2)' }, style]} {...reset}></MHStack>
  )
}