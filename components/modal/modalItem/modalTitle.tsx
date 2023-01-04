import { MDivider } from "../../baseUI/mDivider"
import MHStack from "../../baseUI/mHStack"
import MText from "../../baseUI/mText"


export const ModalTitle = (props: { title: string }) => {
  const { title } = props;
  return (
    <>
      <MHStack stretchW style={{ justifyContent: 'center', height: 45 }}>
        <MText style={{ color: '#000000', fontWeight: '600' }} >{title}</MText>
      </MHStack>
      <MDivider />
      <MHStack style={{ marginTop: 26 }}></MHStack>
    </>)

}