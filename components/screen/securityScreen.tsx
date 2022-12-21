import { Divider } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from '../../lib/data/auth';
import { fixWidth, Screens } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import { navigation } from "../base/navigationInit";
import MButton from "../baseUI/mButton";
import MHStack from '../baseUI/mHStack';
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function SecurityScreen() {
  const auth = useAuth();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={styles.container}>
            <MText style={{ marginVertical: 6 }}>Security</MText>
            <MVStack>
              <MText>Two-factor authentication</MText>
              <Divider />
              <MHStack style={{ backgroundColor: 'rgba(200,200,200,0.5)' }}>
                <MText numberOfLines={null}>Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in. Learn more about two-factor authentication.</MText>
              </MHStack>
              <MText>Two-factor methods</MText>
              <MLineLR
                left={<MText>Primary two-factor method</MText>}
                right={
                  <MHStack>

                    <MButton onPress={() => navigation.navigate(Screens.SetupAuth)} >
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
                    <MButton onPress={() => navigation.navigate(Screens.RecoveryCode)} >
                      <MText>Show</MText>
                    </MButton>
                  </MHStack>
                }
              />
            </MVStack>
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
    borderRadius: 15,
    width: '100%'
  },
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});