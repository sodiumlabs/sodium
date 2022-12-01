import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import { showTranscationModal } from "../base/screenInit";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import TranscationItem from "../item/transcationItem";

export function HistoryScreen() {
  return (
    <BaseScreen >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>History</MText>
        <MVStack stretchW>
          <MText>Last Week</MText>
          <TranscationItem onPress={() => showTranscationModal(true)} />
        </MVStack>
      </MVStack>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});