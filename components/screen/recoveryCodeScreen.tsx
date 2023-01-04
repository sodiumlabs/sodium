
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
import MHStack from '../baseUI/mHStack';
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function RecoveryCodeScreen() {
  // const auth = useAuth();
  const dimension = useDimensionSize();
  const [isNewRecoveryCode, setIsNewRecoveryCode] = useState<boolean>(false);
  const generateClick = () => {
    setIsNewRecoveryCode(true);
  }
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={{ alignItems: 'center' }}>
            <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
              <MText style={{ marginVertical: 6 }}>Recovery Code</MText>
              <MVStack>
                <MText>Two-factor recovery codes</MText>
                <MText numberOfLines={null}>Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.</MText>
                <Divider />

                <MVStack style={{ borderWidth: 1, borderRadius: 5 }}>
                  <MText>Recovery code</MText>
                  <MText numberOfLines={null}>Keep your recovery codes as safe as your password. We recommend saving them with a password manager such as Lastpass, 1Password, or Keeper.</MText>

                  {
                    !isNewRecoveryCode && (
                      <MHStack style={{ backgroundColor: 'rgba(255,255,100,1)' }}>
                        <MText numberOfLines={null}> Keep your recovery codes in a safe spot. These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you will lose access to your account.</MText>
                      </MHStack>
                    )
                  }
                  {
                    isNewRecoveryCode && (
                      <MHStack style={{ backgroundColor: 'rgba(100,255,100,1)' }}>
                        <MText numberOfLines={null}>These new codes have replaced your old codes. Save them in a safe spot. These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you will lose access to your account.</MText>
                      </MHStack>
                    )
                  }
                  <MVStack style={{ paddingHorizontal: 40 }} >
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                    <MLineLR left={<MText>06f49-01c5x</MText>} right={<MText>77670-2e15d</MText>} />
                  </MVStack>

                  <MHStack style={{ paddingHorizontal: 40 }}>
                    <MLineLR
                      left={<MButton><MText>Download</MText></MButton>}
                      right={<MButton  ><MText>Copy</MText></MButton>} />
                  </MHStack>

                  <MText>Generate new recovery codes</MText>
                  <MText numberOfLines={null}>When you generate new recovery codes, you must download or print the new codes. Your old codes won't work anymore.</MText>
                  <MButton onPress={generateClick} >
                    <MText>Generate new recovery codes</MText>
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