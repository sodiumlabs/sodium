import { Divider } from "@ui-kitten/components";
import { useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from '../../lib/data/auth';
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import { MDivider } from "../baseUI/mDivider";
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";

export function SetupAuthScreen() {
  // const auth = useAuth();
  const dimension = useDimensionSize();
  const [step, setStep] = useState<number>(1);
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Reconfigure two-factor authentication (2FA)" />
            <MHStack stretchW style={{ justifyContent: 'space-evenly' }}>
              <StepItem step={1} isSelected={1 <= step} />
              <StepItem step={2} isSelected={2 <= step} />
              <StepItem step={3} isSelected={3 <= step} />
            </MHStack>

            {
              step == 1 && (
                <MVStack stretchW style={{ backgroundColor: 'white' }}>
                  <MText>Setup authenticator app</MText>
                  <MText>Use a phone app like 1Password, Authy, LastPass Authenticator, or Microsoft Authenticator, etc. to get 2FA codes when prompted during sign-in.</MText>
                  <MText>Scan the QR code</MText>
                  <MText>Use an authenticator app from your phone to scan. If you are unable to scan,  instead. Learn more.</MText>
                  <MText>Verify the code from the app</MText>
                  <MInput />
                  <MDivider style={{ marginVertical: 10 }} />
                  <MLineLR right={
                    <MHStack>
                      <MButton onPress={() => setStep(2)} >
                        <MText>continue</MText>
                      </MButton>
                    </MHStack>
                  } />
                </MVStack>
              )
            }

            {
              step == 2 && (
                <MVStack stretchW style={{ backgroundColor: 'white' }}>
                  <MText>Download your recovery codes </MText>
                  <MText numberOfLines={null}>You can use recovery codes as a second factor to authenticate in case you lose access to your device. We recommend saving them with a secure password manager such as Lastpass, 1Password, or Keeper.                </MText>
                  <MVStack style={{ backgroundColor: 'rgba(200,200,200,0.5)' }}>
                    <MText>Keep your recovery codes in a safe spot </MText>
                    <MText>If you lose your device and can't find your recovery codes, you will lose access to your account. </MText>
                  </MVStack>
                  <MVStack style={{ paddingHorizontal: 40 }} >
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                  </MVStack>

                  <MLineLR right={
                    <MHStack>
                      <MButton  >
                        <MText>download</MText>
                      </MButton>
                    </MHStack>
                  } />
                  <MDivider style={{ marginVertical: 10 }} />
                  <MLineLR right={
                    <MHStack>
                      <MButton onPress={() => setStep(3)} >
                        <MText>I have saved my recovery codes</MText>
                      </MButton>
                    </MHStack>
                  } />
                </MVStack>
              )
            }
            {
              step == 3 && (
                <MVStack stretchW style={{ backgroundColor: 'white', alignItems: 'center' }}>
                  <MText>Finish </MText>
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
    <MHStack style={{ backgroundColor: isSelected ? 'blue' : 'white', borderWidth: 1, borderColor: 'blue', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
      <MText>{step}</MText>
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