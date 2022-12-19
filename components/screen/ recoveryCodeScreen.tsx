
import { Divider } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from '../../lib/data/auth';
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import MHStack from '../baseUI/mHStack';
import MLineLR from "../baseUI/mLineLR";
import MButton from "../baseUI/mButton";
import { useState } from 'react';

export function RecoveryCodeScreen() {
  const auth = useAuth();
  const [isNewRecoveryCode, setIsNewRecoveryCode] = useState<boolean>(false);
  const generateClick = () => {
    setIsNewRecoveryCode(true);
  }
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
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
                <MLineLR left={<MButton title={"Download"} />} right={<MButton title={"Copy"} />} />
              </MHStack>

              <MText>Generate new recovery codes</MText>
              <MText numberOfLines={null}>When you generate new recovery codes, you must download or print the new codes. Your old codes won't work anymore.</MText>
              <MButton title={"Generate new recovery codes"} onPress={generateClick} />

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
    borderRadius: 15,
    width: '100%'
  },
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
});