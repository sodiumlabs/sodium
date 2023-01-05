import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useQueryTokens } from '../../lib/api/tokens';
import { fixWidth, Screens } from '../../lib/define';
import { useDimensionSize } from '../../lib/hook/dimension';
import { BaseScreen } from "../base/baseScreen";
import Information from '../base/information';
import { navigationRef } from '../base/navigationInit';
import { Spacer } from '../base/spacer';
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";
import { RequestTranscation } from '../transcation/requestTranscation';
import { IconMenuDeposit, IconMenuSend } from '../../lib/imageDefine';



export function WalletScreen() {
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [searchText, setSearchText] = useState<string>('');
  const dimension = useDimensionSize();
  const onChangeText = (text: string) => {
    setSearchText(text);
  }
  return (
    <BaseScreen >
      <ScrollView style={{ width: '100%', height: '100%' }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]} >


            <MVStack style={styles.balance}>
              <MText style={{ fontWeight: '700' }} >Balance</MText>
              <MText style={{ marginTop: 10, fontWeight: '700' }} fontSize={30} >${usdBalance}</MText>
            </MVStack>

            <MHStack style={styles.operate}>
              <WalletButton source={IconMenuSend} title='Send' onPress={() => navigationRef.navigate(Screens.Send)} />
              <WalletButton source={IconMenuDeposit} title='Deposit' onPress={() => navigationRef.navigate(Screens.Deposit)} />
            </MHStack>

            <RequestTranscation />

            {/* <PendingItem /> */}

            <MInput value={searchText} onChangeText={onChangeText} style={{ marginVertical: 20 }} placeholder="Search coins" placeholderTextColor='#999' />

            <MVStack stretchW style={styles.coins}>
              <MText style={{ marginBottom: 15 }}>Coins</MText>
              {
                tokenInfos && tokenInfos.map((tokenInfo, index) => {
                  if ((tokenInfo.token.name + tokenInfo.token.symbol).toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) != -1) {
                    return <CoinItem key={tokenInfo.token.address} tokenInfo={tokenInfo} />
                  }
                })
              }

            </MVStack >
            <Spacer />
            <Information />
          </MVStack>
        </MVStack>

      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    // marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
  balance: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center'
  },
  operate: {
  },
  coins: {
    marginVertical: 20,
  }
});