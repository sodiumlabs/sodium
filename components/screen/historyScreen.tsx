import { TransactionHistory } from "@0xsodium/provider";
import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { HistoryTime } from "../../lib/common/time";
import { fixWidth } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ClassifyHistoryItem } from "../item/classifyHistoryItem";
import HistoryItem from "../item/historyItem";
import { RequestTranscation } from "../transcation/requestTranscation";
import { useDimensionSize } from '../../lib/hook/dimension';
import { Spacer } from "../base/spacer";

export function HistoryScreen() {
  const [queryHistory, transHistoryMap, onScroll] = useQueryHistory();
  const dimension = useDimensionSize();

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }} onScroll={onScroll} scrollEventThrottle={50} >
        <MVStack stretchW stretchH style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}>
            <MText style={{ marginVertical: 6 }}>Transaction History </MText>

            <RequestTranscation />

            <ClassifyHistoryItem title={HistoryTime.ToDay} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Week"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["Last Week"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Month"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Year"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime.Other} historyMap={transHistoryMap} />
            <Spacer />
            <Information />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth,

  },
});