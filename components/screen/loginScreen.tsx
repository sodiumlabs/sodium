import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';

export function LoginScreen(props: { navigation: { popToTop: () => void; }; }) {
  const navigation = useNavigation();
  return (
    <BaseScreen isPreset={false}>
      <MText>Login Screen</MText>
      <MVStack>
        <MButton
          title="Login"
          onPress={() => navigation.push('Wallet')} />
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