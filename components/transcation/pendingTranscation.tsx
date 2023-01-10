import { hashcodeObj } from '../../lib/common/common';
import { eColor } from '../../lib/globalStyles';
import { transactionPending } from '../../lib/transaction/pending';
import MButton from '../baseUI/mButton';
import MLineLR from '../baseUI/mLineLR';
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import PendingItem from '../item/pendingItem';


export function PendingTranscation() {
  const pendingTranscations = transactionPending.usePendingTransactions();

  if (!pendingTranscations || pendingTranscations.length <= 0) {
    return <></>
  }

  const removeAllClick = () => {
    transactionPending.removeAll();
  }

  return (
    <MVStack stretchW style={{ marginBottom: 20 }} >
      <MText style={{ marginTop: 30, marginBottom: 15, color: eColor.GrayContentText }}>Pending Transcations</MText>
      {
        pendingTranscations.map((tx, index) => {
          // if (!tx.decodeDatas.some(tx => !!tx.decodeTransferData)) return <></>
          return (
            <PendingItem key={hashcodeObj(tx) + index} data={tx} />
          )
        })
      }

      <MLineLR right={
        <MButton onPress={removeAllClick} style={[{ marginRight: 2, borderRadius: 15, height: 20, backgroundColor: eColor.GrayWhite }]} >
          <MText style={{ color: eColor.GrayContentText }} fontSize={10}  >Clear All</MText>
        </MButton>} />
    </MVStack>
  )
}
