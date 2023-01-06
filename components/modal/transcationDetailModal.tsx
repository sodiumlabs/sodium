import { Linking, ScrollView, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { TransactionHistory } from '@0xsodium/provider';
import { Divider } from '@ui-kitten/components';
import { useQueryNetwork } from '../../lib/api/network';
import { getTranscationExplorer } from '../../lib/common/network';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useAuth } from '../../lib/data/auth';
import { IModalParam } from '../../lib/define';
import { BaseModal } from '../base/baseModal';
import CopyButton from '../baseUI/copyButton';
import MButton from '../baseUI/mButton';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { TranscationDetailItem } from '../item/transcationDetailItem';
import MHStack from '../baseUI/mHStack';
import { MDivider } from '../baseUI/mDivider';
import { ModalTitle } from './modalItem/modalTitle';
import { eColor } from '../../lib/globalStyles';
import { MButtonText } from '../baseUI/mButtonText';

export const TranscationDetailModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;

  const auth = useAuth();
  const [queryNetwork, network] = useQueryNetwork();

  // if (!modalParam.param) return <></>

  const history = modalParam.param as TransactionHistory;
  let transfer;
  if (history?.erc20Transfers) {
    transfer = history.erc20Transfers[0];
  }

  const linkTxHash = async () => {
    const chainId = await auth.signer.getChainId();
    const url = getTranscationExplorer(chainId, history.transactionHash);
    Linking.openURL(url);
  }

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <MVStack stretchW style={{ alignItems: 'center', flex: 1 }}>
        <MVStack stretchW style={[styles.marginV, { flex: 1 }]}>
          <ScrollView style={{ paddingHorizontal: 15 }}>
            {/* <MText>Transaction Details</MText> */}
            <ModalTitle title='Transaction Details' />
            {
              history && (
                <>
                  {
                    history.erc20Transfers.map((transfer, index) => {
                      return <TranscationDetailItem key={`${transfer.from}${transfer.to}${index}`} transfer={transfer} />
                    })
                  }

                  <MHStack stretchW style={{ height: 45, marginTop: 15 }}>
                    <MButton style={{ flex: 1, backgroundColor: eColor.Blue, height: 30 }} onPress={linkTxHash}  >
                      <MButtonText title='View On Polygon' />
                    </MButton>
                  </MHStack>

                  <MVStack stretchW style={styles.marginV}>
                    <MText style={styles.titleColor}>Status</MText>
                    <MText style={[{ marginTop: 10 }, styles.contentWeight]} fontSize={14}>{history.type}</MText>
                    <MDivider style={{ marginVertical: 10 }} />

                    <MText style={styles.titleColor}>Date & Time</MText>
                    <MText style={[{ marginTop: 10 }, styles.contentWeight]}>{formatTimeYMDHMS(history.block.blockTimestamp * 1000)}</MText>
                    <MDivider style={{ marginVertical: 10 }} />

                    <MText style={styles.titleColor}>Transaction Hash</MText>

                    <MLineLR style={{ marginTop: 10 }}
                      left={<MText style={styles.contentWeight}>{history.transactionHash}</MText>}
                      right={<CopyButton style={{ height: 24 }} copyText={history.transactionHash} />} />
                    <MDivider style={{ marginVertical: 10 }} />

                    <MLineLR
                      left={<MText style={styles.titleColor}>Network</MText>}
                      right={<MText style={styles.contentWeight}>{network?.name}</MText>} />
                  </MVStack>
                </>
              )
            }

          </ScrollView>
        </MVStack>
      </MVStack>


    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginTop: 20
  },
  titleColor: {
    color: eColor.GrayText
  },
  contentWeight: {
    fontWeight: '700'
  }
});