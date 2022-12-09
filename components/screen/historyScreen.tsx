import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { BaseScreen } from "../base/baseScreen";
import { showTranscationDetailModal } from "../base/modalInit";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import HistoryItem from "../item/historyItem";
import { getScroller } from '../../lib/common/scroller';
import { TransactionHistory } from "@0xsodium/provider";
import { getPageDatas } from "../../lib/common/common";

export function HistoryScreen() {
  const queryHistory = useQueryHistory();
  let transcationHistorys: TransactionHistory[] = null;
  if (queryHistory.isSuccess) {
    transcationHistorys = getPageDatas(queryHistory.data);
  }

  const onScroll = getScroller(() => !queryHistory.isLoading && queryHistory.hasNextPage && queryHistory.fetchNextPage());

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }} onScroll={onScroll} scrollEventThrottle={50}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>History</MText>
          {/* <RequestTranscationItem /> */}

          <MVStack stretchW>
            <MText>Last Week</MText>
            {
              transcationHistorys && transcationHistorys.map((item, index) => {
                return <HistoryItem key={index} onPress={() => showTranscationDetailModal(true)} />
              })
            }

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