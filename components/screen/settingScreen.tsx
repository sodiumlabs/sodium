import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, Screens } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import { navigation } from "../base/navigationInit";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import SettingItem from "../item/settingItem";

export function SettingScreen() {
  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={styles.container}>
            <MText style={{ marginVertical: 6 }}>Setting</MText>
            <SettingItem onPress={() => navigation.navigate(Screens.Profile)} >
              <MText>Profile</MText>
            </SettingItem>
            <SettingItem onPress={() => navigation.navigate(Screens.Session)} >
              <MText>Active Sessions</MText>
              <MText> 0 Active Sessions</MText>
            </SettingItem>

            <SettingItem onPress={() => navigation.navigate(Screens.Security)} >
              <MText>Security</MText>
            </SettingItem>
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
});