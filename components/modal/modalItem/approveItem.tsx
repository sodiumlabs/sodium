import { FixedNumber } from '@ethersproject/bignumber';
import Slider from '@react-native-community/slider';
import { Divider, Radio, RadioGroup } from '@ui-kitten/components';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { ERC20Approve } from "../../../abi/erc20";
import { formatWei2Price, removeAllDecimalPoint } from '../../../lib/common/common';
import { useAuth } from "../../../lib/data/auth";
import { eApproveType, MaxFixedNumber } from "../../../lib/define";
import { eColor } from '../../../lib/globalStyles';
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
      header={`Approve(${index}/${maxIndex})`}>

      <MText style={{ color: eColor.GrayText }}>Spender</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} />
        <MText style={{ flex: 1, color: "#6B6B6B" }}>{auth?.blockchainAddress}</MText>
      </MHStack>

      <Divider />
      <MText style={{ color: eColor.GrayText }}>Value</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <MImage size={20} url={approveData.token.centerData.logoURI} />
        <MText style={{ flex: 1, color: "#6B6B6B" }}>{approveValue}</MText>
      </MHStack>
      <MVStack>
        <RadioGroup
          // style={{ 'alignItems': 'start' }}
          selectedIndex={approveSelectedIndex}
          onChange={index => setApproveSelectedIndex(index)}>
          <Radio style={{ marginBottom: 30, position: 'relative' }}>
            <>
              <MText style={{ marginLeft: 10 }}>Set the Maximum Allowance</MText>
              <Slider
                style={{ width: '60%', height: 20, position: 'absolute', bottom: -25, left: 32, zIndex: 1 }}
                minimumValue={0}
                maximumValue={1}
                onValueChange={onSliderValueChange}
                minimumTrackTintColor="#4AB0FF"
                maximumTrackTintColor="#FF7B4A"
              />
            </>
          </Radio>
          <Radio>
            <>
              <MText style={{ marginLeft: 10 }}>Revoke Immediately After This Transaction</MText>
            </>
          </Radio>
          <Radio>
            <><MText style={{ marginLeft: 10 }}>Keep the Unlimted Allowance</MText></>
          </Radio>
        </RadioGroup>


      </MVStack>
    </BaseFoldFrame>
  )
}