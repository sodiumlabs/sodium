import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";


export function FailModalItem(props: { error: string }) {
  const { error } = props;
  return (
    <MVStack stretchH stretchW style={{ 'alignItems': 'center' }}>
      {/* <MImage size={20} /> */}
      <MText style={{ fontWeight: '700' }} >Error</MText>
      <MText numberOfLines={5} style={{ marginTop: 20 }}>{error}</MText>
    </MVStack>
  )
}