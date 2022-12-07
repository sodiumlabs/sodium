import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import { showSignTranscationModal } from "../base/modalInit";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { useAuth, } from '../../lib/data/auth';
import { MDropdown } from "../baseUI/mDropdown";

export function SendScreen() {
  const authData = useAuth();

  const sendNativeToken = () => {
    if (authData.isLogin) {
    }
  }

  return (
    <BaseScreen isNavigationBarBack >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>Send</MText>
        <MVStack style={styles.send} stretchW>
          <MHStack style={styles.sendCoin} stretchW>
            <MImage size={32} />
            <MVStack style={{ flex: 1 }}>
              <MHStack style={{ flex: 1 }}>
                <MText>USDC</MText>
                <MImage size={12} />
                <MText>POLYGON</MText>
              </MHStack>
              <MHStack style={{ flex: 1 }}>
                <MText>0.02223</MText>
                <MText> MATIC</MText>
                <MText> $1.8</MText>
              </MHStack>
            </MVStack>
          </MHStack>
          <MDropdown options={["usdc", "meld"]} />
          <MInput />
        </MVStack>
        <MText style={{ marginVertical: 20 }}>To</MText>
        <MInput placeholder="address" />
        <MButton onPress={() => showSignTranscationModal(true)} title={"Continue"} style={{ marginVertical: 20 }} />
      </MVStack>

    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  send: {
    padding: 15,
    backgroundColor: '#666',
    borderRadius: 15
  },
  sendCoin: {
    paddingHorizontal: 15,
    marginBottom: 12
  }
});