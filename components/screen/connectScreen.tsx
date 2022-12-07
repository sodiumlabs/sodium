import { StyleSheet } from "react-native";
import { IConnectScreenParam } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import { navigation } from "../base/navigationInit";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function ConnectScreen(props) {
  const param = props.route.params as IConnectScreenParam;
  const continueClick = param.continueClick;
  const cancelClick = param.cancelClick;

  const onContinueClick = () => {
    navigation.goBack();
    continueClick && continueClick();
  }

  const onCancelClick = () => {
    navigation.goBack();
    cancelClick && cancelClick();
  }
  return (
    <BaseScreen hasNavigationBar={false} >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>
          Do you want to allow Keeper #2344 - KPR | OpenSea from https://opensea.io to connect to your wallet?
        </MText>

        <MButton title={"Continue"} onPress={onContinueClick} />
        <MButton title={"Cancel"} onPress={onCancelClick} />

      </MVStack>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 15,
    width: '100%'
  }
});