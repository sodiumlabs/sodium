import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from "react-native";
import { formatTime2Today } from '../../lib/common/time';
import { ITranscation } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useRequestedTransactions } from "../../lib/transaction";
import { showUpdateTranscationQueueModal } from "../base/modalInit";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";


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
      <MHStack stretchW style={[styles.transcationQueue, globalStyle.whiteBorderWidth]}>
        <MHStack style={{ borderRadius: 20, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#bbb' }}>
          <MText style={{ color: '#ffffff', fontWeight: '700' }}>{requestTranscations.length}</MText>
        </MHStack>
        <MText style={{ flex: 1, marginLeft: 5, fontWeight: '700' }}>Requested Transcations...</MText>
        <MText style={{ color: eColor.GrayText }}>{formatTime2Today(lastRequestTxn.timeStamp)}</MText>
      </MHStack>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  transcationQueue: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center'
  }
});