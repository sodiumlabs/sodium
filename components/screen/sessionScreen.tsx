import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import SettingItem from "../item/settingItem";

export function SessionScreen() {
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Active Sessions</MText>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
});