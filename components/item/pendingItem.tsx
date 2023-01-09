



import { BigNumber } from "@ethersproject/bignumber";
import { Linking, StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { getTranscationExplorer } from "../../lib/common/network";
import { formatTime2Today } from '../../lib/common/time';
import { useAuth } from '../../lib/data/auth';
import { ITranscation } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { IconForkClose, IconShare, IconTokenDefault } from '../../lib/imageDefine';
import { transactionPending } from '../../lib/transaction/pending';
import MAvatar from '../baseUI/mAvatar';
import MButton from "../baseUI/mButton";
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import { MLoading } from '../baseUI/mLoading';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';


export default function PendingItem(props: TextInputProps & { data: ITranscation }) {
  const { data, style, ...reset } = props;

  const decodeTransferData = data?.decodeDatas?.find((decodeTxn) => !!decodeTxn.decodeTransferData);
  const transferToken = decodeTransferData?.decodeTransferData?.token;
  const transferTokenAmount = decodeTransferData?.decodeTransferData?.amount;
  const tokenAmount = BigNumber.from(transferTokenAmount['_hex'] || transferTokenAmount['hex'])

  const auth = useAuth();
  const linkTxHash = async () => {
    const chainId = await auth.signer.getChainId();
    const url = getTranscationExplorer(chainId, data.txHash);
    Linking.openURL(url);
  }
  const closePendingClick = () => {
    transactionPending.removeByTxn(data);
  }


  if (!decodeTransferData) return <></>

  return (
    <MVStack stretchW style={[styles.container, globalStyle.whiteBorderWidth]}>
      <MLineLR
        style={{ marginBottom: 20 }}
        left={
          <>
            <MLoading />
            <MText style={{ marginLeft: 10, color: eColor.Blue, fontWeight: '700' }} >Send tokens...</MText>
          </>
        }
        right={
          <>
            <MText style={{ color: eColor.GrayText }} >{formatTime2Today(data.timeStamp)}</MText>
            <MButton style={{ marginLeft: 5, height: 20, width: 20, borderRadius: 20, backgroundColor: eColor.GrayWhite }} onPress={linkTxHash}  >
              <MImage style={{ opacity: 0.6 }} w={10} h={10} source={IconShare} />
            </MButton>
            <MButton style={{ marginLeft: 5, height: 20, width: 20, borderRadius: 20, backgroundColor: eColor.GrayWhite }} onPress={closePendingClick}  >
              <MImage style={{ opacity: 0.6 }} w={10} h={10} source={IconForkClose} />
            </MButton>
          </>
        } />

      < MLineLR
        left={
          < MHStack style={{ alignItems: 'center' }} >
            <MImage w={20} h={20} uri={null} source={IconTokenDefault} />
            <MText style={{ marginLeft: 6, fontWeight: '700' }} >{transferToken.symbol}</MText>
          </MHStack >
        }
        right={< MText style={{ color: eColor.GrayContentText }} > {formatWei2Price(tokenAmount.toString(), transferToken.decimals)} {transferToken.symbol}</MText >} />

      < MDivider style={{ marginVertical: 10 }} />


      < MText style={{ marginBottom: 10 }} > Network Fee</MText >
      <MLineLR
        left={
          <MHStack style={{ alignItems: 'center' }}>
            <MImage w={20} h={20} uri={null} source={IconTokenDefault} />
            <MText style={{ marginLeft: 6, fontWeight: '700' }}>PLOYGON Matic</MText>
          </MHStack>
        }
        right={<MText style={{ color: eColor.GrayContentText }}>-0.001 Matic</MText>} />

      <MDivider style={{ marginVertical: 10 }} />

      <MText style={{ marginBottom: 10 }} >To Recipient</MText>
      <MHStack style={{ alignItems: 'center' }}>
        <MAvatar name={'test'} />
        <MText style={{ color: eColor.GrayContentText, marginLeft: 6 }}>{decodeTransferData.decodeTransferData.to}</MText>
      </MHStack>

    </MVStack >
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    padding: 15,
    paddingBottom: 20,
    marginBottom: 10,
  }
});
