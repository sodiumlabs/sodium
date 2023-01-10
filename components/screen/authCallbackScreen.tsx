import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconLogo } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { ScreenTitle } from "../baseUI/screenTitle";
import * as React from 'react';
export function AuthCallbackScreen() {
  const dimension = useDimensionSize();

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const oauthToken = url.searchParams.get("oauth_token");
    const oauthVerifier = url.searchParams.get("oauth_verifier");
      if (oauthToken && oauthVerifier) {
          window.opener.postMessage({
              target: TWITTER_OAUTH_CALLBACK,
              oauthToken,
              oauthVerifier
          }, window.origin);
          window.close();
      }
  }, [window.location.href]);

  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}  >
            <MImage source={IconLogo} w={30} h={30} style={{ marginBottom: 10 }} />
            <ScreenTitle title="Auth success" />
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