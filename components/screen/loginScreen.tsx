import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { showUpdateComModal, showUpdateFullScreenModal } from "../../lib/data";
import { loginIn, loginInWithEOA } from '../../lib/data/auth';
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconGoogle, IconLogo, IconMetamask } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { MButtonText } from "../baseUI/mButtonText";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { ScreenTitle } from "../baseUI/screenTitle";
import { LoginLoading } from "../full/loginLoading";
import * as React from 'react';
import { UseTopCenterScale } from '../base/scaleInit';
import { getAuthService } from '../../lib/auth';
import { onboardAPIAtom } from '../../lib/provider';
import { getDevice } from '../../lib/auth/device';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { ethers } from 'ethers';
import { FailModalItem } from "../modal/modalItem/failModalItem";
import { WalletState } from '@web3-onboard/core';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { getWeb3OnboardNetworks } from "../../lib/network";
import MLoginButton from "../baseUI/mLoginButton";
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'

const webClientId = "241812371246-5q72o46n1mh2arkqur1qv2qk01vn0v24.apps.googleusercontent.com";
const wcProjectId = "3dea5e1f2e4c86222bd29888c46c4744";

export function LoginScreen() {
  const dimension = useDimensionSize();
  const topCenterStyle = UseTopCenterScale();

  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}  >
            {/* <MText>Sign into web3</MText> */}
            <MImage source={IconLogo} w={60} h={60} style={{ marginBottom: 10 }} />
            <ScreenTitle title="Sign in" />
            <MVStack stretchW style={{ maxWidth: 300, marginTop: 30 }} >
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

const chains = getWeb3OnboardNetworks();
const injected = injectedModule();
const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: wcProjectId,
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: chains.map(c => parseInt(c.id)),
}

// initialize the module with options
// If version isn't set it will default to V2 - V1 support will be completely removed shortly as it is deprecated
const walletConnect = walletConnectModule(wcV2InitOptions);
const coinbase = coinbaseModule();
const onboard = Onboard({
  wallets: [injected, walletConnect, coinbase],
  chains: chains,
  connect: {
    disableClose: false,
    showSidebar: true,
    autoConnectLastWallet: true,
    removeWhereIsMyWalletWarning: true,
  },
  appMetadata: {
    name: "Sodium",
    icon: '<svg>1</svg>',
    description: "Sodium wallet connect"
  },
  theme: "light",
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    }
  }
});
function ExternalEOALoginButton() {
  const [wallet, setWallet] = React.useState<WalletState | null>(null);

  React.useEffect(() => {
    if (wallet != null) {
      const ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any');
      const signer = ethersProvider.getSigner();

      Promise.all([
        // signer.signMessage("Welcome to sodium"),
        signer.getAddress(),
      ]).then((result) => {
        // const sig = result[0];
        // const signAddress = ethers.utils.recoverAddress(ethers.utils.toUtf8Bytes("Welcome to sodium"), sig);
        // const walletAddress = result[1];
        // if (signAddress.toLocaleLowerCase() != walletAddress.toLocaleLowerCase()) {
        // throw new Error("EOA wallet only");
        // }
        // return;
      }).then((result) => {
        return loginInWithEOA(signer, wallet.label);
      }).then((result) => {
        onboardAPIAtom.set(onboard);
      }).catch(error => {
        console.error(error);
        showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={error.message} /> });
      })

      // loginInWithEOA(signer, wallet.label);
      // onboardAPIAtom.set(onboard);
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
    <MLoginButton imageIcon={<MImage w={27} h={27} source={IconMetamask} />} style={{ marginBottom: 10 }} onPress={auth} >
      <View style={{ width: 80, flexDirection: 'row', justifyContent: 'center' }}>
        <MButtonText title={"Web3 Login"} style={{ color: '#1D92FF', fontWeight: '500' }} />
      </View>
    </MLoginButton>
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
    <MLoginButton imageIcon={<MImage w={21} h={21} source={IconGoogle} />} style={{ marginBottom: 10 }} onPress={googleOAuth2Login} >
      <View style={{ width: 80, flexDirection: 'row', justifyContent: 'center' }}>
        <MButtonText title={"Google"} style={{ color: '#1D92FF', fontWeight: '500' }} />
      </View>

    </MLoginButton>
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