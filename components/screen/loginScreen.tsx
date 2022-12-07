import { StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';

export function LoginScreen() {
  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <MText>Login Screen</MText>
      <MVStack>
        <MButton
          title="Login test"
          onPress={() => loginIn("r.albert.huang@gmail.com")}
        />
      </MVStack>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});