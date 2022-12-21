import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";


export function FailModalItem() {
  return (
    <MVStack stretchH stretchW style={{ 'alignItems': 'center' }}>
      <MImage size={20} />
      <MText>Error</MText>
      <MText>Fail to fetch</MText>
    </MVStack>
  )
}