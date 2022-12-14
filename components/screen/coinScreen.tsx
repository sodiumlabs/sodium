import { Divider } from "@ui-kitten/components";
import { Linking, ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from "../../lib/api/history";
import { formatWei2Price } from "../../lib/common/common";
import { getAddressExplorer } from "../../lib/common/network";
import { IUserTokenInfo, Screens } from '../../lib/define';
import { useMClipboard } from "../../lib/hook/clipboard";
import { BaseFoldFrame } from "../base/baseFoldFrame";
import { BaseScreen } from "../base/baseScreen";
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
  const [clipboardContent, setClipboardContent] = useMClipboard();
  const [queryHistory, transcationHistorys, onScroll] = useQueryHistory(null, tokenInfo.token.address);
  const copyTxHash = () => {
    setClipboardContent(tokenInfo.token.address)
  }
  const linkTxHash = () => {
    Linking.openURL(getAddressExplorer(tokenInfo.token.chainId, tokenInfo.token.address))
  }
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }} onScroll={onScroll} scrollEventThrottle={50}>
        <MVStack stretchW style={styles.container}>
          <MImage size={64} url={tokenInfo.token.centerData.logoURI} />
          <MText style={{ marginVertical: 6 }}>{tokenInfo.token.symbol}</MText>
          <MHStack stretchW style={{ justifyContent: 'center' }}>
            <MImage size={16} />
            <MText>{tokenInfo.token.name}</MText>
          </MHStack>
          <MVStack stretchW style={{ backgroundColor: '#999', borderRadius: 15, alignItems: 'center', paddingVertical: 15 }}>
            <MText >Balance</MText>
            <MText >${tokenInfo.usdBalance}</MText>
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
                      <MButton title={"copy"} onPress={copyTxHash} />
                      <MButton title={"link"} onPress={linkTxHash} />
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
                {
                  transcationHistorys && transcationHistorys.map((item, index) => {
                    return <HistoryItem key={index} history={item} />
                  })
                }
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