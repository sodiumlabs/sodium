import * as AuthSession from 'expo-auth-session';
import { ScrollView, StyleSheet } from "react-native";
import { showUpdateComModal, showUpdateFullScreenModal } from "../../lib/data";
import { loginIn } from '../../lib/data/auth';
import { useProjectSetting } from '../../lib/data/project';
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconLogo } from "../../lib/imageDefine";
import { TwitterAuthService } from '../../lib/mpc-auth/twitter';
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { ScreenTitle } from "../baseUI/screenTitle";
import { LoginLoading } from "../full/loginLoading";
import { FailModalItem } from "../modal/modalItem/failModalItem";
import SteamSvg from '../svg/steamSvg';
import TwitterSvg from '../svg/twitterSvg';
import { Logger } from '../../lib/common/utils';

const projectNameForProxy = "@sodiumlabs/sodium";
const path = "expo-auth-session"

const redirect = AuthSession.makeRedirectUri({
  projectNameForProxy: projectNameForProxy,
  useProxy: true,
  path: path
});

export function LoginScreen() {
  const dimension = useDimensionSize();
  const projectSetting = useProjectSetting();

  const loginClick = async () => {
    // return loginIn("r.albert.huang@gmail.com3");
    showUpdateFullScreenModal(true, <LoginLoading />);
    const twauth = new TwitterAuthService("https://twitter-auth.melandworld.com", global.fetch);
    const { authURL } = await twauth.authURL({
      request: {
        oauthCallback: redirect
      }
    });
    const authResponse = await AuthSession.startAsync({
      authUrl: authURL,
      projectNameForProxy: projectNameForProxy
    });
    Logger.debug('Auth response received!');
    Logger.debug(authResponse);
    if (authResponse.type == "error") {
      let msg = "AuthSession failed, user did not authorize the app";
      if (authResponse.error) {
        msg = authResponse.error.message;
      }
      showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={msg} /> });
    } else if (authResponse.type == "success") {
      if (authResponse.params["oauth_token"]) {
        const result = await twauth.auth({
          request: {
            token: authResponse.params["oauth_token"],
            verifier: authResponse.params["oauth_verifier"],
            messageHash: ""
          }
        });
        await loginIn(result.response.authId);
      }
    }

    showUpdateFullScreenModal(false);
  }

  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}  >
            {/* <MText>Sign into web3</MText> */}
            <MImage source={IconLogo} w={60} h={60} style={{ marginBottom: 10 }} />
            <ScreenTitle title="Sign into web3" />
            <MVStack stretchW style={{ maxWidth: 300 }} >
              <MButton imageIcon={<SteamSvg height={18} width={18} />} style={{ marginBottom: 10 }} onPress={loginClick} >
                <MButtonText title={"Steam Login"} />
              </MButton>
              <MButton imageIcon={<TwitterSvg height={18} width={18} />} onPress={loginClick} >
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
    </BaseScreen >
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