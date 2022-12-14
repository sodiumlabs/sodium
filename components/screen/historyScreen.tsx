import { ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from '../../lib/api/history';
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import HistoryItem from "../item/historyItem";
import { RequestTranscation } from "../transcation/requestTranscation";

export function HistoryScreen() {
  const [queryHistory, transcationHistorys, onScroll] = useQueryHistory();
  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }} onScroll={onScroll} scrollEventThrottle={50}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Transaction History </MText>
          <RequestTranscation />

          <MVStack stretchW>
            <MText>Last Week</MText>
            {
              transcationHistorys && transcationHistorys.map((item, index) => {
                return <HistoryItem key={index} history={item} />
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