import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, TextStyle } from 'react-native';
import usePost from "../../src/api/Test";
import { BaseScreen } from "../base/baseScreen";
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";
import { RequestTranscationItem } from "../item/requestTranscationItem";



export function WalletScreen() {

  const query = usePost(1);
  const navigation = useNavigation();

  return (
    <BaseScreen >
      <MVStack stretchW style={styles.container} >

        <MVStack style={styles.balance}>
          <MText>Balance</MText>
          <MText>$3.71</MText>
        </MVStack>

        <MHStack style={styles.operate}>
          <WalletButton title='Send' onPress={() => navigation.navigate('Send', {})} />
          <WalletButton title='Deposit' />
        </MHStack>

        <RequestTranscationItem />

        <MInput style={{ marginVertical: 20 }} placeholder="Search coins" placeholderTextColor='#999' />

        <MVStack stretchW style={styles.coins}>
          <MText style={{ marginVertical: 15 }}>Coins</MText>
          <CoinItem />
          <CoinItem />
        </MVStack >

      </MVStack>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  balance: {
    marginBottom: 50
  },
  operate: {
  },
  coins: {
    marginVertical: 25,
  }
});