import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import usePost from "../../src/api/Test";
import { BaseScreen } from "../base/baseScreen";
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";



export function WalletScreen(props: {}) {

  const query = usePost(1);
  const navigation = useNavigation();

  return (
    <BaseScreen >
      <MVStack style={styles.container}>

        <MVStack style={styles.balance}>
          <MText>Balance</MText>
          <MText>$3.71</MText>
        </MVStack>

        <MHStack style={styles.operate}>
          <WalletButton title='Send' />
          <WalletButton title='Deposit' />
        </MHStack>

        <MInput placeholder="Search coins" placeholderTextColor='#999' />

        <MVStack style={styles.coins}>
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
    width: '100%',
    paddingHorizontal: 15
  },
  balance: {
    marginBottom: 50
  },
  operate: {
    // flexDirection: 'row'
  },
  coins: {
    marginVertical: 25,
    width: '100%'
  }
});