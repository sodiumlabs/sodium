import { FixedNumber } from '@ethersproject/bignumber';
import Slider from '@react-native-community/slider';
import { Radio, RadioGroup } from '@ui-kitten/components';
import { BigNumber } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { ERC20Approve } from "../../../abi/erc20";
import { formatWei2Price, removeAllDecimalPoint } from '../../../lib/common/common';
import { useAuth } from "../../../lib/data/auth";
import { eApproveType, MaxFixedNumber } from "../../../lib/define";
import { eColor } from '../../../lib/globalStyles';
import { IconTokenDefault } from '../../../lib/imageDefine';
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MAvatar from '../../baseUI/mAvatar';
import { MDivider } from '../../baseUI/mDivider';
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import { Platform } from 'react-native';


export const ApproveItem = (props: {
  index: number, maxIndex: number, approveData: ERC20Approve,
  approveSelectedIndex, setApproveSelectedIndex,
  approveSliderValue, setApproveSliderValue,
  disabled: boolean
}) => {
  const { index, maxIndex, approveData, disabled } = props;
  const { approveSelectedIndex, setApproveSelectedIndex } = props;
  const { approveSliderValue, setApproveSliderValue } = props;
  const auth = useAuth();
  // const projectSetting = useProjectSetting();

  // slider dislocation problem can be temporarily resolved by resizeTo resizing the browser, but it is limited to Windows and cannot be used for iframe
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

  // The confused slider must be used this way, not directly mounted to the view (slider offset will occur).
  const sliderBox = useMemo(() => {
    return <Slider
      style={{ width: '100%', height: '100%' }}
      minimumValue={0}
      maximumValue={1}
      onValueChange={onSliderValueChange}
      minimumTrackTintColor="#4AB0FF"
      maximumTrackTintColor="#FF7B4A"

    />
  }, []);
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
              <MText style={{ color: eColor.GrayContentText }}>{approveValue}</MText>
            </MHStack>
          </MHStack>
          {
            Platform.OS == 'web' && <RadioWeb approveSelectedIndex={approveSelectedIndex} setApproveSelectedIndex={setApproveSelectedIndex} disabled={disabled} sliderBox={sliderBox} />
          }
          {
            Platform.OS != 'web' && <RadioNative approveSelectedIndex={approveSelectedIndex} setApproveSelectedIndex={setApproveSelectedIndex} disabled={disabled} sliderBox={sliderBox} />
          }
        </>
      }
    </BaseFoldFrame>
  )
}


function RadioNative(props: { approveSelectedIndex, setApproveSelectedIndex, disabled, sliderBox }) {
  const { approveSelectedIndex, setApproveSelectedIndex, disabled, sliderBox } = props;
  return (
    <MVStack>
      <RadioGroup
        selectedIndex={approveSelectedIndex}
        onChange={index => setApproveSelectedIndex(index)}>
        <Radio style={{ marginBottom: 30, position: 'relative' }} status={'success'} disabled={disabled}>

          <MText style={{ marginLeft: 10 }}>Set the Maximum Allowance</MText>


        </Radio>
        <Radio status={'success'} disabled={disabled}>
          <MText style={{ marginLeft: 10 }}>Revoke Immediately After This Transaction</MText>
        </Radio>
        <Radio status={'success'} disabled={disabled}>
          <MText style={{ marginLeft: 10 }}>Keep the Unlimted Allowance</MText>
        </Radio>
      </RadioGroup>

      {
        Platform.OS != 'web' && (
          <MHStack style={{ width: "80%", height: 30, position: 'absolute', left: 30, top: 30, zIndex: 1 }}>
            <MHStack stretchW>
              {sliderBox}
            </MHStack>
          </MHStack>
        )
      }


    </MVStack>
  )
}


function RadioWeb(props: { approveSelectedIndex, setApproveSelectedIndex, disabled, sliderBox }) {
  const { approveSelectedIndex, setApproveSelectedIndex, disabled, sliderBox } = props;
  return (
    <MVStack>
      <RadioGroup
        selectedIndex={approveSelectedIndex}
        onChange={index => setApproveSelectedIndex(index)}>
        <Radio style={{ marginBottom: 30, position: 'relative' }} status={'success'} disabled={disabled}>

          <>
            <MText style={{ marginLeft: 10 }}>Set the Maximum Allowance</MText>
            <MHStack style={{ width: "80%", height: 30, position: 'absolute', left: 30, top: 30, zIndex: 1 }}>
              <MHStack stretchW>
                {sliderBox}
              </MHStack>
            </MHStack>
          </>


        </Radio>
        <Radio status={'success'} disabled={disabled}>
          <>
            <MText style={{ marginLeft: 10 }}>Revoke Immediately After This Transaction</MText>
          </>
        </Radio>
        <Radio status={'success'} disabled={disabled}>
          <>
            <MText style={{ marginLeft: 10 }}>Keep the Unlimted Allowance</MText>
          </>

        </Radio>
      </RadioGroup>
    </MVStack>
  )
}