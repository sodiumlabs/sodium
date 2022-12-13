

import { Pressable, StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price, token2Usd } from '../../lib/common/common';
import { IUserTokenInfo, PaymasterInfo } from '../../lib/define';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function NetworkFeeItem(props: TextInputProps & { gasInfo: PaymasterInfo, ownToken: IUserTokenInfo }) {
  const { style, gasInfo, ownToken, ...reset } = props;

  const balance = !ownToken ? '0' : `${formatWei2Price(ownToken.balance.toString(), ownToken.token.decimals)} ${ownToken.token.symbol}`
  const gasUsd = !ownToken ? '0' : token2Usd(gasInfo.amount.toString(), ownToken.rate + '', true);
  return (
    <Pressable onPress={undefined}>
      <MHStack style={styles.container} stretchW>
        <MImage size={32} url={gasInfo.token.centerData.logoURI} />

        <MVStack style={{ flex: 1 }}>
          <MLineLR
            left={<MText>{`${gasInfo.token.name}(${gasInfo.token.symbol})`}</MText>}
            right={<MText>{formatWei2Price(gasInfo.amount.toString(), gasInfo.token.decimals, 10)} {gasInfo.token.symbol}</MText>} />
          <MLineLR
            left={<MText>Balance : {balance}</MText>}
            right={<MText>${gasUsd}</MText>} />
        </MVStack>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: '#999',
    borderRadius: 15
  }
});
