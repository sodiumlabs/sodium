import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, Screens } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigationRef } from "../base/navigationInit";
import { Spacer } from "../base/spacer";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import SettingItem from "../item/settingItem";

export function SettingScreen() {
  const dimension = useDimensionSize();
  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Setting" />
            <SettingItem onPress={() => navigationRef.navigate(Screens.Profile)} >
              <MText>Profile</MText>
            </SettingItem>
            <SettingItem onPress={() => navigationRef.navigate(Screens.Session)} >
              <MText>Active Sessions</MText>
              <MText> 0 Active Sessions</MText>
            </SettingItem>

            <SettingItem onPress={() => navigationRef.navigate(Screens.Security)} >
              <MText>Security</MText>
            </SettingItem>

            <SettingItem onPress={() => navigationRef.navigate(Screens.Allowance)} >
              <MText>Allowance</MText>
            </SettingItem>
            <Spacer />
            <Information />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    // marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});