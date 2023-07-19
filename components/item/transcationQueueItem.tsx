import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useAuth } from '../../lib/data/authAtom';
import { OperateTimeStamp } from '../../lib/data/operateTime';
import { IDecodeTranscation, ITranscation } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { IconForkClose } from '../../lib/imageDefine';
import { transactionQueue } from '../../lib/transaction';
import { showUpdateSignTranscationModal } from '../../lib/data/modal';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import { MLoading } from '../baseUI/mLoading';
import MText from '../baseUI/mText';
import { waitTime } from '../../lib/common/common';
import { Logger } from '../../lib/common/utils';
import { flattenAuxTransactions, Transaction, Transactionish } from "@0xsodium/transactions";

export default function TranscationQueueItem(props: { transcation: ITranscation, hideModal: (immediately?: boolean) => void }) {
  const { transcation, hideModal } = props;
  // const [decodeDatas, setDecodeDatas] = useState<IDecodeTranscation[]>();
  const [decodeData, setDecodeData] = useState<IDecodeTranscation>();
  const [isRejectHovered, setIsRejectHovered] = useState(false);
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [txnType, setTxnType] = useState<string>();
  const auth = useAuth();
  useEffect(() => {
    const func = async () => {
      // const decodeDatas = await decodeTransactionRequest(transcation.txReq, auth.web3signer);
      const decodeDatas = transcation.decodeDatas;
      // setDecodeDatas(decodeResult);
      setDecodeData(decodeDatas[0]);
      if (decodeDatas.findIndex(decode => !!decode.decodeTransferData) != -1) {
        setTxnType("Send tokens");
        return;
      }

      const decodeApproveData = decodeDatas.find(decode => !!decode.decodeApproveData);
      if (decodeApproveData) {
        Logger.debug(decodeApproveData.decodeApproveData)
        const amount = decodeApproveData.decodeApproveData.amount;
        // Possible recovery from localstore,the data structure may be different
        if (parseInt(amount['hex'] || amount['_hex']) == 0) {
          setTxnType("Revoke Approve tokens");
        }
        else {
          setTxnType("Approve tokens");
        }
        return;
      }
    }


    func();
  }, [transcation.txReq]);

  const rejectClick = () => {
    transactionQueue.removeByTxn(transcation);
  }
  const itemClick = useCallback(async () => {
    if (auth.isLogin) {

      if (Platform.OS == 'ios') {
        hideModal(true);
        await waitTime(1);
      } else {
        hideModal(false);
      }
      showUpdateSignTranscationModal(true, null);

      OperateTimeStamp.set(transcation.timeStamp);
      transactionQueue.removeByTxn(transcation);

      auth.web3signer.sendTransactionBatch(flattenAuxTransactions(transcation.txReq));
    }
  }, [auth, hideModal])

  return (
    <MHStack style={styles.container} stretchW>
      <Pressable onPress={itemClick} style={{ flex: 1, }}
        onHoverIn={() => setIsItemHovered(true)}
        onHoverOut={() => setIsItemHovered(false)}>
        <MHStack style={[styles.pre, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]} >
          {
            !txnType && <MLoading />
          }
          <MText style={{ flex: 1, fontWeight: '700' }}>{txnType}</MText>
          {/* <MImage size={16} /> */}
          {/* <MText style={{ flex: 1 }}>{decodeData?.decodeTransferData?.token?.name}</MText> */}
          <MText style={{ color: eColor.GrayContentText }} >{formatTimeYMDHMS(transcation.timeStamp)}</MText>
        </MHStack>
      </Pressable>

      <Pressable onPress={rejectClick}
        onHoverIn={() => setIsRejectHovered(true)}
        onHoverOut={() => setIsRejectHovered(false)}>
        <MHStack style={[styles.reject, { backgroundColor: isRejectHovered ? eColor.Red : 'rgba(1,1,1,0.1)' }]}>
          <MImage w={16} h={16} source={IconForkClose} style={{ opacity: 0.5 }} />
          {/* <MText style={{ color: eColor.GrayContentText }} >x</MText> */}
        </MHStack>
      </Pressable>
    </MHStack>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  pre: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
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
    width: 50,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 12,
    // backgroundColor: 'rgba(1,1,1,0.1)',
    borderWidth: 1,
    borderColor: eColor.Border,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});
