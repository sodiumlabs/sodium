
import { useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../../lib/define";
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { CodeItemText } from "../item/codeItemText";
import { UseTopCenterScale } from '../base/scaleInit';

export function RecoveryCodeScreen() {
  // const auth = useAuth();
  const dimension = useDimensionSize();
  const topCenterStyle = UseTopCenterScale();
  const [isNewRecoveryCode, setIsNewRecoveryCode] = useState<boolean>(false);
  const generateClick = () => {
    setIsNewRecoveryCode(true);
  }
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={{ alignItems: 'center' }}>
            <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}>
              <ScreenTitle title="Recovery Code" />
              <MVStack>
                <MText style={{ marginBottom: 5 }}>Two-factor recovery codes</MText>
                <MText style={{ color: eColor.GrayContentText }} numberOfLines={null}>Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.</MText>
                {/* <MDivider style={{ marginVertical: 10 }} /> */}

                <MVStack style={[{ padding: 15, marginTop: 20 }, globalStyle.whiteBorderWidth]}>
                  <MText style={{ marginBottom: 5 }}>Recovery code</MText>
                  <MText style={{ color: eColor.GrayContentText, marginBottom: 10 }} numberOfLines={null}>Keep your recovery codes as safe as your password. We recommend saving them with a password manager such as Lastpass, 1Password, or Keeper.</MText>

                  {
                    !isNewRecoveryCode && (
                      <MHStack style={{ backgroundColor: 'rgba(255,255,100,1)', marginBottom: 10, borderRadius: 6, padding: 10 }}>
                        <MText numberOfLines={null}> Keep your recovery codes in a safe spot. These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you will lose access to your account.</MText>
                      </MHStack>
                    )
                  }
                  {
                    isNewRecoveryCode && (
                      <MHStack style={{ backgroundColor: 'rgba(100,255,100,1)', marginBottom: 10, borderRadius: 6, padding: 10 }}>
                        <MText numberOfLines={null}>These new codes have replaced your old codes. Save them in a safe spot. These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you will lose access to your account.</MText>
                      </MHStack>
                    )
                  }
                  <MVStack style={{ paddingHorizontal: 100 }} >
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                  </MVStack>

                  <MHStack style={{ marginTop: 20 }}>
                    <MLineLR
                      left={null}
                      right={
                        <>
                          <MButton  ><MButtonText title="Copy" /></MButton>
                          <MButton style={{ marginLeft: 10 }} ><MButtonText title="Download" /></MButton>
                        </>
                      } />
                  </MHStack>

                  <MText style={{ marginVertical: 10 }}>Generate new recovery codes</MText>
                  <MText numberOfLines={null} style={{ color: eColor.GrayContentText, marginBottom: 20 }}>When you generate new recovery codes, you must download or print the new codes. Your old codes won't work anymore.</MText>
                  <MButton onPress={generateClick} >
                    <MButtonText title="Generate new recovery codes" />
                  </MButton>

                </MVStack>
              </MVStack>
              <Spacer />
              <Information />
            </MVStack>
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 10,
    width: '100%'
  },
  container: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});