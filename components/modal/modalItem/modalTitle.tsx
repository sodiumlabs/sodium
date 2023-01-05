import { MDivider } from "../../baseUI/mDivider"
import MHStack from "../../baseUI/mHStack"
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText"
import { IconLogo } from '../../../lib/imageDefine';


export const ModalTitle = (props: { title: string }) => {
  const { title } = props;
  return (
    <>
      <MHStack stretchW style={{ justifyContent: 'center', height: 45, position: 'relative', marginTop: 20 }}>
        <MText style={{ color: '#000000', fontWeight: '600' }} >{title}</MText>
        <MImage style={{ position: 'absolute', left: 0, top: -7 }} w={27} h={27} source={IconLogo} />
      </MHStack>
      <MDivider />
      <MHStack style={{ marginTop: 26 }}></MHStack>
    </>
  )

}