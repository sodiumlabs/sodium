



import { Pressable, StyleSheet, TextInputProps } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { IUserTokenInfo, Screens } from '../../lib/define';
import { navigation } from '../base/navigationInit';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function CoinItem(props: TextInputProps & { tokenInfo: IUserTokenInfo }) {
  const { tokenInfo, style, ...reset } = props;
  return (
    <Pressable onPress={() => navigation.navigate(Screens.Coin, tokenInfo)}>
      <MHStack style={styles.container} stretchW>
        <MImage size={32} url={tokenInfo.token.centerData.logoURI} />

        <MVStack style={{ flex: 1 }}>
          <MLineLR
            left={
              <MHStack >
                <MText>{tokenInfo.token.symbol}</MText>
                <MImage size={12} />
                <MText>{tokenInfo.token.name}</MText>
              </MHStack>
            }
            right={<MText></MText>}
          />

          <MLineLR
            left={<MText>{formatWei2Price(tokenInfo.balance.toString())} {tokenInfo.token.symbol} ${tokenInfo.usdBalance}</MText>}
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
    backgroundColor: '#999',
    borderRadius: 15
  }
});
