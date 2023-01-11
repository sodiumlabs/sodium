import { FixedNumber } from '@ethersproject/bignumber';
import Slider from '@react-native-community/slider';
import { Radio, RadioGroup } from '@ui-kitten/components';
import { BigNumber } from 'ethers';
import { useEffect, useState, useMemo } from 'react';
import { ERC20Approve } from "../../../abi/erc20";
import { formatWei2Price, removeAllDecimalPoint } from '../../../lib/common/common';
import { useAuth } from "../../../lib/data/auth";
import { eApproveType, MaxFixedNumber } from "../../../lib/define";
import { eColor } from '../../../lib/globalStyles';
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MAvatar from '../../baseUI/mAvatar';
import { MDivider } from '../../baseUI/mDivider';
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import { IconLogo, IconTokenDefault } from '../../../lib/imageDefine';
import { useProjectSetting } from '../../../lib/data/project';


export const ApproveItem = (props: {
  index: number, maxIndex: number, approveData: ERC20Approve,
  approveSelectedIndex, setApproveSelectedIndex,
  approveSliderValue, setApproveSliderValue
}) => {
  const { index, maxIndex, approveData } = props;
  const { approveSelectedIndex, setApproveSelectedIndex } = props;
  const { approveSliderValue, setApproveSliderValue } = props;
  const auth = useAuth();
  // const projectSetting = useProjectSetting();

  // slider 滑动错位问题，可以临时通过resizeTo重置浏览器大小 得到解决，但仅限于 window,不可用于iframe
  // useEffect(() => {
  //   if (projectSetting.isBeOpenedByThirdParty) {
  //     if (projectSetting.isBeOpenByWindow) {
  //       window.resizeTo(window.outerWidth + 1, window.outerHeight);
  //       console.log(`window resizeTo window.outerWidth: ${window.outerWidth}  window.outerHeight: ${window.outerHeight}`);
  //     } else if (projectSetting.isBeOpenByIframe) {
  //       window.resizeTo(window.outerWidth + 1, window.outerHeight);
  //       console.log(`iframe resizeTo window.outerWidth: ${window.outerWidth}  window.outerHeight: ${window.outerHeight}`);
  //     }
  //   }
  // }, [projectSetting.isBeOpenedByThirdParty])

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
        console.log("bigSlider:" + bigSlider + "  approveData.token.decimals:" + approveData.token.decimals);
        console.log("approveNum:" + approveNum);
        setApproveValue(formatWei2Price(approveNum.toString(), approveData.token.decimals, 2));
      }
    }
    else {
      setApproveValue('Unlimted');
    }

  }, [approveSelectedIndex, approveSliderValue]);

  const header = approveData.amount.eq(0) ? `Revoke Approve(${index}/${maxIndex})` : `Approve(${index}/${maxIndex})`

  const sliderBox = useMemo(() => {
    return <Slider
      minimumValue={0}
      maximumValue={1}
      onValueChange={onSliderValueChange}
      minimumTrackTintColor="#4AB0FF"
      maximumTrackTintColor="#FF7B4A"
    />
  }, []);
  return (
    <BaseFoldFrame defaultExpansion style={{ marginTop: 20 }} header={header}>

      <MText >Spender</MText>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        {/* <MImage w={20} h={20} /> */}
        <MAvatar name={auth?.blockchainAddress} />
        <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 6 }}>{auth?.blockchainAddress}</MText>
      </MHStack>

      {
        approveData.amount.gt(0) &&
        <>
          <MDivider style={{ marginVertical: 10 }} />
          <MText >Value</MText>
          <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
            <MImage w={20} h={20} uri={approveData.token.centerData.logoURI} source={IconTokenDefault} />
            <MText style={{ flex: 1, color: eColor.GrayContentText, marginLeft: 5 }}>{approveValue}</MText>
          </MHStack>
          <MVStack>
            <RadioGroup
              // appearance
              // style={{ 'alignItems': 'start' }}
              selectedIndex={approveSelectedIndex}
              onChange={index => setApproveSelectedIndex(index)}>
              <Radio style={{ marginBottom: 30, position: 'relative' }} status={'success'}>
                <>
                  <MText style={{ marginLeft: 10 }}>Set the Maximum Allowance</MText>
                  <MHStack style={{ width: "60%", height: 20, position: 'absolute', bottom: -25, left: 32, zIndex: 1 }}>
                    {sliderBox}
                  </MHStack>
                </>
              </Radio>
              <Radio status={'success'}>
                <>
                  <MText style={{ marginLeft: 10 }}>Revoke Immediately After This Transaction</MText>
                </>
              </Radio>
              <Radio status={'success'}>
                <><MText style={{ marginLeft: 10 }}>Keep the Unlimted Allowance</MText></>
              </Radio>
            </RadioGroup>


          </MVStack>
        </>
      }
    </BaseFoldFrame>
  )
}