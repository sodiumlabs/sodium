import * as AuthSession from 'expo-auth-session';
import { Platform, ScrollView, StyleSheet } from "react-native";
import { showUpdateComModal, showUpdateFullScreenModal } from "../../lib/data";
import { loginIn } from '../../lib/data/auth';
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconLogo } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { ScreenTitle } from "../baseUI/screenTitle";
import { LoginLoading } from "../full/loginLoading";
import SteamSvg from '../svg/steamSvg';
import TwitterSvg from '../svg/twitterSvg';
import * as Google from 'expo-auth-session/providers/google';
import * as React from 'react';
import { UseTopCenterScale } from '../base/scaleInit';
import { AuthService, getAuthService } from '../../lib/auth';
import { FailModalItem } from '../modal/modalItem/failModalItem';
import { getDevice } from '../../lib/auth/device';
import { ethers } from 'ethers';

const projectNameForProxy = "@sodiumlabs/sodium";
const path = "expo-auth-session"

const redirectUri = makeRedirectUri({
  scheme: 'com.sodiumlabs.sodium',
  projectNameForProxy: projectNameForProxy,
  path: path
});

const googleDiscovery: Partial<Google.GoogleAuthRequestConfig> = {
  webClientId: "241812371246-5q72o46n1mh2arkqur1qv2qk01vn0v24.apps.googleusercontent.com",
  redirectUri: redirectUri,
  usePKCE: true,
  selectAccount: true,
}

const useProxy = false;

// 

export function LoginScreen() {
  const dimension = useDimensionSize();
  const topCenterStyle = UseTopCenterScale();

  const wallet = ethers.Wallet.createRandom();
  const [__, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    state: wallet.address,
    ...googleDiscovery
  });

  const authGoogle = async (accessToken: string) => {
    const authService = getAuthService();

    const isSafe = false;
    const device = getDevice();
    const preAuthId = `google${accessToken}`;

    const authHash = ethers.utils.id(preAuthId);

    const sig = await wallet.signMessage(authHash);
    authService.preAuth({
      request: {
        authHash: authHash,
        sessionKey: wallet.address,
        authSignature: sig,
      }
    });

    const result = await authService.authSessionWithGoogle({
      request: {
        authToken: accessToken,
        isSafe: isSafe,
        sessionKey: wallet.address,
        deviceInfo: device.deviceInfo,
        deviceId: device.deviceId,
      }
    });

    await loginIn(
      result.response,
      wallet,
    );
  }

  React.useEffect(() => {
    if (googleResponse) {
      showUpdateFullScreenModal(false);
    }
    console.debug(googleResponse, "googleResponse");
    if (googleResponse?.type === 'success') {
      authGoogle(googleResponse.params.access_token)
    }
    if (googleResponse?.type === 'error') {
      let msg = "AuthSession failed, user did not authorize the app";
      if (googleResponse.error) {
        msg = googleResponse.error.message;
      }
      showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={msg} /> });
    }
  }, [googleResponse]);

  const googleOAuth2Login = async () => {
    showUpdateFullScreenModal(true, <LoginLoading />);
    googlePromptAsync({ useProxy: useProxy })
  }

  return (
    <></>
  )

  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}  >
            {/* <MText>Sign into web3</MText> */}
            <MImage source={IconLogo} w={60} h={60} style={{ marginBottom: 10 }} />
            <ScreenTitle title="Sign into web3" />
            <MVStack stretchW style={{ maxWidth: 300 }} >
              <MButton imageIcon={<SteamSvg height={18} width={18} />} style={{ marginBottom: 10 }} onPress={googleOAuth2Login} >
                <MButtonText title={"Google Login"} />
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