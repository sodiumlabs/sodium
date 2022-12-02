import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import SettingItem from "../item/settingItem";

export function SettingScreen() {
  const navigation = useNavigation();
  return (
    <BaseScreen >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>Setting</MText>
        <SettingItem onPress={() => navigation.navigate('Profile')} >
          <MText>Profile</MText>
        </SettingItem>
        <SettingItem onPress={() => navigation.navigate('Session')} >
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