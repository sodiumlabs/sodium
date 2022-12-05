import { StyleSheet, Image, Pressable } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import { showSignModal } from "../base/screenInit";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";

export function SendScreen() {
  return (
    <BaseScreen isHeaderBack >
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

          <MInput />
        </MVStack>


        <MText style={{ marginVertical: 20 }}>To</MText>
        <MInput placeholder="address" />

        <MButton onPress={() => showSignModal(true)} title={"Continue"} styles={{ marginVertical: 20 }} />

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