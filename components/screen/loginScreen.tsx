import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";

export function LoginScreen(props: { navigation: { popToTop: () => void; }; }) {
  const navigation = useNavigation();
  return (
    <BaseScreen isPreset={false}>
      <MText>Login Screen</MText>
      <View>

        <MButton
          title="Login"
          onPress={() => navigation.push('Wallet')} />
      </View>
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