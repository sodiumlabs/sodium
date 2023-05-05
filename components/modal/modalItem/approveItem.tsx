import { FixedNumber } from '@ethersproject/bignumber';
import { BigNumber } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { ERC20Approve } from "../../../abi/erc20";
import { useQueryToken } from '../../../lib/api/tokens';
import { formatWei2Price, removeAllDecimalPoint } from '../../../lib/common/common';
import { Logger } from '../../../lib/common/utils';
import { useAuth } from "../../../lib/data/auth";
import { eApproveType } from "../../../lib/define";
import { eColor } from '../../../lib/globalStyles';
import { IconTokenDefault } from '../../../lib/imageDefine';
import { BaseFoldFrame } from "../../base/baseFoldFrame";
import MAvatar from '../../baseUI/mAvatar';
import { MDivider } from '../../baseUI/mDivider';
import MHStack from "../../baseUI/mHStack";
import MImage from "../../baseUI/mImage";
import MPressable from '../../baseUI/mPressable';
import MSlider from '../../baseUI/mSlider';
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import { MRadioItem } from '../../item/radioItem';


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
  const [tokensQuery, approveTokenData] = useQueryToken(approveData.token.address, approveData.token.chainId);
  // const projectSetting = useProjectSetting();

  // slider dislocation problem can be temporarily resolved by resizeTo resizing the browser, but it is limited to Windows and cannot be used for iframe
  // useEffect(() => {
  //   if (projectSetting.isBeOpenedByThirdParty) {
  //     if (projectSetting.isBeOpenByWindow) {
  //       window.resizeTo(window.outerWidth + 1, window.outerHeight);
  //       Logger.debug(`window resizeTo window.outerWidth: ${window.outerWidth}  window.outerHeight: ${window.outerHeight}`);
  //     } else if (projectSetting.isBeOpenByIframe) {
  //       window.resizeTo(window.outerWidth + 1, window.outerHeight);
  //       Logger.debug(`iframe resizeTo window.outerWidth: ${window.outerWidth}  window.outerHeight: ${window.outerHeight}`);
  //     }
  //   }
  // }, [projectSetting.isBeOpenedByThirdParty])

  const [approveValue, setApproveValue] = useState('Unlimted');
  const onSliderValueChange = (progress: number) => {
    setApproveSliderValue(progress);
  }

  useEffect(() => {
    if (approveTokenData == null) {
      return;
    }
    const balancePrice = formatWei2Price(approveTokenData.balance.toString(), approveTokenData.token.decimals, 2);
    if (approveSelectedIndex == eApproveType.SetAllowance) { // 
      if (approveSliderValue >= 1) {
        setApproveValue(balancePrice);
      } else {
        // const bigFixed = FixedNumber.from(MaxBigNumber.toString());
        const bigSlider = FixedNumber.fromString(approveSliderValue.toFixed(2));
        const approveNum = BigNumber.from(removeAllDecimalPoint(FixedNumber.from(approveTokenData.balance.toString()).mulUnsafe(bigSlider).toString()));
        Logger.debug("bigSlider:" + bigSlider + "  approveData.token.decimals:" + approveData.token.decimals);
        Logger.debug("approveNum:" + approveNum);
        setApproveValue(formatWei2Price(approveNum.toString(), approveData.token.decimals, 2));
      }
    }
    else if (approveSelectedIndex == eApproveType.RevokeAfter) {
      setApproveValue("Unlimted");
    }


  }, [approveSelectedIndex, approveSliderValue, approveTokenData]);

  // The confused slider must be used this way, not directly mounted to the view (slider offset will occur).
  const sliderBox = useMemo(() => {
    return <MSlider onSliderValueChange={onSliderValueChange} value={approveSliderValue} />
  }, [approveSliderValue]);
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
          <RadioGroup approveSelectedIndex={approveSelectedIndex} setApproveSelectedIndex={setApproveSelectedIndex} disabled={disabled} sliderBox={sliderBox} />
        </>
      }
    </BaseFoldFrame>
  )
}

function RadioGroup(props: { approveSelectedIndex, setApproveSelectedIndex, disabled, sliderBox }) {
  const { approveSelectedIndex, setApproveSelectedIndex, disabled, sliderBox } = props;
  const types = ["Set the Maximum Allowance", "Revoke Immediately After This Transaction", "Set the Unlimted Allowance"];
  return (
    <MVStack >
      {
        types.map((item: string, index) => {
          const isSelected = approveSelectedIndex == index;
          return (
            <MVStack stretchW>
              <MPressable disabled={disabled} key={item} onPress={() => { setApproveSelectedIndex(index) }} style={{ flexDirection: 'row', marginVertical: 8, width: '100%' }} >
                <MRadioItem checked={isSelected} />
                <MText style={{ marginLeft: 10, color: isSelected ? eColor.Blue : eColor.Blackest }} >{item}</MText>
              </MPressable>
              <MHStack style={{ paddingHorizontal: 25 }}>
                {
                  index == 0 && (sliderBox)
                }
              </MHStack>
            </MVStack>
          )
        })
      }
    </MVStack>
  )
}