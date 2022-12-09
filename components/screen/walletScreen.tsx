import { ScrollView, StyleSheet } from 'react-native';
import { useQueryTokens } from '../../lib/api/tokens';
import { IUserTokenInfo, Screens } from '../../lib/define';
import { BaseScreen } from "../base/baseScreen";
import { navigation } from '../base/navigationInit';
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";



export function WalletScreen() {

  const tokensQuery = useQueryTokens();
  const tokenInfos = tokensQuery.data as IUserTokenInfo[];

  let usdBalance = 0;
  if (tokenInfos) {
    usdBalance = tokenInfos.reduce<number>((pre, cur, index, arr) => {
      return pre + parseFloat(cur.usdBalance);
    }, 0);
  }

  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <MVStack stretchW style={styles.container} >

          <MVStack style={styles.balance}>
            <MText>Balance</MText>
            <MText>${usdBalance}</MText>
          </MVStack>

          <MHStack style={styles.operate}>
            <WalletButton title='Send' onPress={() => navigation.navigate(Screens.Send)} />
            <WalletButton title='Deposit' onPress={() => navigation.navigate(Screens.Deposit)} />
          </MHStack>

          {/* <RequestTranscationItem /> */}


          {/* <PendingItem /> */}

          <MInput style={{ marginVertical: 20 }} placeholder="Search coins" placeholderTextColor='#999' />

          <MVStack stretchW style={styles.coins}>
            <MText style={{ marginVertical: 15 }}>Coins</MText>
            {
              tokenInfos && tokenInfos.map((token, index) => {
                return <CoinItem key={token.token.address} tokenInfo={token} />
              })
            }

          </MVStack >

        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  balance: {
    marginBottom: 50,
    alignItems: 'center'
  },
  operate: {
  },
  coins: {
    marginVertical: 25,
  }
});