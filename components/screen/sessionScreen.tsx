import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { SessionItem } from "../item/sessionItem";

export function SessionScreen() {
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={styles.container}>
            <MText style={{ marginVertical: 6 }}>Active Sessions</MText>
            <MText numberOfLines={null}>You're currently signed in to your sodium wallet on these sessions.Pay close attention and make sure to remove sessions you are no longer using for better security.</MText>
            <MText>Session Keys(4)</MText>
            <SessionItem />
            <SessionItem />
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