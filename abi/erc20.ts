import { Transaction } from '@0xsodium/transactions';
import { BigNumber } from 'ethers';
import { ERC20__factory } from '../gen';

export type ERC20Transfer = {
    to: string,
    amount: BigNumber
}

export const decodeERC20Transfer = (tx: Transaction): ERC20Transfer => {
    const erc20Interface = ERC20__factory.createInterface();
    const result = erc20Interface.decodeFunctionData("transfer", tx.data);
    return {
        to: result[0],
        amount: BigNumber.from(result[1])
    }
}

export const checkIsERC20Transfer = (tx: Transaction): boolean => {
    // 0x+keccak256("transfer(address,uint256)"").slice(0, 8)
    const transferMethodPrefix = "0xa9059cbb";
    return tx.data.toString().startsWith(transferMethodPrefix);
}