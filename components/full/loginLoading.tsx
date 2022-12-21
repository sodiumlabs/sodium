import MImage from '../baseUI/mImage';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export const LoginLoading = (props) => {
  return (
    <MVStack style={{ justifyContent: 'center', alignItems: 'center' }} >
      <MImage />
      <MText> Signing in…</MText>
      <MText>This may take a minute or so, please don't close this window.</MText>
    </MVStack>
  )
}