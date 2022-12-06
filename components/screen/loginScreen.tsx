import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import { useEffect } from 'react';
import { showLoadingModal } from "../base/screenInit";
import { waitTime } from '../../lib/common/common';

export function LoginScreen() {
  const navigation = useNavigation();
  return (
    <BaseScreen hasHeaderFooter={false}>
      <MText>Login Screen</MText>
      <MVStack>
        <MButton
          title="Login test"
          onPress={() => loginIn("r.albert.huang@gmail.com")} />
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