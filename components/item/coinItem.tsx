



import { useState } from 'react';
import { Pressable, StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { IUserTokenInfo, Screens } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { IconTokenDefault } from '../../lib/imageDefine';
import { navigationRef } from '../base/navigationInit';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function CoinItem(props: TextInputProps & { tokenInfo: IUserTokenInfo }) {
  const { tokenInfo, style, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  return (
    <Pressable
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      onPress={() => navigationRef.navigate(Screens.Coin, tokenInfo)}>
      <MHStack style={[styles.container, globalStyle.whiteBorderWidth, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]} stretchW>
        <MImage w={24} h={24} uri={tokenInfo.token.centerData.logoURI} source={IconTokenDefault} />

        <MVStack style={{ flex: 1, marginLeft: 6 }}>
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
    alignItems: 'center'
  }
});
