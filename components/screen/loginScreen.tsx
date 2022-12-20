import { ScrollView, StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { fixWidth } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import { showUpdateFullScreenModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import { LoginLoading } from "../full/loginLoading";
import { TwoFactorAuth } from "../full/twoFactorAuth";

export function LoginScreen() {

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
          <MVStack stretchW style={styles.container} >
            <MText>Sign into web3</MText>
            <MVStack stretchW>
              <MButton
                style={{ marginBottom: 10 }}
                title="Login"
                onPress={loginClick}
              />
              <MButton
                style={{ marginBottom: 10 }}
                title="Login google"
                onPress={loginClick}
              />
              <MButton
                style={{ marginBottom: 10 }}
                title="Login facebook"
                onPress={loginClick}
              />
            </MVStack>
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