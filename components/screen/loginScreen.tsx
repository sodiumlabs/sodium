import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { loginIn } from "../../src/data/login";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import { useEffect } from 'react';
import { showLoadingModal } from "../base/screenInit";
import { waitTime } from '../../src/common/common';

export function LoginScreen() {
  const navigation = useNavigation();
  // useEffect(() => {
  //   (async () => {
  //     showLoadingModal(true);
  //     await waitTime(1000);
  //     showLoadingModal(false);
  //   })();
  // }, [])
  return (
    <BaseScreen hasHeaderFooter={false}>
      <MText>Login Screen</MText>
      <MVStack>
        <MButton
          title="Login google"
          onPress={() => loginIn()} />
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