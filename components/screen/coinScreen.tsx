import { Divider } from "@ui-kitten/components";
import { Linking, ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from "../../lib/api/history";
import { formatWei2Price } from "../../lib/common/common";
import { getAddressExplorer } from "../../lib/common/network";
import { HistoryTime } from "../../lib/common/time";
import { fixWidth, IUserTokenInfo, Screens } from '../../lib/define';
import { useMClipboard } from "../../lib/hook/clipboard";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseFoldFrame } from "../base/baseFoldFrame";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigation } from "../base/navigationInit";
import { Spacer } from "../base/spacer";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MLineLR from "../baseUI/mLineLR";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ClassifyHistoryItem } from "../item/classifyHistoryItem";

export function CoinScreen(props) {
  const dimension = useDimensionSize();
  const tokenInfo = props.route.params as IUserTokenInfo;
  const [clipboardContent, setClipboardContent] = useMClipboard();
  const [queryHistory, transHistoryMap, onScroll] = useQueryHistory(null, tokenInfo.token.address);
  const copyTxHash = () => {
    setClipboardContent(tokenInfo.token.address)
  }
  const linkTxHash = () => {
    Linking.openURL(getAddressExplorer(tokenInfo.token.chainId, tokenInfo.token.address))
  }
  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }} onScroll={onScroll} scrollEventThrottle={50}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <MImage size={64} url={tokenInfo.token.centerData.logoURI} />
            <MText style={{ marginVertical: 6 }}>{tokenInfo.token.symbol}</MText>
            <MHStack stretchW style={{ justifyContent: 'center' }}>
              <MImage size={16} />
              <MText>{tokenInfo.token.name}</MText>
            </MHStack>
            <MVStack stretchW style={{ backgroundColor: 'rgba(200,200,200,1)', borderRadius: 15, alignItems: 'center', paddingVertical: 15 }}>
              <MText >Balance</MText>
              <MText >${tokenInfo.usdBalance}</MText>
              <MText>{formatWei2Price(tokenInfo.balance.toString())} {tokenInfo.token.symbol}</MText>
            </MVStack>

            <MVStack stretchW style={{ marginVertical: 20 }}>
              <MButton style={{ 'width': '100%', height: 50 }} onPress={() => navigation.navigate(Screens.Send)} >
                <MText>Send USDC</MText>
              </MButton>
            </MVStack>

            <BaseFoldFrame header={<MText >Detail</MText>}>

              <MText style={{ marginBottom: 10 }}>Description</MText>
              <MText numberOfLines={undefined} >{tokenInfo.token.centerData.description}</MText>

              <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(200,200,200,1)' }} />
              <MText >Website</MText>
              <MText onPress={() => Linking.openURL(tokenInfo.token.centerData.website)}>{tokenInfo.token.centerData.website}</MText>

              {!tokenInfo.token.isNativeToken && (
                <>
                  <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(200,200,200,1)' }} />
                  <MText >Contract Address</MText>
                  <MLineLR
                    left={<MText >{tokenInfo.token.address}</MText>}
                    right={
                      <MHStack>
                        <MButton onPress={copyTxHash} >
                          <MText>copy</MText>
                        </MButton>
                        <MButton onPress={linkTxHash} >
                          <MText>link</MText>
                        </MButton>
                      </MHStack>
                    } />
                </>
              )}

              <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(200,200,200,1)' }} />
              <MHStack >
                <MText style={{ flex: 1 }}>Token Standard</MText>
                <MText>{!tokenInfo.token.isNativeToken ? "ERC20" : `${tokenInfo.token.name} Native Token`}</MText>
              </MHStack>

              <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(200,200,200,1)' }} />
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
                  <ClassifyHistoryItem title={HistoryTime.ToDay} historyMap={transHistoryMap} />
                  <ClassifyHistoryItem title={HistoryTime["This Week"]} historyMap={transHistoryMap} />
                  <ClassifyHistoryItem title={HistoryTime["Last Week"]} historyMap={transHistoryMap} />
                  <ClassifyHistoryItem title={HistoryTime["This Month"]} historyMap={transHistoryMap} />
                  <ClassifyHistoryItem title={HistoryTime["This Year"]} historyMap={transHistoryMap} />
                  <ClassifyHistoryItem title={HistoryTime.Other} historyMap={transHistoryMap} />
                </MVStack>
              )
            }

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
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});