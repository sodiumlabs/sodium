import { ScrollView, StyleSheet } from "react-native";
import { loginIn } from "../../lib/data/auth";
import { btnScale, fixWidth } from "../../lib/define";
import { eColor } from '../../lib/globalStyles';
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconLogo } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { showUpdateFullScreenModal } from "../../lib/data/modal";
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { ScreenTitle } from "../baseUI/screenTitle";
import { LoginLoading } from "../full/loginLoading";
import * as React from 'react';
import { TwitterAuthService } from '../../lib/mpc-auth/twitter';
import { Platform } from 'react-native';

/// 临时实现的web twitter auth
/// 为了demo day 临时，后续换成 expo auth 以支持react native
interface OpenWindow {
  url: string;
  name?: string;
}

export const openWindow = ({ url, name }: OpenWindow) => {
  const top = (window.innerHeight - 400) / 2 + window.screenY;
  const left = (window.innerWidth - 400) / 2 + window.screenX;

  return window.open(
    url,
    name,
    `dialog=yes,top=${top}px,left=${left},width=${400}px,height=${500}px`
  );
};

interface ObserveWindow {
  popup: Window;
  interval?: number;
  onClose: () => void;
}

export const observeWindow = ({ popup, interval, onClose }: ObserveWindow) => {
  const intervalId = setInterval(() => {
    if (popup.closed) {
      clearInterval(intervalId);
      onClose();
    }
  }, interval || 100);
};

/// temp - end 



// const useProxy = Platform.select({ web: true, default: false });
// WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
  tokenEndpoint: "https://twitter.com/i/oauth2/token",
  revocationEndpoint: "https://twitter.com/i/oauth2/revoke",
};

export function LoginScreen() {
  const dimension = useDimensionSize();

  /// temp
  if (Platform.OS == "web") {
    const twauth = new TwitterAuthService("//twitter-auth.melandworld.com", global.fetch);
    React.useEffect(() => {
      const handle = async (event) => {
        if (event.data.target === TWITTER_OAUTH_CALLBACK) {
          const { oauthToken, oauthVerifier } = event.data;
          const { response } = await twauth.auth({
            request: {
              token: oauthToken,
              verifier: oauthVerifier,
              messageHash: ""
            }
          });
          await loginIn("r.albert.huang@gmail.com");
          // await loginIn(response.email);
        }
      };
      window.addEventListener('message', handle);

      return () => {
        window.removeEventListener('message', handle);
      }
    }, [window]);
  }
  /// temp - end

  const loginClick = async () => {
    if (Platform.OS == "web") {
      const twauth = new TwitterAuthService("//twitter-auth.melandworld.com", global.fetch);
      const { authURL } = await twauth.authURL({
        request: {
          oauthCallback: "http://127.0.0.1:3000"
        }
      });
      openWindow({ url: authURL, name: "twteet login" });
      // promptAsync({ 
      // });
      // showUpdateFullScreenModal(true, <TwoFactorAuth />);
      showUpdateFullScreenModal(true, <LoginLoading />);
      showUpdateFullScreenModal(false);
    } else {
      await loginIn("r.albert.huang@gmail.com");
    }
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
              <MButton scale={btnScale} style={{ marginBottom: 10, height: 30, backgroundColor: eColor.Blue }} onPress={loginClick} >
                <MButtonText title={"Steam login"} />
              </MButton>
              <MButton scale={btnScale} style={{ marginBottom: 10, height: 30, backgroundColor: eColor.Blue }} onPress={loginClick} >
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



/// 临时实现的web twitter auth
/// 为了demo day 临时，后续换成 expo auth 以支持react native
const TWITTER_OAUTH_CALLBACK = 'TWITTER_OAUTH_CALLBACK';