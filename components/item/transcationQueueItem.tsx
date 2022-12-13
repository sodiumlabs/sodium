



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
import { updateOperateTimeStamp } from '../../lib/data/global';
import { formatTimeYMDHMS } from '../../lib/common/time';

export default function TranscationQueueItem(props: { onPress: () => void, transcation: ITranscation }) {
  const { onPress, transcation } = props;
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
      updateOperateTimeStamp(transcation.timeStamp);
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
            <MText style={{ flex: 1 }}>{decodeData?.decodeTransfer?.token?.name}</MText>
            <MText >{formatTimeYMDHMS(transcation.timeStamp)}</MText>
          </MHStack>
        </Pressable>

        <Pressable onPress={rejectClick}>
          <MHStack style={styles.reject}>
            <MImage size={16} />
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
    backgroundColor: '#666',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  reject: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  }
});
