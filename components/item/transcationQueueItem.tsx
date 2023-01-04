



import { TransactionRequest } from '@0xsodium/transactions';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { decodeTransactionRequest } from '../../lib/common/decode';
import { IDecodeTranscation, ITranscation } from '../../lib/define';
import { useNavigation } from '../../lib/navigation';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import { useAuth } from '../../lib/data/auth';
import { transactionQueue } from '../../lib/transaction';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { showUpdateTranscationQueueModal, showUpdateSignTranscationModal } from '../base/modalInit';
import { OperateTimeStamp } from '../../lib/data/operateTime';
import { eColor } from '../../lib/globalStyles';

export default function TranscationQueueItem(props: { transcation: ITranscation }) {
  const { transcation } = props;
  // const [decodeDatas, setDecodeDatas] = useState<IDecodeTranscation[]>();
  const [decodeData, setDecodeData] = useState<IDecodeTranscation>();
  const auth = useAuth();
  useEffect(() => {
    const func = async () => {
      const decodeDatas = await decodeTransactionRequest(transcation.txReq, auth.web3signer);
      // setDecodeDatas(decodeResult);
      setDecodeData(decodeDatas[0]);
    }
    func();
  }, [transcation.txReq]);

  const rejectClick = () => {
    transactionQueue.removeByTxn(transcation);
  }
  const itemClick = useCallback(async () => {
    if (auth.isLogin) {
      showUpdateTranscationQueueModal(false);
      showUpdateSignTranscationModal(true, null);

      OperateTimeStamp.set(transcation.timeStamp);
      transactionQueue.removeByTxn(transcation);
      const txr = await auth.web3signer.sendTransaction(transcation.txReq);
      await txr.wait();
    }
  }, [auth])

  return (
    <Pressable>
      <MHStack style={styles.container} stretchW>
        <Pressable style={{ flex: 1 }} onPress={itemClick}>
          <MHStack style={styles.pre} >
            <MText>Send tokens</MText>
            <MImage size={16} />
            <MText style={{ flex: 1 }}>{decodeData?.decodeTransferData?.token?.name}</MText>
            <MText >{formatTimeYMDHMS(transcation.timeStamp)}</MText>
          </MHStack>
        </Pressable>

        <Pressable onPress={rejectClick}>
          <MHStack style={styles.reject}>
            {/* <MImage size={16} /> */}
            <MText style={{ color: eColor.GrayContentText }} >x</MText>
          </MHStack>
        </Pressable>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  pre: {
    flex: 1,
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: eColor.Border,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  reject: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    padding: 15,
    marginBottom: 12,
    backgroundColor: 'rgba(1,1,1,0.1)',
    borderWidth: 1,
    borderColor: eColor.Border,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});
