import { ActivityIndicator } from "react-native"
import { eColor } from '../../lib/globalStyles';


export const MLoading = (props: { color?: string }) => {
  const { color } = props;
  return (
    <ActivityIndicator size='small' color={color || 'blue'} />
  )
}