



import { TransactionHistory } from '@0xsodium/provider';
import { Pressable, StyleSheet } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { formatTime } from '../../lib/common/time';
import { eColor, globalStyle } from '../../lib/globalStyles';
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
      <MVStack style={[styles.container, globalStyle.whiteBorderWidth]} stretchW>

        <MLineLR
          left={
            <MHStack style={{ flex: 1 }}>
              <MText style={{ fontWeight: '700' }} fontSize={14}>{history.prefix}</MText>
              {/* <MImage size={16} url={token.centerData.logoURI} /> */}
              {/* <MText> {token.name}</MText> */}
            </MHStack>
          }
          right={<MText style={{ color: eColor.GrayText }} >{formatTime(history.block.blockTimestamp * 1000)}</MText>}
        />

        <MLineLR style={{ marginTop: 3 }}
          left={
            <MHStack style={{ flex: 1 }}>
              <MImage w={16} h={16} uri={token.centerData.logoURI} />
              <MText style={{ marginLeft: 5 }}>{token.symbol}</MText>
            </MHStack>
          }
          right={<MText style={{ color: eColor.GrayText }}>{formatWei2Price(transfer.amount, transfer.token.decimals)} {transfer.token.symbol}</MText>} />

      </MVStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
  }
});
