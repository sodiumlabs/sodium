

import { Pressable, StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price, token2Usd } from '../../lib/common/common';
import { IUserTokenInfo, PaymasterInfo } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { IconLogo, IconTokenDefault } from '../../lib/imageDefine';
import { PressableProps } from 'react-native';

export default function NetworkFeeItem(props: PressableProps & { isSelected: boolean, gasInfo: PaymasterInfo, ownToken: IUserTokenInfo }) {
  const { isSelected, gasInfo, ownToken, ...reset } = props;

  const balance = !ownToken ? '0' : `${formatWei2Price(ownToken.balance.toString(), ownToken.token.decimals)} ${ownToken.token.symbol}`
  const gasUsd = !ownToken ? '0' : token2Usd(gasInfo.amount.toString(), gasInfo.token.decimals, ownToken.rate + '', true);

  const selectedStyle = {
    borderColor: isSelected ? eColor.Blue : eColor.Border
  }

  return (
    <Pressable {...reset} >
      <MHStack style={[styles.container, globalStyle.whiteBorderWidth, selectedStyle]} stretchW>
        <MImage w={32} h={32} uri={gasInfo.token.centerData.logoURI} source={IconTokenDefault} />

        <MVStack style={{ flex: 1, marginLeft: 8 }}>
          <MLineLR
            left={<MText style={{ fontWeight: '700' }} fontSize={14}>{`${gasInfo.token.symbol}`}</MText>}
            right={<MText style={{ color: eColor.GrayText, textDecorationLine: gasInfo.sponsorship ? 'line-through' : 'none' }} >
              {formatWei2Price(gasInfo.amount.toString(), gasInfo.token.decimals, 10)} {gasInfo.token.symbol}
            </MText>} />
          <MLineLR
            left={<MText fontSize={10} style={{ color: eColor.GrayText }}>Balance : {balance}</MText>}
            right={<MText style={{ color: eColor.GrayText }}>${gasUsd}</MText>} />

          {
            gasInfo.sponsorship && (
              <MHStack stretchW style={{ justifyContent: 'center', alignItems: 'center' }} >
                <MText fontSize={10}>Paid by {gasInfo.sponsorship.sponsor.name}</MText>
                <MImage style={{ marginLeft: 5 }} uri={gasInfo.sponsorship.sponsor.icon} />
              </MHStack>
            )
          }

        </MVStack>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 0,
  }
});
