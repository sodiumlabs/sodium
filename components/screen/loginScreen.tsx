import { ScrollView, StyleSheet } from "react-native";
import { waitTime } from '../../lib/common/common';
import { loginIn } from "../../lib/data/auth";
import { fixWidth } from "../../lib/define";
import { eColor } from '../../lib/globalStyles';
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconLogo } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { showUpdateFullScreenModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { ScreenTitle } from "../baseUI/screenTitle";
import { LoginLoading } from "../full/loginLoading";

export function LoginScreen() {
  const dimension = useDimensionSize();

  const loginClick = async () => {
    // showUpdateFullScreenModal(true, <TwoFactorAuth />);
    showUpdateFullScreenModal(true, <LoginLoading />);
    await loginIn("r.albert.huang@gmail.com");
    // await waitFinish();
    await waitTime(1);// Call next frame to avoid flash screen
    showUpdateFullScreenModal(false);
  }
  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}  >
            {/* <MText>Sign into web3</MText> */}
            <MImage source={IconLogo} w={30} h={30} style={{ marginBottom: 10 }} />
            <ScreenTitle title="Sign into web3" />
            <MVStack stretchW>
              <MButton style={{ marginBottom: 10, height: 30, backgroundColor: eColor.Blue }} onPress={loginClick} >
                <MButtonText title={"Steam login"} />
              </MButton>

              <MButton style={{ marginBottom: 10, height: 30, backgroundColor: eColor.Blue }} onPress={loginClick} >
                <MButtonText title={"Twitter Login"} />
              </MButton>
            </MVStack>

            {/* <Spacer /> */}
            <MVStack stretchW style={{ position: 'absolute', bottom: 0 }}>
              <Information style={{ marginBottom: 0 }} />
              <MHStack style={{ marginBottom: 30 }} />
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
    // backgroundColor: 'black',
    paddingBottom: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: fixWidth
  }
});