



import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useQueryTokens } from '../../lib/api/tokens';
import { IDepositItemData, IUserTokenInfo } from '../../lib/define';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MInput from '../baseUI/mInput';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import { DepositTokenDropdown } from '../dropdown/depositTokenDropdown';

export default function DepositItem(props: { depositItemData: IDepositItemData, isSelected: boolean, onDeposiItemClick: (item: IDepositItemData) => void }) {
  const { depositItemData, isSelected, onDeposiItemClick } = props;
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [selectedBuyOption, setSelectedBuyOption] = useState<IUserTokenInfo>(null);
  const [selectedPayOption, setSelectedPayOption] = useState<IUserTokenInfo>(null);
  const [youPayTokenCount, setYouPayTokenCount] = useState<string>('');

  const selectItem = useMemo(() => {
    return (
      <MHStack stretchW>
        <MImage />
      </MHStack>
    )
  }, []);

  return (
    <MVStack stretchW>
      <Pressable onPress={() => onDeposiItemClick(depositItemData)}>
        <MVStack style={styles.title}>
          <MText>Deposit from Wyre</MText>
          <MText>Pay with Apple Pay/ Debit/ Credit Card</MText>
          <MText>Fee: 3%</MText>
          <MText>Limit: $500/week</MText>
          <MText>Currencies: MATIC,USDC</MText>
          <MText>Doesn't Include 4.9% + 30¢ or 5 USD</MText>
        </MVStack>
      </Pressable>
      {
        isSelected && (
          <MVStack stretchW >
            <MText>You bug</MText>
            <DepositTokenDropdown style={{ zIndex: 2 }} selectedOption={selectedBuyOption} setSelectedOption={setSelectedBuyOption} options={tokenInfos} />
            <MText>You pay</MText>
            <MInput />
            <DepositTokenDropdown style={{ zIndex: 1 }} selectedOption={selectedPayOption} setSelectedOption={setSelectedPayOption} options={tokenInfos} />
            <MText>You Receive (Estimated)</MText>
            <MVStack stretchW style={{ backgroundColor: 'rgba(200,200,200,1)', borderRadius: 15, padding: 15, zIndex: 0 }}>
              <MText>0 USDC</MText>
              <MText>Rate : _</MText>
            </MVStack>
            <MVStack stretchW style={{ alignItems: 'center' }}>
              <MButton style={{ 'width': '100%' }}  >
                <MText>Deposit</MText>
              </MButton>
              <MText>You will be redirected to the third party page</MText>
              <MText>The process would take approximately 10 - 15 min</MText>
              <TouchableOpacity onPress={() => Linking.openURL('https://chaingas.shop/')}>
                <MText>from mainland china?</MText>
              </TouchableOpacity>
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
    backgroundColor: 'rgba(200,200,200,1)',
    borderRadius: 15
  }
});
