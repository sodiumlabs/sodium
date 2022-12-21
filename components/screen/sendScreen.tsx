import { Transaction } from '@0xsodium/transactions';
import { Signer } from "@0xsodium/wallet";
import { BigNumber } from "@ethersproject/bignumber";
import { BigNumberish } from 'ethers';
import { useCallback, useState } from 'react';
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
import { TokenDropdown } from "../dropdown/tokenDropdown";

export function SendScreen() {
  const authData = useAuth();
  const dimension = useDimensionSize();
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [selectedOption, setSelectedOption] = useState<IUserTokenInfo>(null);
  const [inputAddress, setInputAddress] = useState('');
  const [inputTokenCount, setInputTokenCount] = useState('');

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

  const sendClick = () => {
    if (!selectedOption) return;

    if (!/^\d+(\.\d+)?$/.test(inputTokenCount) || +inputTokenCount <= 0) {
      console.error('The quantity format is incorrect');
      return;
    }
    if (!/^0x[0-9a-zA-Z]+$/.test(inputAddress)) {
      console.error('The address format is incorrect');
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

  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <MText style={{ marginVertical: 6 }}>Send</MText>
            <MVStack style={styles.send} stretchW>
              <TokenDropdown options={tokenInfos} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
              <MInput keyboardType='numeric' placeholder="quantity" onChangeText={onChangeTokenCountText} value={inputTokenCount} />
            </MVStack>
            <MText style={{ marginVertical: 20 }}>To</MText>
            <MInput placeholder="address" onChangeText={onChangeAddressText} value={inputAddress} />
            <MButton stretchW onPress={sendClick} style={{ marginVertical: 20 }} >
              <MText>Continue</MText>
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
    backgroundColor: 'rgba(200,200,200,1)',
    borderRadius: 15
  }
});