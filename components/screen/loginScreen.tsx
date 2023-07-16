import { Platform, ScrollView, StyleSheet } from "react-native";
import { showUpdateComModal, showUpdateFullScreenModal } from "../../lib/data";
import { loginIn, loginInWithEOA } from '../../lib/data/auth';
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
import { ScreenTitle } from "../baseUI/screenTitle";
import { LoginLoading } from "../full/loginLoading";
import SteamSvg from '../svg/steamSvg';
import * as React from 'react';
import { UseTopCenterScale } from '../base/scaleInit';
import { AuthService, getAuthService } from '../../lib/auth';
import { onboardAPIAtom, walletAtom } from '../../lib/provider';
import { getDevice } from '../../lib/auth/device';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { ethers } from 'ethers';
import { FailModalItem } from "../modal/modalItem/failModalItem";
import { WalletState } from '@web3-onboard/core'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { getWeb3OnboardNetworks } from "../../lib/network";

const webClientId = "241812371246-5q72o46n1mh2arkqur1qv2qk01vn0v24.apps.googleusercontent.com";

export function LoginScreen() {
  const dimension = useDimensionSize();
  const topCenterStyle = UseTopCenterScale();

  // React.useEffect(() => {
  //   if (googleResponse) {
  //     showUpdateFullScreenModal(false);
  //   }
  //   console.debug(googleResponse, "googleResponse");
  //   if (googleResponse?.type === 'success') {
  //     authGoogle(googleResponse.params.access_token)
  //   }
  //   if (googleResponse?.type === 'error') {
  //     let msg = "AuthSession failed, user did not authorize the app";
  //     if (googleResponse.error) {
  //       msg = googleResponse.error.message;
  //     }
  //     showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={msg} /> });
  //   }
  // }, [googleResponse]);

  const googleOAuth2Login = async () => {
    showUpdateFullScreenModal(true, <LoginLoading />);
  }



  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}  >
            {/* <MText>Sign into web3</MText> */}
            <MImage source={IconLogo} w={60} h={60} style={{ marginBottom: 10 }} />
            <ScreenTitle title="Sign into web3" />
            <MVStack stretchW style={{ maxWidth: 300 }} >
              <GoogleOAuthProvider clientId={webClientId}>
                <GoogleLoginButton></GoogleLoginButton>
              </GoogleOAuthProvider>
              <ExternalEOALoginButton></ExternalEOALoginButton>
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

const injected = injectedModule()
const chains = getWeb3OnboardNetworks();
const onboard = Onboard({
  wallets: [injected],
  chains: chains,
  connect: {
    showSidebar: false,
    autoConnectLastWallet: true,
  }
});
function ExternalEOALoginButton() {
  const [wallet, setWallet] = React.useState<WalletState | null>(null);

  React.useEffect(() => {
    if (wallet != null) {
      const ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = ethersProvider.getSigner();
      loginInWithEOA(signer, wallet.label);
      onboardAPIAtom.set(onboard);
    }
  }, [wallet]);

  React.useEffect(() => {
    const wallets = onboard.state.select("wallets");
    const subscription = wallets.subscribe((wallets) => {
      console.log(wallets, "wallets");
      if (wallets.length == 1) {
        const wallet = wallets[0];
        setWallet(wallet);
      } else {
        // TODO show wallet select
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  })

  const auth = async () => {
    return onboard.connectWallet();
  }

  return (
    <MButton imageIcon={<SteamSvg height={18} width={18} />} style={{ marginBottom: 10 }} onPress={auth} >
      <MButtonText title={"Web3 Connect"} />
    </MButton>
  )
}

function GoogleLoginButton() {
  const authGoogle = async (accessToken: string) => {
    const wallet = ethers.Wallet.createRandom();
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

  const googleAuth = useGoogleLogin({
    onSuccess: credentialResponse => {
      showUpdateFullScreenModal(false);
      authGoogle(credentialResponse.access_token);
    },
    onError: (res) => {
      showUpdateFullScreenModal(false);
      showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={res.error_description} /> });
    },
  });

  const googleOAuth2Login = async () => {
    showUpdateFullScreenModal(true, <LoginLoading />);
    googleAuth();
  }

  return (
    <MButton imageIcon={<SteamSvg height={18} width={18} />} style={{ marginBottom: 10 }} onPress={googleOAuth2Login} >
      <MButtonText title={"Google Login"} />
    </MButton>
  )
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