import { Divider } from "@ui-kitten/components";
import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from '../../lib/data/auth';
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function SetupAuthScreen() {
  const auth = useAuth();
  return (
    <BaseScreen isNavigationBarBack >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Reconfigure two-factor authentication (2FA)</MText>

          <MHStack stretchW style={{ justifyContent: 'space-evenly' }}>
            <MText>1</MText>
            <MText>2</MText>
            <MText>3</MText>
          </MHStack>

          <MVStack stretchW style={{ backgroundColor: 'white' }}>
            <MText>Setup authenticator app</MText>
            <MText>Use a phone app like 1Password, Authy, LastPass Authenticator, or Microsoft Authenticator, etc. to get 2FA codes when prompted during sign-in.</MText>
            <MText>Scan the QR code</MText>
            <MText>Use an authenticator app from your phone to scan. If you are unable to scan,  instead. Learn more.</MText>
            <MText>Verify the code from the app</MText>
            <MInput />
            <Divider />
            <MLineLR left={<></>} right={<MHStack><MButton title={"continue"} /></MHStack>} />
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