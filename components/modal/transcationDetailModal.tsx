import { Linking, ScrollView, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { TransactionHistory } from '@0xsodium/provider';
import { useQueryNetwork } from '../../lib/api/network';
import { capitalize } from '../../lib/common/common';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { useAuth } from '../../lib/data/authAtom';
import { IModalParam } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { getTranscationExplorer } from '../../lib/network';
import { BaseModal } from '../base/baseModal';
import CopyButton from '../baseUI/copyButton';
import MButton from '../baseUI/mButton';
import { MButtonText } from '../baseUI/mButtonText';
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { TranscationDetailItem } from '../item/transcationDetailItem';
import { ModalTitle } from './modalItem/modalTitle';

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
      hideImmediately={modalParam.hideImmediately}
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
                    <MButton style={{ flex: 1, height: 30 }} onPress={linkTxHash}  >
                      <MButtonText title={`View On ${capitalize(network?.name)}`} />
                    </MButton>
                  </MHStack>

                  <MVStack stretchW style={styles.marginV}>
                    <MText style={styles.titleColor}>Status</MText>
                    <MText style={[{ marginTop: 10 }, styles.contentWeight]} fontSize={14}>{capitalize(history.type)}</MText>
                    <MDivider style={{ marginVertical: 10 }} />

                    <MText style={styles.titleColor}>Date & Time</MText>
                    <MText style={[{ marginTop: 10 }, styles.contentWeight]}>{formatTimeYMDHMS(history.block.blockTimestamp * 1000)}</MText>
                    <MDivider style={{ marginVertical: 10 }} />

                    <MText style={styles.titleColor}>Transaction Hash</MText>

                    <MLineLR style={{ marginTop: 10 }}
                      left={<MText style={[styles.contentWeight, { marginRight: 10 }]}>{history.transactionHash}</MText>}
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