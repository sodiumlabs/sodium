import { TransactionHistory } from '@0xsodium/provider';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { capitalize, formatWei2Price } from '../../lib/common/common';
import { formatTimeYMDHMS } from '../../lib/common/time';
import { showUpdateTranscationDetailModal } from '../../lib/data/modal';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { IconTokenDefault } from '../../lib/imageDefine';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MPressable from '../baseUI/mPressable';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function HistoryItem(props: { history: TransactionHistory }) {
  const { history } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  const onClick = () => {
    showUpdateTranscationDetailModal(true, history);
  }

  if (history.type == "failed") {
    return <></>
  }

  const transfer = history.erc20Transfers[0];
  const token = transfer.token;
  return (
    <MPressable
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      onPress={onClick}>
      <MVStack style={[styles.container, globalStyle.whiteBorderWidth, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]} stretchW>

        <MLineLR
          left={
            <MHStack style={{ flex: 1 }}>
              <MText style={{ fontWeight: '700' }} fontSize={14}>{capitalize(history.prefix)}</MText>
              {/* <MImage size={16} url={token.centerData.logoURI} /> */}
              {/* <MText> {token.name}</MText> */}
            </MHStack>
          }
          right={<MText style={{ color: eColor.GrayText }} >{formatTimeYMDHMS(history.block.blockTimestamp * 1000)}</MText>}
        />

        <MLineLR style={{ marginTop: 5 }}
          left={
            <MHStack style={{ flex: 1, alignItems: 'center' }}>
              <MImage w={14} h={14} uri={token?.centerData?.logoURI} source={IconTokenDefault} />
              <MText style={{ marginLeft: 5, color: eColor.GrayContentText }}>{token.symbol}</MText>
            </MHStack>
          }
          right={<MText style={{ color: eColor.GrayText }}>{formatWei2Price(transfer.amount, transfer.token.decimals, 3)} {transfer.token.symbol}</MText>} />

      </MVStack>
    </MPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
  }
});
