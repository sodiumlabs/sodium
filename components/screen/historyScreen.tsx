import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { HistoryTime } from "../../lib/common/time";
import { fixWidth } from "../../lib/define";
import { useDimensionSize } from '../../lib/hook/dimension';
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MHStack from "../baseUI/mHStack";
import { MLoading } from "../baseUI/mLoading";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import { ClassifyHistoryItem } from "../item/classifyHistoryItem";
import { RequestTranscation } from "../transcation/requestTranscation";

export function HistoryScreen() {
  const [queryHistory, transHistoryMap, onScroll] = useQueryHistory();
  const dimension = useDimensionSize();

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }} onScroll={onScroll} scrollEventThrottle={50} >
        <MVStack stretchW stretchH style={{ alignItems: 'center' }}>
          <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}>
            {/* <MText style={{ marginTop: 20, marginBottom: 30, fontWeight: '700' }}>Transaction History </MText> */}
            <ScreenTitle title="Transaction History" />
            <RequestTranscation />
            <MHStack style={{ marginTop: 10 }} />
            <ClassifyHistoryItem title={HistoryTime.ToDay} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Week"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["Last Week"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Month"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime["This Year"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime.Other} historyMap={transHistoryMap} />
            {
              queryHistory.isFetching && <MLoading />
            }
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