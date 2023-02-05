import { Linking, ScrollView, StyleSheet } from "react-native";
import { useQueryHistory } from "../../lib/api/history";
import { formatWei2Price } from "../../lib/common/common";
import { HistoryTime } from "../../lib/common/time";
import { fixWidth, IUserTokenInfo, Screens } from '../../lib/define';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useMClipboard } from "../../lib/hook/clipboard";
import { useDimensionSize } from "../../lib/hook/dimension";
import { IconTokenDefault } from "../../lib/imageDefine";
import { BaseFoldFrame } from "../base/baseFoldFrame";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { navigationRef } from "../base/navigation";
import { Spacer } from "../base/spacer";
import CopyButton from "../baseUI/copyButton";
import LinkButton from "../baseUI/linkButton";
import MButton from "../baseUI/mButton";
import { MButtonText } from "../baseUI/mButtonText";
import { MDivider } from "../baseUI/mDivider";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MLineLR from "../baseUI/mLineLR";
import { MLoading } from "../baseUI/mLoading";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ClassifyHistoryItem } from "../item/classifyHistoryItem";

export function CoinScreen(props) {
  const dimension = useDimensionSize();
  const tokenInfo = props.route.params as IUserTokenInfo;
  const [clipboardContent, setClipboardContent] = useMClipboard();
  const [queryHistory, transHistoryMap, onScroll] = useQueryHistory(null, tokenInfo.token.address);
  // const copyTxHash = () => {
  //   setClipboardContent(tokenInfo.token.address)
  // }

  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }} onScroll={onScroll} scrollEventThrottle={50}>
        <MVStack stretchW style={{ alignItems: 'center', marginTop: 20 }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <MImage w={60} h={60} uri={tokenInfo.token.centerData.logoURI} source={IconTokenDefault} />
            <MText style={{ marginTop: 20, marginBottom: 12, fontWeight: '700' }}>{tokenInfo.token.symbol}</MText>
            {/* <MHStack stretchW style={{ justifyContent: 'center' }}>
              <MImage size={16} />
              <MText  >{tokenInfo.token.name}</MText>
            </MHStack> */}
            <MVStack stretchW style={[{ alignItems: 'center', paddingVertical: 15 }, globalStyle.whiteBorderWidth]}>
              <MText  >Balance</MText>
              <MText style={{ marginVertical: 10, color: eColor.GrayContentText }} >${tokenInfo.usdBalance}</MText>
              <MText style={{ fontWeight: '700' }} >{formatWei2Price(tokenInfo.balance.toString(), tokenInfo.token.decimals)} {tokenInfo.token.symbol}</MText>
            </MVStack>

            <MVStack stretchW style={{ marginVertical: 20 }}>
              <MButton style={{ 'width': '100%', height: 50, backgroundColor: eColor.Blue }} onPress={() => navigationRef.navigate(Screens.Send, tokenInfo)} >
                <MButtonText title={`Send ${tokenInfo.token.symbol}`} />
              </MButton>

            </MVStack>

            <BaseFoldFrame header={"Detail"}>

              <MText style={{ marginBottom: 10 }}>Description</MText>
              <MText style={{ color: eColor.GrayContentText }} numberOfLines={undefined} >{tokenInfo.token.centerData.description || 'unkonw'}</MText>

              <MDivider style={{ marginVertical: 10 }} />
              <MText style={{ marginBottom: 10 }} >Website</MText>
              <MText style={{ color: eColor.GrayContentText }} onPress={() => Linking.openURL(tokenInfo.token.centerData.website)}>{tokenInfo.token.centerData.website || 'unkonw'}</MText>

              {!tokenInfo.token.isNativeToken && (
                <>
                  <MDivider style={{ marginVertical: 10 }} />
                  <MText  >Contract Address</MText>
                  <MLineLR
                    left={<MText style={{ color: eColor.GrayContentText }} >{tokenInfo.token.address}</MText>}
                    right={
                      <MHStack>
                        <CopyButton copyText={tokenInfo.token.address} />
                        <LinkButton tokenInfo={tokenInfo} style={{ marginHorizontal: 5 }} />
                      </MHStack>
                    } />
                </>
              )}

              <MDivider style={{ marginVertical: 10 }} />
              <MHStack >
                <MText style={{ flex: 1 }}>Token Standard</MText>
                <MText style={{ color: eColor.GrayContentText }}>{!tokenInfo.token.isNativeToken ? "ERC20" : `${tokenInfo.token.name} Native Token`}</MText>
              </MHStack>

              <MDivider style={{ marginVertical: 10 }} />
              <MHStack>
                <MText style={{ flex: 1 }}>Network</MText>
                {/* <MImage w={16} h={16} /> */}
                <MText style={{ color: eColor.GrayContentText }}>{tokenInfo.token.name}</MText>
              </MHStack>
            </BaseFoldFrame>
            {
              tokenInfo.token.isNativeToken && (
                <MHStack stretchW style={{ justifyContent: 'center', marginTop: 30, marginBottom: 30 }}>
                  <MText style={{ textAlign: 'center', color: eColor.GrayText }} numberOfLines={null}>Transaction History for Native tokens is not available at this time.</MText>
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
                  <ClassifyHistoryItem title={HistoryTime["Last Year"]} historyMap={transHistoryMap} />
                  <ClassifyHistoryItem title={HistoryTime.Other} historyMap={transHistoryMap} />
                </MVStack>
              )
            }

            {
              queryHistory.isFetching && <>
                <MHStack style={{ marginBottom: 20 }} />
                <MLoading />
              </>
            }
            <MHStack style={{ marginBottom: 40 }} />
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