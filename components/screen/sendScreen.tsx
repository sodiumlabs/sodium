import { Transaction } from '@0xsodium/transactions';
import { Signer } from "@0xsodium/wallet";
import { BigNumber } from "@ethersproject/bignumber";
import { BigNumberish } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet } from "react-native";
import { ERC20__factory } from '../../gen';
import { useQueryTokens } from "../../lib/api/tokens";
import { formatPrice2Wei, formatWei2Price, isMatchEnsAddress, isMatchEthAddress } from '../../lib/common/common';
import { useAuth } from '../../lib/data/auth';
import { showUpdateSignTranscationModal } from '../../lib/data/modal';
import { btnScale, fixWidth, IUserTokenInfo } from "../../lib/define";
import { eColor, globalStyle } from '../../lib/globalStyles';
import { useDimensionSize } from '../../lib/hook/dimension';
import { useCurrentChainId } from '../../lib/network';
import { BaseScreen } from "../base/baseScreen";
import Information from '../base/information';
import { Spacer } from '../base/spacer';
import { InputEndButton } from '../baseUI/inputEndButton';
import MButton from "../baseUI/mButton";
import { MButtonText } from '../baseUI/mButtonText';
import MHStack from '../baseUI/mHStack';
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from '../baseUI/screenTitle';
import { TokenDropdown } from "../dropdown/tokenDropdownV2";
import * as Clipboard from 'expo-clipboard';


export function SendScreen(props) {
  const currentChainId = useCurrentChainId();
  const authData = useAuth();
  const dimension = useDimensionSize();
  const defaultToken = props.route.params as IUserTokenInfo;
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens(currentChainId);
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
    if (!isMatchEthAddress(inputAddress) && !isMatchEnsAddress(inputAddress)) {
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

  const onQuantityMaxClick = () => {
    if (selectedOption) {
      setInputTokenCount(formatWei2Price(selectedOption.balance.toString(), selectedOption.token.decimals));
    }
  }

  const onAddressPasteClick = async () => {
    Clipboard.getStringAsync().then((content) => {
      setInputAddress(content || "");
    })

  }

  const sendStyle = {
    backgroundColor: isCanSend ? eColor.Blue : eColor.Black
  }

  const isShowCountInputError = inputTokenCount != "" && !/^\d+(\.\d+)?$/.test(inputTokenCount);
  const isShowAddressInputError = inputAddress != "" && !isMatchEthAddress(inputAddress) && !isMatchEnsAddress(inputAddress);

  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <ScreenTitle title="Send" />
            <MVStack style={[styles.send, globalStyle.whiteBorderWidth]} stretchW>
              <TokenDropdown options={tokenInfos} defaultOption={defaultToken} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
              <MHStack style={{ position: 'relative' }} >
                <MInput style={{ marginTop: 10, paddingRight: 90 }} keyboardType='numeric' placeholder="Quantity"
                  placeholderTextColor={eColor.GrayText} onChangeText={onChangeTokenCountText}
                  value={inputTokenCount} errorTip={isShowCountInputError ? "Please enter the correct quantity" : ""} />
                <InputEndButton style={{ position: 'absolute', right: 20, top: 30 }} onPress={onQuantityMaxClick} title='Max' />
              </MHStack>

            </MVStack>
            <MText style={{ marginVertical: 20, fontWeight: '700' }}>To</MText>
            <MHStack stretchW style={{ position: 'relative' }}>
              <MInput style={{ paddingRight: 90 }} placeholder="Address (0x…) or ENS name" placeholderTextColor={eColor.GrayText}
                onChangeText={onChangeAddressText} value={inputAddress}
                errorTip={isShowAddressInputError ? "Please enter the correct address" : ""} />
              <InputEndButton style={{ position: 'absolute', right: 20, top: 20 }} onPress={onAddressPasteClick} title='Paste' />
            </MHStack>

            <MButton
              scale={btnScale}
              stretchW onPress={sendClick} style={[{ marginVertical: 20, height: 45 }, sendStyle]}
              isBanHover={!isCanSend}>
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