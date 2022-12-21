import { ScrollView, StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { showUpdateFullScreenModal } from "../base/modalInit";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import { LoginLoading } from "../full/loginLoading";

export function LoginScreen() {
  const dimension = useDimensionSize();

  const loginClick = async () => {
    // showUpdateFullScreenModal(true, <TwoFactorAuth />);
    showUpdateFullScreenModal(true, <LoginLoading />);
    await loginIn("r.albert.huang@gmail.com");
    showUpdateFullScreenModal(false);
  }
  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}  >
            <MText>Sign into web3</MText>
            <MVStack stretchW>
              <MButton style={{ marginBottom: 10 }} onPress={loginClick} >
                <MText>Steam login</MText>
              </MButton>

              <MButton style={{ marginBottom: 10 }} onPress={loginClick} >
                <MText>Twitter Login</MText>
              </MButton>
            </MVStack>

            <Spacer />
            <Information style={{ marginBottom: 0 }} />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: fixWidth
  }
});