import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";

export function HistoryScreen(props: { navigation: { popToTop: () => void; }; }) {
  return (
    <BaseScreen >
      <MText>History Screen</MText>
      <MButton
        title="Go to top"
        onPress={() => props.navigation.popToTop()}
      />
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});