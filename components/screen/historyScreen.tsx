import { TransactionHistory } from "@0xsodium/provider";
import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { HistoryTime } from "../../lib/common/time";
import { fixWidth } from "../../lib/define";
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
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={styles.container}>
            <MText style={{ marginVertical: 6 }}>Transaction History </MText>
            <RequestTranscation />

            <ClassifyHistoryItem title={HistoryTime.ToDay} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Week"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["Last Week"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Month"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Year"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime.Other} historyMap={transHistoryMap} />

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
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});