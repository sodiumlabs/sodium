import { FixedNumber } from '@ethersproject/bignumber';
import Slider from '@react-native-community/slider';
import { Divider, Radio, RadioGroup } from '@ui-kitten/components';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { ERC20Approve } from "../../../abi/erc20";
import { formatWei2Price, removeAllDecimalPoint } from '../../../lib/common/common';
import { useAuth } from "../../../lib/data/auth";
import { eApproveType, MaxBigNumber, MaxFixedNumber } from "../../../lib/define";
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";


export const ApproveItem = (props: {
  index: number, maxIndex: number, approveData: ERC20Approve,
  approveSelectedIndex, setApproveSelectedIndex,
  approveSliderValue, setApproveSliderValue
}) => {
  const { index, maxIndex, approveData } = props;
  const { approveSelectedIndex, setApproveSelectedIndex } = props;
  const { approveSliderValue, setApproveSliderValue } = props;
  const auth = useAuth();

  const [approveValue, setApproveValue] = useState('Unlimted');
  const onSliderValueChange = (progress: number) => {
    setApproveSliderValue(progress);
  }

  useEffect(() => {
    if (approveSelectedIndex == eApproveType.SetAllowance) { // 
      if (approveSliderValue >= 1) {
        setApproveValue('Unlimted');
      } else {
        // const bigFixed = FixedNumber.from(MaxBigNumber.toString());
        const bigSlider = FixedNumber.fromString(approveSliderValue.toFixed(2));
        const approveNum = BigNumber.from(removeAllDecimalPoint(MaxFixedNumber.mulUnsafe(bigSlider).toString()));

        // setApproveValue(approveNum.toString());
        console.log("bigSlider:" + bigSlider + "  approveData.token.decimals:" + approveData.token.decimals);
        console.log("approveNum:" + approveNum);
        setApproveValue(formatWei2Price(approveNum.toString(), approveData.token.decimals, 2));
      }
    }
    else {
      setApproveValue('Unlimted');
    }
  }, [approveSelectedIndex, approveSliderValue]);

  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }}
      header={<MText >{`Approve(${index}/${maxIndex})`}</MText>}>

      <MText>Spender</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} />
        <MText style={{ flex: 1 }}>{auth?.blockchainAddress}</MText>
      </MHStack>

      <Divider />
      <MText>Value</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} url={approveData.token.centerData.logoURI} />
        <MText style={{ flex: 1 }}>{approveValue}</MText>
      </MHStack>
      <MVStack>
        <RadioGroup
          // style={{ 'alignItems': 'start' }}
          selectedIndex={approveSelectedIndex}
          onChange={index => setApproveSelectedIndex(index)}>
          <Radio >
            <MVStack >
              <MText>Set the Maximum Allowance</MText>
              <Slider
                style={{ width: 300, height: 20 }}
                minimumValue={0}
                maximumValue={1}
                onValueChange={onSliderValueChange}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
              />
            </MVStack>
          </Radio>
          <Radio>Revoke Immediately After This Transaction </Radio>
          <Radio>Keep the Unlimted Allowance</Radio>
        </RadioGroup>


      </MVStack>
    </BaseFoldFrame>
  )
}