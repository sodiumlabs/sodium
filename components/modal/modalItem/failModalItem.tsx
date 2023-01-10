import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import { eColor } from '../../../lib/globalStyles';


export function FailModalItem(props: { error: string }) {
  const { error } = props;
  return (
    <MVStack stretchH stretchW style={{ 'alignItems': 'center' }}>
      {/* <MImage size={20} /> */}
      <MText style={{ fontWeight: '700', color: eColor.Red }} >Error</MText>
      <MText numberOfLines={5} style={{ marginTop: 20, color: eColor.Red }} >{error || "unknow"}</MText>
    </MVStack>
  )
}