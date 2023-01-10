import { useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { downText } from '../../lib/common/common';
import { fixWidth } from "../../lib/define";
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import { MDivider } from "../baseUI/mDivider";
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { CodeItemText } from "../item/codeItemText";

export function SetupAuthScreen() {
  // const auth = useAuth();
  const dimension = useDimensionSize();
  const [step, setStep] = useState<number>(1);
  const [authCode, setAuthCode] = useState<string>('');

  const onInputAuthCode = (text: string) => {
    const value = text.replace(/[^\d]/g, '');
    setAuthCode(value);
  }

  const onDownCodeClick = () => {
    downText("77670-2e15d 77670-2e15d 77670-2e15d 77670-2e15d");
  }

  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Reconfigure two-factor authentication (2FA)" />
            <MHStack stretchW style={{ justifyContent: 'space-evenly', marginBottom: 20 }}>
              <StepItem step={1} isSelected={1 <= step} />
              <StepItem step={2} isSelected={2 <= step} />
              <StepItem step={3} isSelected={3 <= step} />
            </MHStack>

            {
              step == 1 && (
                <MVStack stretchW style={[{ backgroundColor: 'white', padding: 15 }, globalStyle.whiteBorderWidth]}>
                  <MText style={{ marginBottom: 6 }} >Setup authenticator app</MText>
                  <MText style={{ color: eColor.GrayContentText, marginBottom: 12, textAlign: 'left' }} numberOfLines={undefined}>Use a phone app like 1Password, Authy, LastPass Authenticator, or Microsoft Authenticator, etc. to get 2FA codes when prompted during sign-in.</MText>
                  <MText style={{ marginBottom: 6 }} >Scan the QR code</MText>
                  <MText style={{ color: eColor.GrayContentText, marginBottom: 12 }}>Use an authenticator app from your phone to scan. If you are unable to scan,  instead. Learn more.</MText>
                  <MText style={{ marginBottom: 10 }}>Verify the code from the app</MText>
                  <MInput placeholder="Authenticator code" placeholderTextColor={eColor.GrayText}
                    value={authCode} onChangeText={onInputAuthCode} />
                  {/* <MDivider style={{ marginVertical: 10 }} /> */}
                  <MLineLR
                    style={{ marginTop: 10 }}
                    right={
                      <MHStack>
                        <MButton onPress={() => setStep(2)} isBanHover={!authCode} style={{ backgroundColor: !!authCode ? eColor.Blue : eColor.Black }} >
                          <MButtonText title="Continue" />
                        </MButton>
                      </MHStack>
                    } />
                </MVStack>
              )
            }

            {
              step == 2 && (
                <MVStack stretchW style={[{ backgroundColor: 'white', padding: 15 }, globalStyle.whiteBorderWidth]}>
                  <MText style={{ marginBottom: 6 }}>Download your recovery codes </MText>
                  <MText numberOfLines={null} style={{ color: eColor.GrayContentText, marginBottom: 12 }}>
                    You can use recovery codes as a second factor to authenticate in case you lose access to your device. We recommend saving them with a secure password manager such as Lastpass, 1Password, or Keeper.
                  </MText>
                  <MVStack>
                    <MText style={{ marginBottom: 6 }}>Keep your recovery codes in a safe spot </MText>
                    <MText style={{ color: eColor.GrayContentText, marginBottom: 12 }}>If you lose your device and can't find your recovery codes, you will lose access to your account. </MText>
                  </MVStack>
                  <MVStack style={{ paddingHorizontal: 100 }} >
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                    <MLineLR left={<CodeItemText title="77670-2e15d" />} right={<CodeItemText title="77670-2e15d" />} />
                  </MVStack>

                  <MLineLR
                    style={{ marginTop: 20 }}
                    right={
                      <MHStack>
                        <MButton style={{ backgroundColor: eColor.Blue }} onPress={onDownCodeClick} >
                          <MButtonText title="Download" />
                        </MButton>
                      </MHStack>
                    } />
                  <MDivider style={{ marginVertical: 15 }} />
                  <MLineLR right={
                    <MHStack>
                      <MButton onPress={() => setStep(3)} style={{ backgroundColor: eColor.Blue }}>
                        <MButtonText title="I have saved my recovery codes" />
                      </MButton>
                    </MHStack>
                  } />
                </MVStack>
              )
            }
            {
              step == 3 && (
                <MVStack stretchW style={[{ backgroundColor: 'white', alignItems: 'center', padding: 15 }, globalStyle.whiteBorderWidth]}>
                  <MText style={{ color: eColor.GrayContentText }} >Finish </MText>
                </MVStack>
              )
            }
            <Spacer />
            <Information />

          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}

function StepItem(props: { step: number, isSelected: boolean }) {
  const { step, isSelected } = props;
  return (
    <MHStack style={{ backgroundColor: isSelected ? eColor.Blue : 'white', borderWidth: 1, borderColor: eColor.Blue, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
      <MText style={{ color: isSelected ? "#ffffff" : eColor.Blue, fontWeight: '700' }}>{step}</MText>
    </MHStack>
  )
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