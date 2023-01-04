import MButton from "../../baseUI/mButton"
import MHStack from "../../baseUI/mHStack"
import MText from "../../baseUI/mText"


export const OperateBtnItem = (props: { onCancelClick: () => void, onConfirmClick: () => void, isLoading: boolean }) => {
  const { onCancelClick, onConfirmClick, isLoading } = props;
  return (
    <MHStack stretchW style={{ height: 45, marginBottom: 15, paddingHorizontal: 15 }}>
      <MButton style={{ flex: 1, marginRight: 10 }} onPress={onCancelClick} >
        <MText style={{ color: '#ffffff', fontWeight: '700' }}>Reject</MText>
      </MButton>
      <MButton style={{ flex: 1, backgroundColor: "#2178DD", marginLeft: 10 }} onPress={onConfirmClick} isLoading={isLoading} >
        <MText style={{ color: '#ffffff', fontWeight: '700' }}>Confirm</MText>
      </MButton>
    </MHStack>
  )
}