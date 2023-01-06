import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { eColor } from '../../lib/globalStyles';

export const LogoutLoading = (props) => {
  return (
    <MVStack style={{ justifyContent: 'center', alignItems: 'center' }} >
      <MText style={{ color: eColor.GrayContentText }}>Signing out your device key…</MText>
      <MText style={{ color: eColor.GrayContentText }}>This may take a minute or so, please don't close this window.</MText>
    </MVStack>
  )
}