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
import { useStore } from '@nanostores/react';
import { currentChainIdAtom } from '../../lib/network';

export function HistoryScreen() {
  const chainId = useStore(currentChainIdAtom);
  const [queryHistory, transHistoryMap, onScroll] = useQueryHistory(chainId);
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
            <ClassifyHistoryItem title={HistoryTime["Last Year"]} historyMap={transHistoryMap} />
            <ClassifyHistoryItem title={HistoryTime.Other} historyMap={transHistoryMap} />
            {
              queryHistory.isFetching && <MLoading />
            }
            <MHStack style={{ marginBottom: 50 }} />
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