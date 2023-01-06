import { eColor } from '../../lib/globalStyles';
import MImage from '../baseUI/mImage';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export const LoginLoading = (props) => {
  return (
    <MVStack style={{ justifyContent: 'center', alignItems: 'center' }} >
      <MImage />
      <MText style={{ color: eColor.GrayContentText }}> Signing in…</MText>
      <MText style={{ color: eColor.GrayContentText }}>This may take a minute or so, please don't close this window.</MText>
    </MVStack>
  )
}