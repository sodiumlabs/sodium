import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from "react-native";
import { ITranscation } from '../../lib/define';
import { useRequestedTransactions } from "../../lib/transaction";
import { showUpdateTranscationQueueModal } from "../base/modalInit";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import { formatTime2Today, formatTimeYMDHMS } from '../../lib/common/time';


export function RequestTranscation() {
  const requestTranscations = useRequestedTransactions();
  const [lastRequestTxn, setLastRequestTxn] = useState<ITranscation>();
  useEffect(() => {
    if (requestTranscations) {
      setLastRequestTxn(requestTranscations[requestTranscations.length - 1]);
    }
  }, [requestTranscations]);

  if (!requestTranscations || requestTranscations.length <= 0 || !lastRequestTxn) {
    return <></>
  }

  return (
    <Pressable style={{ width: '100%' }} onPress={() => showUpdateTranscationQueueModal(true)}>
      <MHStack stretchW style={styles.transcationQueue}>
        <MHStack style={{ borderRadius: 999, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }}>
          <MText>{requestTranscations.length}</MText>
        </MHStack>
        <MText style={{ flex: 1 }}>Requested Transcations</MText>
        <MText>{formatTime2Today(lastRequestTxn.timeStamp)}</MText>
      </MHStack>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  transcationQueue: {
    backgroundColor: 'rgba(200,200,200,1)',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  }
});