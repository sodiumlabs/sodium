import { useStore } from '@nanostores/react';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useQueryTokens } from '../../lib/api/tokens';
import { showUpdateScanModal } from '../../lib/data/modal';
import { fixWidth, Screens } from '../../lib/define';
import { eColor } from '../../lib/globalStyles';
import { useDimensionSize } from '../../lib/hook/dimension';
import { currentChainIdAtom } from '../../lib/network';
import { BaseScreen } from "../base/baseScreen";
import Information from '../base/information';
import { navigationRef } from '../base/navigation';
import { Spacer } from '../base/spacer';
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import { MLoading } from '../baseUI/mLoading';
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";
import DepositSvg from '../svg/depositSvg';
import ScanSvg from '../svg/scanSvg';
import SendSvg from '../svg/sendSvg';
import { PendingTranscation } from '../transcation/pendingTranscation';
import { RequestTranscation } from '../transcation/requestTranscation';


export function WalletScreen() {
  const chainId = useStore(currentChainIdAtom);
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens(chainId);
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
              <MText style={{ marginTop: 10, fontWeight: '700' }} fontSize={30} >${usdBalance.toFixed(2)}</MText>
            </MVStack>

            <MHStack style={styles.operate}>
              <WalletButton source={<SendSvg />} title='Send' onPress={() => navigationRef.navigate(Screens.Send)} />
              <WalletButton source={<DepositSvg />} title='Deposit' onPress={() => navigationRef.navigate(Screens.Deposit)} />
              <WalletButton source={<ScanSvg />} title='Scan' onPress={() => showUpdateScanModal(true)} />
            </MHStack>

            <RequestTranscation />

            <PendingTranscation />

            <MInput value={searchText} onChangeText={onChangeText} style={{ marginVertical: 20 }} placeholder="Search coins" placeholderTextColor={eColor.GrayText} />

            <MVStack stretchW style={styles.coins}>
              <MText style={{ marginBottom: 15, color: eColor.GrayContentText }}>Coins</MText>
              {
                tokenInfos && tokenInfos.map((tokenInfo, index) => {
                  if ((tokenInfo.token.name + tokenInfo.token.symbol).toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) != -1) {
                    return <CoinItem key={tokenInfo.token.address} tokenInfo={tokenInfo} />
                  }
                })
              }

              {
                tokensQuery.isFetching && <MLoading />
              }

              {
                !tokensQuery.isFetching && !tokenInfos && (
                  <MHStack stretchW style={{ justifyContent: 'center', marginTop: 30, marginBottom: 30 }}>
                    <MText style={{ textAlign: 'center', color: eColor.GrayText }} numberOfLines={null}>No coins in your wallet</MText>
                  </MHStack>)
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
    maxWidth: fixWidth,
    overflow: 'hidden'
  },
  balance: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center'
  },
  operate: {
  },
  coins: {
    // marginTop: 20,
    marginBottom: 40,
  }
});