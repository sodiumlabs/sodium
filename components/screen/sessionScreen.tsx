import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { eColor } from "../../lib/globalStyles";
import { useAdapterScale } from "../../lib/hook";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { SessionItem } from "../item/sessionItem";

export function SessionScreen() {
  const dimension = useDimensionSize();
  const { isInited, handleLayout, scaleStyleCenter: scaleStyle } = useAdapterScale();
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack onLayout={handleLayout} stretchW style={[styles.container, { minHeight: dimension[1] }, scaleStyle]}>
            {isInited && (<>
              <ScreenTitle title="Active Sessions" />
              <MText numberOfLines={null}>You're currently signed in to your sodium wallet on these sessions.Pay close attention and make sure to remove sessions you are no longer using for better security.</MText>
              <MHStack stretchW style={{ marginTop: 20 }}>
                <MText style={{ color: eColor.GrayContentText }} >Session Keys(2)</MText>
              </MHStack>
              <SessionItem isSelected />
              <SessionItem isSelected={false} />
              <MHStack style={{ marginBottom: 50 }} />

              <Spacer />
              <Information />
            </>)}
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