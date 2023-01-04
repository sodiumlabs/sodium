



import { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';
import { DepositAtLeastAmount, useQueryDepositCurrencies, useQueryDepositUrl, useQueryPreDeposit } from '../../lib/api/deposit';
import { useQueryNetwork } from '../../lib/api/network';
import { IDepositItemData, IDepositToken, ISelectItemData } from '../../lib/define';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MInput from '../baseUI/mInput';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { DepositTokenDropdown } from '../dropdown/depositTokenDropdown';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { MButtonText } from '../baseUI/mButtonText';

export default function DepositItem(props: { depositItemData: IDepositItemData, isSelected: boolean, onDeposiItemClick: (item: IDepositItemData) => void }) {
  const { depositItemData, isSelected, onDeposiItemClick } = props;
  const [queryNetwork, network] = useQueryNetwork();
  const [youPayTokenCount, setYouPayTokenCount] = useState<string>('');
  const [isCanDeposit, setIsCanDeposit] = useState(false);

  const [depositCurrenciesQuery, youBuyTokens, youPayTokens, setYouBuyTokens, setYouPayTokens] = useQueryDepositCurrencies();
  const curYouBuyToken = youBuyTokens && youBuyTokens.find(item => item.isSelected == true);
  const curYouBuyTokenData = curYouBuyToken?.data as IDepositToken;
  const curYouPayToken = youPayTokens && youPayTokens.find(item => item.isSelected == true);
  const curYouPayTokenData = curYouPayToken?.data as IDepositToken;

  const [preDepositQuery, preDepositQueryData] = useQueryPreDeposit(+youPayTokenCount, curYouPayTokenData, curYouBuyTokenData);
  const [depositUrlQuery, depositUrlQueryData] = useQueryDepositUrl(+youPayTokenCount, curYouPayTokenData, curYouBuyTokenData);

  const onInputYouPayTokenCount = (text: string) => {
    const value = text.replace(/[^\d]/g, '');
    setYouPayTokenCount(value);
  }


  const onDepositClick = () => {
    if (depositUrlQuery.isFetching) return;
    if (!youPayTokenCount) return;
    if (!curYouPayToken?.data) return;
    if (!curYouBuyToken?.data) return;
    if (!network?.chainId) return;
    depositUrlQuery.remove();
    depositUrlQuery.refetch();
  }

  useEffect(() => {
    if (depositUrlQueryData) {
      // openUrl(depositUrlQueryData.deposit);
      Linking.openURL(depositUrlQueryData.deposit);
      depositUrlQuery.remove();
    }
  }, [depositUrlQueryData])


  useEffect(() => {
    setIsCanDeposit(curYouBuyToken && curYouPayToken && youPayTokenCount.length > 0 && +youPayTokenCount >= DepositAtLeastAmount);
  }, [curYouBuyToken, curYouPayToken, youPayTokenCount])


  const onYouBuyTokenClick = (selectItemData: ISelectItemData) => {
    if (!youBuyTokens) return;
    youBuyTokens.forEach(item => item.isSelected = false);
    const sameItem = youBuyTokens.find(item => {
      return (item.data as IDepositToken).tokenID == (selectItemData.data as IDepositToken).tokenID
    });
    if (sameItem) sameItem.isSelected = true;
    setYouBuyTokens([...youBuyTokens]);
  }

  const onYouPayTokenClick = (selectItemData: ISelectItemData) => {
    if (!youPayTokens) return;
    youPayTokens.forEach(item => item.isSelected = false);
    const sameItem = youPayTokens.find(item => {
      return (item.data as IDepositToken).tokenID == (selectItemData.data as IDepositToken).tokenID
    });
    if (sameItem) sameItem.isSelected = true;
    setYouPayTokens([...youPayTokens]);
  }

  const selectStyle = {
    borderColor: isSelected ? eColor.Blue : eColor.Border
  }
  return (
    <MVStack stretchW>
      <Pressable onPress={() => onDeposiItemClick(depositItemData)}>
        <MVStack style={[styles.title, globalStyle.whiteBorderWidth, selectStyle]}>
          <MHStack>
            <MText fontSize={14}>Deposit from</MText>
            <MText fontSize={14} style={{ fontWeight: '700', marginLeft: 3 }}>{`${depositItemData.name}`}</MText>
          </MHStack>
          <MText style={styles.itemInfo} >Pay with {depositItemData.paywiths.join('/ ')}</MText>
          <MText style={styles.itemInfo}>Fee: {depositItemData.fee} </MText>
          <MText style={styles.itemInfo}>Limit: {depositItemData.limit}</MText>
          <MText style={styles.itemInfo}>Currencies: {depositItemData.currencies.join(',')}</MText>
          <MText style={styles.itemInfo}>Doesn't Include 4.9% + 30¢ or 5 USD</MText>
        </MVStack>
      </Pressable>
      {
        isSelected && (
          <MVStack stretchW >
            <MText style={{ marginVertical: 10 }}>You bug</MText>
            <DepositTokenDropdown style={{ zIndex: 2 }} selectedOption={curYouBuyToken} setSelectedOption={onYouBuyTokenClick} options={youBuyTokens} />
            <MText style={{ marginVertical: 10 }}>You pay</MText>
            <MInput style={{ marginBottom: 10 }} placeholder='Enter the amount' onChangeText={onInputYouPayTokenCount} value={youPayTokenCount} />
            <DepositTokenDropdown style={{ zIndex: 1 }} selectedOption={curYouPayToken} setSelectedOption={onYouPayTokenClick} options={youPayTokens} />
            <MText style={{ marginVertical: 10 }}>You Receive (Estimated)</MText>
            <MVStack stretchW style={[{ padding: 15, zIndex: 0 }, globalStyle.whiteBorderWidth]}>
              <MText>{preDepositQueryData?.response?.destAmount || 0} {curYouBuyTokenData?.tokenID}</MText>
              {
                preDepositQueryData?.response?.exchangeRate ? (
                  <MText>Rate : 1 {curYouPayTokenData?.tokenID} = {preDepositQueryData?.response?.exchangeRate} {curYouBuyTokenData?.tokenID}</MText>
                ) : (
                  <MText>Rate : _</MText>
                )
              }

            </MVStack>
            <MVStack stretchW style={{ alignItems: 'center', marginBottom: 30 }}>
              <MButton style={{ 'width': '100%', height: 45, marginVertical: 10 }}
                disabled={!isCanDeposit}
                onPress={onDepositClick}
                isLoading={depositUrlQuery.isFetching}>
                <MButtonText title={"Deposit"} />
              </MButton>
              <MText style={{ color: eColor.GrayText }} numberOfLines={null}>You will be redirected to the third party page</MText>
              <MText style={{ color: eColor.GrayText }} numberOfLines={null}>The process would take approximately 10 - 15 min</MText>
              <Pressable onPress={() => Linking.openURL('https://chaingas.shop/')}>
                <MText numberOfLines={null} style={{ textDecorationLine: 'underline', color: eColor.GrayText }} >from mainland china?</MText>
              </Pressable>
            </MVStack>

          </MVStack>
        )
      }
    </MVStack>
  )
}

const styles = StyleSheet.create({
  title: {
    padding: 15,
    marginBottom: 12,
  },
  itemInfo: {
    color: eColor.GrayText,
    marginVertical: 3,
  }
});
