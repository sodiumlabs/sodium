import MButton from "../../baseUI/mButton"
import { MButtonText } from "../../baseUI/mButtonText";
import MHStack from "../../baseUI/mHStack"
import MText from "../../baseUI/mText"
import { eColor } from '../../../lib/globalStyles';


export const OperateBtnItem = (props: { onCancelClick: () => void, onConfirmClick: () => void, isConfirmLoading: boolean }) => {
  const { onCancelClick, onConfirmClick, isConfirmLoading } = props;
  return (
    <MHStack stretchW style={{ height: 45, marginBottom: 15, paddingHorizontal: 15 }}>
      <MButton style={{ flex: 1, marginRight: 10 }} onPress={onCancelClick} >
        <MButtonText title={"Reject"} />
      </MButton>
      <MButton style={{ flex: 1, backgroundColor: eColor.Blue, marginLeft: 10 }} onPress={onConfirmClick} isLoading={isConfirmLoading} >
        <MButtonText title={"Confirm"} />
      </MButton>
    </MHStack>
  )
}