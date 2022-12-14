import { ScrollView, StyleSheet } from 'react-native';
import { useQueryTokens } from '../../lib/api/tokens';
import { Screens } from '../../lib/define';
import { BaseScreen } from "../base/baseScreen";
import { navigation } from '../base/navigationInit';
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";
import PendingItem from '../item/pendingItem';
import { RequestTranscation } from '../transcation/requestTranscation';
import { useState } from 'react';



export function WalletScreen() {
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [searchText, setSearchText] = useState<string>('');
  const onChangeText = (text: string) => {
    setSearchText(text);
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

          <RequestTranscation />

          {/* <PendingItem /> */}

          <MInput value={searchText} onChangeText={onChangeText} style={{ marginVertical: 20 }} placeholder="Search coins" placeholderTextColor='#999' />

          <MVStack stretchW style={styles.coins}>
            <MText style={{ marginVertical: 15 }}>Coins</MText>
            {
              tokenInfos && tokenInfos.map((tokenInfo, index) => {
                if ((tokenInfo.token.name + tokenInfo.token.symbol).toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) != -1) {
                  return <CoinItem key={tokenInfo.token.address} tokenInfo={tokenInfo} />
                }
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