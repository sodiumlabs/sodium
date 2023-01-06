import { Transaction } from '@0xsodium/transactions';
import { Signer } from "@0xsodium/wallet";
import { BigNumber } from "@ethersproject/bignumber";
import { BigNumberish } from 'ethers';
import { useCallback, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { ERC20__factory } from '../../gen';
import { useQueryTokens } from "../../lib/api/tokens";
import { formatPrice2Wei } from '../../lib/common/common';
import { useAuth } from '../../lib/data/auth';
import { fixWidth, IUserTokenInfo } from "../../lib/define";
import { useDimensionSize } from '../../lib/hook/dimension';
import { BaseScreen } from "../base/baseScreen";
import Information from '../base/information';
import { showUpdateSignTranscationModal } from '../base/modalInit';
import { Spacer } from '../base/spacer';
import MButton from "../baseUI/mButton";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from '../baseUI/screenTitle';
import { TokenDropdown } from "../dropdown/tokenDropdownV2";
import { eColor, globalStyle } from '../../lib/globalStyles';
import { MButtonText } from '../baseUI/mButtonText';

export function SendScreen() {
  const authData = useAuth();
  const dimension = useDimensionSize();
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [selectedOption, setSelectedOption] = useState<IUserTokenInfo>(null);
  const [inputAddress, setInputAddress] = useState('');
  const [inputTokenCount, setInputTokenCount] = useState('');
  const [isCanSend, setIsCanSend] = useState(false);

  const onChangeAddressText = (text: string) => {
    setInputAddress(text.trim());
  }
  const onChangeTokenCountText = (text: string) => {
    if (!/^[0-9 .]*$/.test(text)) {
      return;
    }
    setInputTokenCount(text.trim());
  }

  // 例子
  const sendNativeToken = useCallback(async (to: string, amount: BigNumberish) => {
    if (authData.isLogin) {
      const tx: Transaction = {
        to: to,
        value: amount,
        data: "0x"
      }
      const txr = await authData.web3signer.sendTransaction(tx);
      await txr.wait();
    }
  }, [authData])

  const sendERC20Token = useCallback(async (to: string, tokenAddress: string, amount: BigNumberish) => {
    if (authData.isLogin) {
      const erc20 = ERC20__factory.connect(tokenAddress, authData.web3signer as unknown as Signer);
      const txr = await erc20.transfer(to, amount);
      await txr.wait();
    }
  }, [authData])
  const checkIsFit = useCallback(() => {
    if (!selectedOption) return false;
    if (!inputTokenCount) return;
    if (!inputAddress) return;

    if (!/^\d+(\.\d+)?$/.test(inputTokenCount) || +inputTokenCount <= 0) {
      console.log('The quantity format is incorrect');
      return false;
    }
    if (!/^0x[0-9a-fA-F]{40}$/.test(inputAddress)) {
      console.log('The address format is incorrect');
      return false;
    }
    return true;
  }, [selectedOption, inputTokenCount, inputAddress]);

  useEffect(() => {
    const isFit = checkIsFit();
    setIsCanSend(isFit);
  }, [checkIsFit]);

  const sendClick = () => {
    if (!isCanSend) {
      return;
    }
    const lowerCaseAddress = inputAddress.toLocaleLowerCase();

    const sendWei = BigNumber.from(formatPrice2Wei(inputTokenCount, selectedOption.token.decimals));
    if (selectedOption.token.isNativeToken) {
      sendNativeToken(lowerCaseAddress, sendWei);
    } else {
      sendERC20Token(lowerCaseAddress, selectedOption.token.address, sendWei);
    }
    showUpdateSignTranscationModal(true, null);
  }

  const sendStyle = {
    backgroundColor: isCanSend ? eColor.Blue : eColor.Black
  }

  const isShowCountInputError = inputTokenCount != "" && !/^\d+(\.\d+)?$/.test(inputTokenCount);
  const isShowAddressInputError = inputAddress != "" && !/^0x[0-9a-fA-F]{40}$/.test(inputAddress);

  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Send" />
            <MVStack style={[styles.send, globalStyle.whiteBorderWidth]} stretchW>
              <TokenDropdown options={tokenInfos} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
              <MInput style={{ marginTop: 10 }} keyboardType='numeric' placeholder="Quantity"
                placeholderTextColor={eColor.GrayText} onChangeText={onChangeTokenCountText}
                value={inputTokenCount} errorTip={isShowCountInputError ? "Please enter the correct quantity" : ""} />
            </MVStack>
            <MText style={{ marginVertical: 20, fontWeight: '700' }}>To</MText>
            <MInput placeholder="Address (0x…) or ENS name" placeholderTextColor={eColor.GrayText}
              onChangeText={onChangeAddressText} value={inputAddress}
              errorTip={isShowAddressInputError ? "Please enter the correct address" : ""} />
            <MButton stretchW onPress={sendClick} style={[{ marginVertical: 20, height: 45 }, sendStyle]} >
              <MButtonText title={"Continue"} />
            </MButton>
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
  send: {
    zIndex: 10,
    padding: 15,
  }
});