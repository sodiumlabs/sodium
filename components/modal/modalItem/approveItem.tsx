import { useCallback, useEffect, useMemo, useState } from 'react';
import { ERC20Approve } from "../../../abi/erc20";
import { useQueryToken } from '../../../lib/api/tokens';
import { formatWei2Price } from '../../../lib/common/common';
import { useAuth } from "../../../lib/data/auth";
import { eApproveType } from "../../../lib/define";
import { eColor } from '../../../lib/globalStyles';
import { IconTokenDefault } from '../../../lib/imageDefine';
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import { InputEndButton } from '../../baseUI/inputEndButton';
import MAvatar from '../../baseUI/mAvatar';
import { MDivider } from '../../baseUI/mDivider';
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MInput from '../../baseUI/mInput';
import MPressable from '../../baseUI/mPressable';
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import { MRadioItem } from '../../item/radioItem';
import { View } from 'react-native';


export const ApproveItem = (props: {
  index: number, maxIndex: number, approveData: ERC20Approve,
  approveSelectedIndex, setApproveSelectedIndex,
  approveInputValue, setApproveInputValue,
  disabled: boolean
}) => {
  const { index, maxIndex, approveData, disabled } = props;
  const { approveSelectedIndex, setApproveSelectedIndex } = props;
  const { approveInputValue, setApproveInputValue } = props;
  const auth = useAuth();
  const [tokensQuery, approveTokenData] = useQueryToken(approveData.token);
  const [approveValueText, setApproveValueText] = useState('Unlimted');

  useEffect(() => {
    setApproveInputValue(formatWei2Price(approveData.amount.toString(), approveData.token.decimals));
  }, []);

  useEffect(() => {
    if (approveTokenData == null) {
      return;
    }
    if (approveSelectedIndex == eApproveType.SetAllowance) {
      setApproveValueText(approveInputValue);
    }
    else {
      setApproveValueText("Unlimted");
    }
  }, [approveSelectedIndex, approveInputValue, approveTokenData]);

  const onChangeTokenCountText = useCallback((text: string) => {
    let inputstr = text;
    if (inputstr == null || inputstr == "") inputstr = '0';

    // Format the previous extra 0
    let inputNum = inputstr.replace(/^0+(?=\d)/, '');
    if (approveTokenData == null) {
      return;
    }
    // let inputNum = text.trim();
    const maxBalancePrice = formatWei2Price(approveTokenData.balance.toString(), approveTokenData.token.decimals, 2);
    if (+inputNum > +maxBalancePrice) {
      inputNum = maxBalancePrice;
    }
    setApproveInputValue(inputNum);
  }, [approveTokenData, setApproveInputValue]);

  const onQuantityMaxClick = useCallback(() => {
    if (approveTokenData == null) {
      return;
    }
    const maxBalancePrice = formatWei2Price(approveTokenData.balance.toString(), approveTokenData.token.decimals, 2);
    setApproveInputValue(maxBalancePrice);
  }, [approveTokenData, setApproveInputValue]);

  // The confused slider must be used this way, not directly mounted to the view (slider offset will occur).
  const inputBox = useMemo(() => {
    const textStyle = { whiteSpace: "normal", } as any;
    const text1 = "This allows the contract to spend ".split(" ");
    const text2 = `${approveInputValue} ${approveData.token.symbol}`.split(" ");
    const text3 = "from your current balance.".split(" ");
    return (
      <>
        <MHStack style={{ position: 'relative', height: 60 }} >
          <MInput style={{ marginTop: 10, paddingRight: 90 }} keyboardType='numeric' placeholder="Quantity"
            placeholderTextColor={eColor.GrayText} onChangeText={onChangeTokenCountText}
            value={approveInputValue} />
          <InputEndButton style={{ position: 'absolute', right: 10, top: 15, height: 30 }} onPress={onQuantityMaxClick} title='Max' />
        </MHStack>

        <MHStack style={{ flexWrap: 'wrap' }}>
          {
            text1.map((t, index) => <View key={index}>
              <MText style={[{ color: eColor.GrayText, marginRight: 2 }, textStyle]} >
                {t}
              </MText>
            </View>)
          }
          {
            text2.map((t, index) => <View key={index}>
              <MText style={[{ fontWeight: 600, marginRight: 2 }, textStyle]} >
                {t}
              </MText>
            </View>)
          }
          {
            text3.map((t, index) => <View key={index}>
              <MText numberOfLines={null} style={[{ color: eColor.GrayText, marginRight: 2, marginBottom: 8 }, textStyle]} >
                {t}
              </MText>
            </View>)
          }
        </MHStack>

      </>
    )
  }, [approveInputValue, approveData, onChangeTokenCountText]);

  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }} header={`Approve(${index}/${maxIndex})`}>

      <MText >Spender</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        {/* <MImage w={20} h={20} /> */}
        <MAvatar name={auth?.blockchainAddress} />
        <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 6 }}>{auth?.blockchainAddress}</MText>
      </MHStack>

      {
        <>
          <MDivider style={{ marginVertical: 10 }} />
          <MText >Value</MText>
          <MHStack style={{ alignItems: 'center', marginVertical: 20 }}>
            <MImage w={20} h={20} uri={approveData.token.centerData.logoURI} source={IconTokenDefault} />
            <MHStack style={{ marginLeft: 12, flex: 1 }} >
              <MText style={{ color: eColor.GrayContentText }}>{approveValueText}</MText>
            </MHStack>
          </MHStack>
          <RadioGroup approveSelectedIndex={approveSelectedIndex} setApproveSelectedIndex={setApproveSelectedIndex} disabled={disabled} inputBox={inputBox} />
        </>
      }
    </BaseFoldFrame>
  )
}

function RadioGroup(props: { approveSelectedIndex, setApproveSelectedIndex, disabled, inputBox }) {
  const { approveSelectedIndex, setApproveSelectedIndex, disabled, inputBox } = props;
  const types = ["Custom Spending Cap", "Revoke After This Transaction", "Keep Unlimited"];
  return (
    <MVStack >
      {
        types.map((item: string, index) => {
          const isSelected = approveSelectedIndex == index;
          return (
            <MVStack stretchW key={index + item}>
              <MPressable disabled={disabled} key={item} onPress={() => { setApproveSelectedIndex(index) }} style={{ flexDirection: 'row', marginVertical: 8, width: '100%' }} >
                <MRadioItem checked={isSelected} />
                <MText style={{ marginLeft: 10, color: isSelected ? eColor.Blue : eColor.Blackest }} >{item}</MText>
              </MPressable>
              <MVStack style={{ paddingHorizontal: 25 }}>
                {
                  index == 0 && (inputBox)
                }
              </MVStack>
            </MVStack>
          )
        })
      }
    </MVStack>
  )
}