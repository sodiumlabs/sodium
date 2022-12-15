import { TransactionHistory } from "@0xsodium/provider";
import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ClassifyHistoryItem } from "../item/classifyHistoryItem";
import HistoryItem from "../item/historyItem";
import { RequestTranscation } from "../transcation/requestTranscation";

export function HistoryScreen() {
  const [queryHistory, transHistoryMap, onScroll] = useQueryHistory();

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }} onScroll={onScroll} scrollEventThrottle={50}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Transaction History </MText>
          <RequestTranscation />

          <ClassifyHistoryItem title="Today" historyMap={transHistoryMap} />
          <ClassifyHistoryItem title="This Week" historyMap={transHistoryMap} />
          <ClassifyHistoryItem title="Last Week" historyMap={transHistoryMap} />
          <ClassifyHistoryItem title="This Month" historyMap={transHistoryMap} />
          <ClassifyHistoryItem title="This Year" historyMap={transHistoryMap} />
          <ClassifyHistoryItem title="Other" historyMap={transHistoryMap} />

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