import { ScrollView, StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { BaseScreen } from "../base/baseScreen";
import { showUpdateLoadingModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';

export function LoginScreen() {

  const loginClick = async () => {
    showUpdateLoadingModal(true);
    await loginIn("r.albert.huang@gmail.com");
    showUpdateLoadingModal(false);
  }
  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MText>Sign into web3</MText>
        <MVStack>
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
  }
});