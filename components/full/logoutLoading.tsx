import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export const LogoutLoading = (props) => {
  return (
    <MVStack style={{ justifyContent: 'center', alignItems: 'center' }} >
      <MText>Signing out your device key…</MText>
      <MText>This may take a minute or so, please don't close this window.</MText>
    </MVStack>
  )
}