



import { Pressable, StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { IUserTokenInfo, Screens } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { navigationRef } from '../base/navigationInit';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function CoinItem(props: TextInputProps & { tokenInfo: IUserTokenInfo }) {
  const { tokenInfo, style, ...reset } = props;
  return (
    <Pressable onPress={() => navigationRef.navigate(Screens.Coin, tokenInfo)}>
      <MHStack style={[styles.container, globalStyle.whiteBorderWidth]} stretchW>
        <MImage w={32} h={32} uri={tokenInfo.token.centerData.logoURI} />

        <MVStack style={{ flex: 1 }}>
          <MLineLR
            left={
              <MHStack >
                <MText style={{ fontWeight: '700' }} fontSize={14} >{tokenInfo.token.symbol}</MText>
                {/* <MImage size={12} /> */}
                {/* <MText>{tokenInfo.token.name}</MText> */}
              </MHStack>
            }
            right={<MText></MText>}
          />

          <MLineLR
            style={{ marginTop: 2 }}
            left={<MText style={{ color: eColor.GrayText }} fontSize={10}>{formatWei2Price(tokenInfo.balance.toString())} {tokenInfo.token.symbol} ${tokenInfo.usdBalance}</MText>}
            right={<MText></MText>} />
        </MVStack>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
  }
});
