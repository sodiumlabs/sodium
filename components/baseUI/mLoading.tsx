import { ActivityIndicator } from "react-native"
import { eColor } from '../../lib/globalStyles';


export const MLoading = () => {
  return (
    <ActivityIndicator size='small' color={eColor.Blue} />
  )
}