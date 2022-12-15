import MImage from '../baseUI/mImage';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export const LoginLoading = (props) => {
  return (
    <MVStack>
      <MImage />
      <MText>loading</MText>
    </MVStack>
  )
}