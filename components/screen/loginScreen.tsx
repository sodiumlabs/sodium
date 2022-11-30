import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';

export function LoginScreen() {
  const navigation = useNavigation();
  return (
    <BaseScreen hasHeaderFooter={false}>
      <MText>Login Screen</MText>
      <MVStack>
        <MButton
          title="Login google"
          onPress={() => navigation.navigate('Wallet')} />
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