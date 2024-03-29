import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconLogo } from "../../lib/imageDefine";
import { BaseScreen } from "../base/baseScreen";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import { ScreenTitle } from "../baseUI/screenTitle";
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { UseTopCenterScale } from "../base/scaleInit";

export function AuthCallbackScreen() {
  const dimension = useDimensionSize();
  const topCenterStyle = UseTopCenterScale();
  const [result, setResult] = React.useState<WebBrowser.WebBrowserCompleteAuthSessionResult>();

  React.useEffect(() => {
    const result = WebBrowser.maybeCompleteAuthSession();
    setResult(result);
  }, []);

  const state = React.useMemo(() => {
    if (!result) {
      return "loading"
    } else if (result.type == "failed") {
      return "auth failed " + result.message
    } else {
      return "auth success"
    }
  }, [result])

  return (
    <BaseScreen hasNavigationBar={false} hasFloatingBar={false}>
      <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}  >
            <MImage source={IconLogo} w={30} h={30} style={{ marginBottom: 10 }} />
            <ScreenTitle title={state} />
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