import { Pressable, StyleSheet } from "react-native";
import { useRequestedTransactions } from "../../lib/transaction";
import { showTranscationQueueModal } from "../base/modalInit";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";


export function RequestTranscationItem() {
  const requestTranscations = useRequestedTransactions();

  if (!requestTranscations || requestTranscations.length <= 0) {
    return <></>
  }
  return (
    <Pressable style={{ width: '100%' }} onPress={() => showTranscationQueueModal(true)}>
      <MHStack stretchW style={styles.transcationQueue}>
        <MHStack style={{ borderRadius: 999, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }}>
          <MText>5</MText>
        </MHStack>
        <MText style={{ flex: 1 }}>Requested Transcations</MText>
        <MText>14 hours ago</MText>
      </MHStack>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  transcationQueue: {
    backgroundColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
  }
});