import { ScrollView, StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';

export function LoginScreen() {
  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MText>Login Screen</MText>
        <MVStack>
          <MButton
            title="Login test"
            onPress={() => loginIn("r.albert.huang@gmail.com")}
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