import { hashcodeObj } from '../../lib/common/common';
import { eColor } from '../../lib/globalStyles';
import { usePendingTransactions } from '../../lib/transaction/pending';
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import PendingItem from '../item/pendingItem';


export function PendingTranscation() {
  const pendingTranscations = usePendingTransactions();

  if (!pendingTranscations || pendingTranscations.length <= 0) {
    return <></>
  }

  return (
    <MVStack stretchW style={{ marginBottom: 10 }} >
      <MText style={{ marginTop: 30, marginBottom: 15, color: eColor.GrayContentText }}>Pending Transcations</MText>
      {
        pendingTranscations.map((tx, index) => {
          return (
            <PendingItem key={hashcodeObj(tx) + index} data={tx} />
          )
        })
      }
    </MVStack>
  )
}
