import { useState } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { btnScale, IUserTokenInfo, Screens } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { IconTokenDefault } from '../../lib/imageDefine';
import { navigationRef } from '../base/navigation';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MPressable from '../baseUI/mPressable';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function CoinItem(props: TextInputProps & { tokenInfo: IUserTokenInfo }) {
  const { tokenInfo, style, ...reset } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  return (
    <MPressable
      scale={btnScale}
      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      onPress={() => navigationRef.navigate(Screens.Coin, tokenInfo)}>
      <MHStack style={[styles.container, globalStyle.whiteBorderWidth, { backgroundColor: isItemHovered ? eColor.GrayHover : '#ffffff' }]} stretchW>
        <MImage w={24} h={24} uri={tokenInfo.token.centerData.logoURI} source={IconTokenDefault} />
        <MHStack style={{ flex: 1 }}>
          <MVStack style={{ flex: 1, marginLeft: 6 }}>
            <MText style={{ fontWeight: '700' }} fontSize={14} >{tokenInfo.token.symbol}</MText>
            <MText style={{ color: eColor.GrayText }} fontSize={10}>{formatWei2Price(tokenInfo.balance.toString(), tokenInfo.token.decimals, 3)} {tokenInfo.token.symbol}</MText>
          </MVStack>
          <MVStack style={{ alignSelf: 'center' }} >
            <MText style={{ color: eColor.GrayContentText }} fontSize={10}>${tokenInfo.usdBalance}</MText>
          </MVStack>
        </MHStack>

      </MHStack>
    </MPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 12,
    alignItems: 'center'
  }
});
