import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { SessionItem } from "../item/sessionItem";

export function SessionScreen() {
  const dimension = useDimensionSize();
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Active Sessions" />
            <MText numberOfLines={null}>You're currently signed in to your sodium wallet on these sessions.Pay close attention and make sure to remove sessions you are no longer using for better security.</MText>
            <MText>Session Keys(4)</MText>
            <SessionItem />
            <SessionItem />

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