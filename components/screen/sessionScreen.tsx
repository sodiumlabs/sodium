import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import SettingItem from "../item/settingItem";

export function SessionScreen() {
  return (
    <BaseScreen isNavigationBarBack>
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>Active Sessions</MText>
      </MVStack>
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