



import { IndexPath } from '@ui-kitten/components';
import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { IDepositItemData } from '../../lib/define';
import MButton from '../baseUI/mButton';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MInput from '../baseUI/mInput';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export default function DepositItem(props: { depositItemData: IDepositItemData, isSelected: boolean, onDeposiItemClick: (item: IDepositItemData) => void }) {
  const { depositItemData, isSelected, onDeposiItemClick } = props;
  const [selectedYouBuyIndex, setSelectedYouBuyIndex] = useState(new IndexPath(0));
  const [selectedYouPayIndex, setSelectedYouPayIndex] = useState(new IndexPath(0));

  const selectItem = useMemo(() => {
    return (
      <MHStack stretchW>
        <MImage />
      </MHStack>
    )
  }, []);

  return (
    <MVStack stretchW>
      <Pressable>
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
            {/* <DepositDropdown options={['MATIC', 'USDC']} /> */}
            <MText>You page</MText>
            <MInput />
            {/* <DepositDropdown options={['USD', 'EUR', 'GBP']} /> */}
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
