import { Linking, ScrollView, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { TransactionHistory } from '@0xsodium/provider';
import { Divider } from '@ui-kitten/components';
import { getTranscationExplorer } from '../../lib/common/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useAuth } from '../../lib/data/auth';
import { IModalParam } from '../../lib/define';
import { useMClipboard } from '../../lib/hook/clipboard';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { TranscationDetailItem } from '../item/transcationDetailItem';
import CopyButton from '../baseUI/copyButton';

export const TranscationDetailModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;

  const auth = useAuth();

  // if (!modalParam.param) return <></>

  const history = modalParam.param as TransactionHistory;
  let transfer;
  if (history?.erc20Transfers) {
    transfer = history.erc20Transfers[0];
  }

  const linkTxHash = async () => {
    const chainId = await auth.wallet.getChainId();
    const url = getTranscationExplorer(chainId, history.transactionHash);
    Linking.openURL(url);
  }

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <ScrollView style={{ width: '100%' }}>
        <MText>Transaction Details</MText>
        {
          history && (
            <>
              {
                history.erc20Transfers.map((transfer, index) => {
                  return <TranscationDetailItem key={`${transfer.from}${transfer.to}${index}`} style={styles.marginV} transfer={transfer} />
                })
              }

              <MButton onPress={linkTxHash} style={{ width: '100%', marginVertical: 20 }} title={'View On Polygon'} />

              <MVStack stretchW style={styles.marginV}>
                <MText>Status</MText>
                <MText >{history.type}</MText>
                <Divider />

                <MText>Date & Time</MText>
                <MText>{formatTimeYMDHMS(history.block.blockTimestamp * 1000)}</MText>
                <Divider />

                <MText>Transaction Hash</MText>

                <MLineLR
                  left={<MText>{history.transactionHash}</MText>}
                  right={<CopyButton copyText={history.transactionHash} />} />
                <Divider />

                <MLineLR left={<MText>Network</MText>} right={<MText>{transfer.token.name}</MText>} />
              </MVStack>
            </>
          )
        }

      </ScrollView>

    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginTop: 20
  }
});