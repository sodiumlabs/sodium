import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, IConnectScreenParam } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import { navigation } from "../base/navigationInit";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function ConnectScreen(props) {
  const param = props.route.params as IConnectScreenParam;

  const onContinueClick = () => {
    param.continueClick && param.continueClick();
    navigation.goBack();
  }

  const onCancelClick = () => {
    param.cancelClick && param.cancelClick();
    navigation.goBack();
  }
  return (
    <BaseScreen hasNavigationBar={false} >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={styles.container}>
            <MText style={{ marginVertical: 6 }}>
              Do you want to allow Keeper #2344 - KPR | OpenSea from https://opensea.io to connect to your wallet?
            </MText>

            <MButton title={"Continue"} onPress={onContinueClick} />
            {/* <MText>99</MText> */}
            <MButton title={"Cancel"} onPress={onCancelClick} />

          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
  item: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 15,
    width: '100%'
  }
});