import { hashcodeObj } from '../../lib/common/common';
import { eColor } from '../../lib/globalStyles';
import { usePendingTransactions } from '../../lib/transaction/pending';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import PendingItem from '../item/pendingItem';
import { useRequestedTransactions } from '../../lib/transaction/queue';


export function PendingTranscation() {
  // const pendingTranscations = useRequestedTransactions();
  const pendingTranscations = usePendingTransactions();

  if (!pendingTranscations || pendingTranscations.length <= 0) {
    return <></>
  }

  return (
    <MVStack stretchW style={{ marginBottom: 10 }} >
      <MText style={{ marginTop: 30, marginBottom: 15, color: eColor.GrayContentText }}>Pending Transcations</MText>
      {
        pendingTranscations.map((tx, index) => {
          // if (!tx.decodeDatas.some(tx => !!tx.decodeTransferData)) return <></>
          return (
            <PendingItem key={hashcodeObj(tx) + index} data={tx} />
          )
        })
      }

      <MButton>
        <MButtonText title='Clear All' />
      </MButton>
    </MVStack>
  )
}
