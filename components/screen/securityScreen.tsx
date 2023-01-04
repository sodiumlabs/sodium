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
              <MHStack style={{ backgroundColor: 'rgba(200,200,200,0.5)' }}>
                <MText numberOfLines={null}>Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in. Learn more about two-factor authentication.</MText>
              </MHStack>
              <MText>Two-factor methods</MText>
              <MLineLR
                left={<MText>Primary two-factor method</MText>}
                right={
                  <MHStack>

                    <MButton onPress={() => navigationRef.navigate(Screens.SetupAuth)} >
                      <MText>Set</MText>
                    </MButton>
                  </MHStack>
                }
              />
              <MText>Recovery options</MText>
              <MLineLR
                left={<MText>Recovery codes</MText>}
                right={
                  <MHStack>
                    <MButton onPress={() => navigationRef.navigate(Screens.RecoveryCode)} >
                      <MText>Show</MText>
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