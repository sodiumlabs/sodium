import { StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import { showTranscationDetailModal } from "../base/modalInit";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import HistoryItem from "../item/historyItem";
import { RequestTranscationItem } from "../item/requestTranscationItem";

export function HistoryScreen() {
  return (
    <BaseScreen >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>History</MText>
        <RequestTranscationItem />

        <MVStack stretchW>
          <MText>Last Week</MText>
          <HistoryItem onPress={() => showTranscationDetailModal(true)} />
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