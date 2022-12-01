import { useNavigation } from "@react-navigation/native";
import { Divider } from "@ui-kitten/components";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import TranscationItem from "../item/transcationItem";
import { showTranscationModal } from '../base/screenInit';

export function CoinScreen() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigation = useNavigation();
  return (
    <BaseScreen isHeaderBack>
      <MVStack stretchW style={{ alignItems: 'center', marginVertical: 40, paddingHorizontal: 15 }}>
        <Image style={{ width: 64, height: 64 }} source={require('./../../assets/favicon.png')} />
        <MText style={{ marginVertical: 6 }}>USDC</MText>
        <MHStack>
          <Image style={{ width: 16, height: 16 }} source={require('./../../assets/favicon.png')} />
          <MText>POLYGON</MText>
        </MHStack>
        <MVStack style={{ marginVertical: 25 }}>
          <MText >$1.34</MText>
          <MText >+0.02%</MText>
        </MVStack>
        <MVStack stretchW style={{ backgroundColor: '#999', borderRadius: 15, alignItems: 'center', paddingVertical: 15 }}>
          <MText >Balance</MText>
          <MText >$3.13</MText>
          <MText>2.327678 USDC</MText>
        </MVStack>

        <MVStack stretchW style={{ marginVertical: 20 }}>
          <MButton styles={{ 'width': '100%', height: 50 }} title={"Send USDC"} onPress={() => navigation.navigate('Send')} />
        </MVStack>

        <MVStack stretchW style={{ marginVertical: 40, backgroundColor: '#999', borderRadius: 15, padding: 15 }}>
          <MHStack style={{ marginBottom: 20 }}>
            <MText style={{ flex: 1 }}>Detail</MText>
            <Image style={{ width: 12, height: 12 }} source={require('./../../assets/favicon.png')} />
          </MHStack>

          <MText style={{ marginBottom: 10 }}>Description</MText>
          <MText numberOfLines={undefined} >
            USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between dollars and trading on cryptocurrency exchanges. The technology behind CENTRE makes it possible to exchange value between people, businesses and financial institutions just like email between mail services and texts between SMS providers. We believe by removing artificial economic borders, we can create a more inclusive global economy.
          </MText>

          <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
          <MText >Website</MText>
          <MText onPress={() => console.log('click')}>https://www.circle.com/en/usdc</MText>

          <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
          <MText >Contract Address</MText>
          <MText >0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174</MText>

          <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
          <MHStack >
            <MText style={{ flex: 1 }}>Token Standard</MText>
            <MText>ERC20</MText>
          </MHStack>

          <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
          <MHStack>
            <MText style={{ flex: 1 }}>Network</MText>
            <Image style={{ width: 16, height: 16 }} source={require('./../../assets/favicon.png')} />
            <MText>POLYGON</MText>
          </MHStack>
        </MVStack>



        <MVStack stretchW>
          <MText>Last Week</MText>
          <TranscationItem onPress={() => showTranscationModal(true)} />
        </MVStack>

      </MVStack>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});