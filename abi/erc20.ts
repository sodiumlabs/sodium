import { Transaction } from '@0xsodium/transactions';
import { BigNumber } from 'ethers';
import { ERC20__factory } from '../gen';
import { ERC20OrNativeTokenMetadata } from '@0xsodium/utils';
import { Web3Signer } from '@0xsodium/provider';

export type ERC20Transfer = {
    to: string,
    amount: BigNumber,
    token: ERC20OrNativeTokenMetadata
}

export const decodeERC20Transfer = async (tx: Transaction, web3signer: Web3Signer, chainId?: number): Promise<ERC20Transfer> => {
    const erc20Interface = ERC20__factory.createInterface();
    const result = erc20Interface.decodeFunctionData("transfer", tx.data);
    const erc20Address = tx.to;
    const tokenInfo = await web3signer.getToken(erc20Address, chainId)
    return {
        to: result[0],
        amount: BigNumber.from(result[1]),
        token: tokenInfo
    }
}

export const checkIsERC20Transfer = (tx: Transaction): boolean => {
    // 0x+keccak256("transfer(address,uint256)"").slice(0, 8)
    const transferMethodPrefix = "0xa9059cbb";
    return tx.data.toString().startsWith(transferMethodPrefix);
}