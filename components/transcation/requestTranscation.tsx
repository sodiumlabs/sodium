import { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { formatTime2Today } from '../../lib/common/time';
import { showUpdateTranscationQueueModal } from "../../lib/data/modal";
import { ITranscation } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useRequestedTransactions } from "../../lib/transaction";
import { CircleTip } from '../baseUI/circleTip';
import MHStack from "../baseUI/mHStack";
import MPressable from '../baseUI/mPressable';
import MText from "../baseUI/mText";


export function RequestTranscation() {
  const requestTranscations = useRequestedTransactions();
  const [lastRequestTxn, setLastRequestTxn] = useState<ITranscation>();
  const [isItemHovered, setIsItemHovered] = useState(false);
  useEffect(() => {
    if (requestTranscations) {
      setLastRequestTxn(requestTranscations[requestTranscations.length - 1]);
    }
  }, [requestTranscations]);

  if (!requestTranscations || requestTranscations.length <= 0 || !lastRequestTxn) {
    return <></>
  }


  return (
    <MPressable
      style={{ width: '100%' }}
      onPress={() => showUpdateTranscationQueueModal(true)}
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}>
      <MHStack stretchW style={[styles.transcationQueue, globalStyle.whiteBorderWidth, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]}>

        <CircleTip num={requestTranscations.length + ''} fontSize={8} />
        <MText style={{ flex: 1, marginLeft: 5, fontWeight: '700' }}>Requested Transactions...</MText>
        <MText style={{ color: eColor.GrayText }}>{formatTime2Today(lastRequestTxn.timeStamp)}</MText>
      </MHStack>
    </MPressable>
  )
}


const styles = StyleSheet.create({
  transcationQueue: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center'
  }
});