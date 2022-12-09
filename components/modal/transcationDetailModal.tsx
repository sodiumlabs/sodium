import { ScrollView, StyleSheet } from 'react-native';
// import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { Divider } from '@ui-kitten/components';
import { BaseModal } from '../base/baseModal';
import MButton from '../baseUI/mButton';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { TranscationDetailItem } from '../item/transcationDetailItem';
import { IModalParam } from '../../lib/define';
import { TransactionHistory } from '@0xsodium/provider';
import { formatTimeYMDHMS } from '../../lib/common/time';

export const TranscationDetailModal = (props: { hideModal: () => void, modalParam: IModalParam }) => {
  const { modalParam, hideModal } = props;
  if (!modalParam.param) return <></>

  const history = modalParam.param as TransactionHistory;
  const transfer = history.erc20Transfers[0];
  const token = transfer.token;

  return (
    <BaseModal
      visible={modalParam.visible}
      hideModal={hideModal}
    >
      <ScrollView style={{ width: '100%' }}>
        <MText>Transaction Details</MText>
        {
          history.erc20Transfers.map((transfer, index) => {
            return <TranscationDetailItem key={`${transfer.from}${transfer.to}${index}`} style={styles.marginV} transfer={transfer} />
          })
        }


        <MButton style={{ width: '100%', marginVertical: 20 }} title={'View On Polygon'}></MButton>

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
            right={<MButton title={'copy'} />} />
          <Divider />

          <MLineLR left={<MText>Network</MText>} right={<MText>{token.name}</MText>} />
        </MVStack>
      </ScrollView>

    </BaseModal>
  );
};

const styles = StyleSheet.create({
  marginV: {
    marginTop: 20
  }
});