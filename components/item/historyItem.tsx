



import { TransactionHistory } from '@0xsodium/provider';
import { Pressable, StyleSheet } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { formatTime } from '../../lib/common/time';
import { showUpdateTranscationDetailModal } from '../base/modalInit';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function HistoryItem(props: { history: TransactionHistory }) {
  const { history } = props;
  const onClick = () => {
    showUpdateTranscationDetailModal(true, history);
  }

  if (history.type == "failed") {
    return <></>
  }

  const transfer = history.erc20Transfers[0];
  const token = transfer.token;
  return (
    <Pressable onPress={onClick}>
      <MVStack style={styles.container} stretchW>

        <MLineLR
          left={
            <MHStack style={{ flex: 1 }}>
              <MText>{history.prefix}</MText>
              <MImage size={16} url={token.centerData.logoURI} />
              <MText> {token.name}</MText>
            </MHStack>
          }
          right={<MText>{formatTime(history.block.blockTimestamp * 1000)}</MText>}
        />

        <MLineLR
          left={
            <MHStack style={{ flex: 1 }}>
              <MImage size={16} url={token.centerData.logoURI} />
              <MText>{token.symbol}</MText>
            </MHStack>
          }
          right={<MText>{formatWei2Price(transfer.amount, transfer.token.decimals)} {transfer.token.symbol}</MText>} />

      </MVStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: 'rgba(200,200,200,1)',
    borderRadius: 10
  }
});
