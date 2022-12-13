import { Transaction } from '@0xsodium/transactions';
import { Signer } from "@0xsodium/wallet";
import { BigNumberish } from 'ethers';
import { BigNumber } from "@ethersproject/bignumber";
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { ERC20__factory } from '../../gen';
import { useQueryTokens } from "../../lib/api/tokens";
import { useAuth } from '../../lib/data/auth';
import { IUserTokenInfo } from "../../lib/define";
import { BaseScreen } from "../base/baseScreen";
import MButton from "../baseUI/mButton";
import MHStack from "../baseUI/mHStack";
import MImage from "../baseUI/mImage";
import MInput from "../baseUI/mInput";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { TokenDropdown } from "../dropdown/TokenDropdown";
import { formatPrice2Wei } from '../../lib/common/common';

export function SendScreen() {
  const authData = useAuth();
  const [tokensQuery, tokenInfos, usdBalance] = useQueryTokens();
  const [selectedOption, setSelectedOption] = useState<IUserTokenInfo>(null);

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
    // () => sendNativeToken("0x714df076992f95E452A345cD8289882CEc6ab82F", 1000)
    if (selectedOption.token.isNativeToken) {
      sendNativeToken("0x714df076992f95E452A345cD8289882CEc6ab82F", BigNumber.from(formatPrice2Wei('1000', selectedOption.token.decimals)));
    } else {
      sendERC20Token("0x714df076992f95E452A345cD8289882CEc6ab82F", selectedOption.token.address, BigNumber.from(formatPrice2Wei("1000", selectedOption.token.decimals)));
    }
  }

  return (
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Send</MText>
          <MVStack style={styles.send} stretchW>
            <MHStack style={styles.sendCoin} stretchW>
              <MImage size={32} />
              <MVStack style={{ flex: 1 }}>
                <MHStack style={{ flex: 1 }}>
                  <MText>USDC</MText>
                  <MImage size={12} />
                  <MText>POLYGON</MText>
                </MHStack>
                <MHStack style={{ flex: 1 }}>
                  <MText>0.02223</MText>
                  <MText> MATIC</MText>
                  <MText> $1.8</MText>
                </MHStack>
              </MVStack>
            </MHStack>
            <TokenDropdown options={tokenInfos} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

            <MInput />
          </MVStack>
          <MText style={{ marginVertical: 20 }}>To</MText>
          <MInput placeholder="address" />
          <MButton onPress={sendClick} title={"Continue"} style={{ marginVertical: 20 }} />
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  send: {
    padding: 15,
    backgroundColor: '#666',
    borderRadius: 15
  },
  sendCoin: {
    paddingHorizontal: 15,
    marginBottom: 12
  }
});