import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import { MLoading } from "../baseUI/mLoading";
import MVStack from '../baseUI/mVStack';
import { useAdapterScale } from "../../lib/hook";

export function OpeningScreen() {
  const dimension = useDimensionSize();
  const { isInited, handleLayout, scaleStyleCenter: scaleStyle } = useAdapterScale();

  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack onLayout={handleLayout} stretchW stretchH style={[styles.container, { minHeight: dimension[1] }, scaleStyle]}  >
            {
              isInited && (
                <>
                  <MLoading />
                </>)
            }
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'black',
    paddingBottom: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: fixWidth
  }
});