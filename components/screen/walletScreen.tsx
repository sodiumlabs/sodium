import { StyleSheet } from 'react-native';
import usePost from "../../lib/api/Test";
import { Screens } from '../../lib/define';
import { BaseScreen } from "../base/baseScreen";
import { showComModal, showDeployModal } from '../base/modalInit';
import { navigation } from '../base/navigationInit';
import MHStack from "../baseUI/mHStack";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from '../baseUI/mVStack';
import WalletButton from "../baseUI/walletButton";
import CoinItem from "../item/coinItem";
import PendingItem from "../item/pendingItem";
import { RequestTranscationItem } from "../item/requestTranscationItem";



export function WalletScreen() {

  const query = usePost(1);

  return (
    <BaseScreen >
      <MVStack stretchW style={styles.container} >

        <MVStack style={styles.balance}>
          <MText>Balance</MText>
          <MText>$3.71</MText>
        </MVStack>

        <MHStack style={styles.operate}>
          <WalletButton title='Send' onPress={() => navigation.navigate(Screens.Send)} />
          {/* <WalletButton title='Send' onPress={() => navigation.navigate(Screens.Connect, { continueClick: () => console.log("continue"), cancelClick: () => console.log("cancel") })} /> */}
          <WalletButton title='Deposit' onPress={() => navigation.navigate(Screens.Deposit)} />
        </MHStack>

        <RequestTranscationItem />


        <PendingItem />

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
    marginBottom: 50,
    alignItems: 'center'
  },
  operate: {
  },
  coins: {
    marginVertical: 25,
  }
});