import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, IConnectScreenParam } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigationRef } from "../base/navigationInit";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function ConnectScreen(props) {
  const param = props.route.params as IConnectScreenParam;
  const dimension = useDimensionSize();
  const onContinueClick = () => {
    param.continueClick && param.continueClick();
    navigationRef.goBack();
  }

  const onCancelClick = () => {
    param.cancelClick && param.cancelClick();
    navigationRef.goBack();
  }
  return (
    <BaseScreen hasNavigationBar={false} >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}>
            <MText numberOfLines={null} style={{ marginVertical: 6, textAlign: 'center' }}>
              Do you want to allow {param?.options?.origin} to connect to your wallet?
            </MText>

            <MButton onPress={onContinueClick} >
              <MText>Continue</MText>
            </MButton>
            {/* <MText>99</MText> */}
            <MButton onPress={onCancelClick} >
              <MText>Cancel</MText>
            </MButton>
            {/* <Spacer /> */}
            {/* <Information /> */}
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
  item: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 10,
    width: '100%'
  }
});