import { Divider } from "@ui-kitten/components";
import { Linking, ScrollView, StyleSheet } from "react-native";
import { useMClipboard } from "../../lib/common/clipboard";
import { formatWei2Price, token2Usd } from "../../lib/common/common";
import { getBlockExplorer } from "../../lib/common/network";
import { IUserTokenInfo, Screens } from '../../lib/define';
import { BaseFoldFrame } from "../base/baseFoldFrame";
import { BaseScreen } from "../base/baseScreen";
import { showTranscationDetailModal } from '../base/modalInit';
import { navigation } from "../base/navigationInit";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import HistoryItem from "../item/historyItem";

export function CoinScreen(props) {
  const tokenInfo = props.route.params as IUserTokenInfo;
  // const [selectedIndex, setSelectedIndex] = useState(null);
  const [clipboardContent, setClipboardContent] = useMClipboard();
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MImage size={64} url={tokenInfo.token.centerData.logoURI} />
          <MText style={{ marginVertical: 6 }}>{tokenInfo.token.symbol}</MText>
          <MHStack stretchW style={{ justifyContent: 'center' }}>
            <MImage size={16} />
            <MText>{tokenInfo.token.name}</MText>
          </MHStack>
          <MVStack stretchW style={{ backgroundColor: '#999', borderRadius: 15, alignItems: 'center', paddingVertical: 15 }}>
            <MText >Balance</MText>
            <MText >${token2Usd(tokenInfo.balance.toString(), tokenInfo.rate + '')}</MText>
            <MText>{formatWei2Price(tokenInfo.balance.toString())} {tokenInfo.token.symbol}</MText>
          </MVStack>

          <MVStack stretchW style={{ marginVertical: 20 }}>
            <MButton style={{ 'width': '100%', height: 50 }} title={"Send USDC"} onPress={() => navigation.navigate(Screens.Send)} />
          </MVStack>

          <BaseFoldFrame header={<MText >Detail</MText>}>

            <MText style={{ marginBottom: 10 }}>Description</MText>
            <MText numberOfLines={undefined} >{tokenInfo.token.centerData.description}</MText>

            <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
            <MText >Website</MText>
            <MText onPress={() => Linking.openURL(tokenInfo.token.centerData.website)}>{tokenInfo.token.centerData.website}</MText>

            {!tokenInfo.token.isNativeToken && (
              <>
                <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
                <MText >Contract Address</MText>
                <MLineLR
                  left={<MText >{tokenInfo.token.address}</MText>}
                  right={
                    <MHStack>
                      <MButton title={"copy"} onPress={() => setClipboardContent(tokenInfo.token.address)} />
                      <MButton title={"link"} onPress={() => Linking.openURL(getBlockExplorer(tokenInfo.token.chainId, tokenInfo.token.address))} />
                    </MHStack>
                  } />
              </>
            )}

            <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
            <MHStack >
              <MText style={{ flex: 1 }}>Token Standard</MText>
              <MText>{!tokenInfo.token.isNativeToken ? "ERC20" : `${tokenInfo.token.name} Native Token`}</MText>
            </MHStack>

            <Divider style={{ marginVertical: 10, backgroundColor: '#888' }} />
            <MHStack>
              <MText style={{ flex: 1 }}>Network</MText>
              <MImage size={16} />
              <MText>{tokenInfo.token.name}</MText>
            </MHStack>
          </BaseFoldFrame>
          {
            tokenInfo.token.isNativeToken && (
              <MHStack stretchW style={{ justifyContent: 'center' }}>
                <MText style={{ textAlign: 'center' }} numberOfLines={null}>Transaction History for Native tokens is not available at this time.</MText>
              </MHStack>)
          }

          {
            !tokenInfo.token.isNativeToken && (
              <MVStack stretchW>
                <MText>Last Week</MText>
                <HistoryItem onPress={() => showTranscationDetailModal(true)} />
              </MVStack>
            )
          }

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
});