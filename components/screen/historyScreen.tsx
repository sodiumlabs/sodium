import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { BaseScreen } from "../base/baseScreen";
import { showTranscationDetailModal } from "../base/modalInit";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import HistoryItem from "../item/historyItem";

export function HistoryScreen() {
  const queryHistory = useQueryHistory();

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>History</MText>
          {/* <RequestTranscationItem /> */}

          <MVStack stretchW>
            <MText>Last Week</MText>
            <HistoryItem onPress={() => showTranscationDetailModal(true)} />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
});