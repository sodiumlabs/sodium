import { Divider } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, Screens } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigationRef } from "../base/navigationInit";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import { MDivider } from "../baseUI/mDivider";
import MHStack from '../baseUI/mHStack';
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { globalStyle, eColor } from '../../lib/globalStyles';
import { MButtonText } from "../baseUI/mButtonText";

export function SecurityScreen() {
  // const auth = useAuth();
  const dimension = useDimensionSize();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Security" />
            <MVStack>
              <MText>Two-factor authentication</MText>
              <MDivider style={{ marginVertical: 10 }} />
              <MHStack style={[globalStyle.whiteBorderWidth, { padding: 15, marginBottom: 20 }]}>
                <MText numberOfLines={null}>Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in. Learn more about two-factor authentication.</MText>
              </MHStack>
              <MDivider style={{ marginBottom: 10 }} />
              <MText>Two-factor methods</MText>

              <MLineLR
                left={<MText style={{ color: eColor.GrayContentText }} >Primary two-factor method</MText>}
                right={
                  <MHStack>

                    <MButton style={{ width: 60, backgroundColor: eColor.Blue }} onPress={() => navigationRef.navigate(Screens.SetupAuth)} >
                      <MButtonText title={"Set"} />
                    </MButton>
                  </MHStack>
                }
              />
              <MDivider style={{ marginVertical: 10 }} />
              <MText  >Recovery options</MText>
              <MLineLR
                left={<MText style={{ color: eColor.GrayContentText }}>Recovery codes</MText>}
                right={
                  <MHStack>
                    <MButton style={{ width: 60, backgroundColor: eColor.Blue }} onPress={() => navigationRef.navigate(Screens.RecoveryCode)} >
                      <MButtonText title={"Show"} />
                    </MButton>
                  </MHStack>
                }
              />
            </MVStack>
            <Spacer />
            <Information />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 10,
    width: '100%'
  },
  container: {
    // marginVertical: 80,
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});