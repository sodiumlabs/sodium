import { StyleSheet } from "react-native";
import { Screens } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import { navigation } from "../base/navigationInit";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import SettingItem from "../item/settingItem";

export function SettingScreen() {
  return (
    <BaseScreen >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>Setting</MText>
        <SettingItem onPress={() => navigation.navigate(Screens.Profile)} >
          <MText>Profile</MText>
        </SettingItem>
        <SettingItem onPress={() => navigation.navigate(Screens.Session)} >
          <MText>Active Sessions</MText>
          <MText> 0 Active Sessions</MText>
        </SettingItem>
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