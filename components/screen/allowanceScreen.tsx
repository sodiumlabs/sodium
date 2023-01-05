import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { AllowanceItem } from "../item/allowanceItem";

export function AllowanceScreen() {
  const dimension = useDimensionSize();
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Allowance Sessions" />
            <MText numberOfLines={null}>You're currently signed in to your sodium wallet on these sessions.Pay close attention and make sure to remove sessions you are no longer using for better security.</MText>
            <MHStack stretchW style={{ marginTop: 20 }}>
              <MText >Allowance Keys(2)</MText>
            </MHStack>
            <AllowanceItem />
            <AllowanceItem />
            <MHStack style={{ marginBottom: 50 }} />

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