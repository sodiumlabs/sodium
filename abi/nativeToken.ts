import { BigNumber } from "ethers";
import { Transaction } from '@0xsodium/transactions';
import { AddressZero, ERC20OrNativeTokenMetadata } from "@0xsodium/utils";
import { getNetwork } from '../lib/network';

export type NativeTransfer = {
    to: string,
    amount: BigNumber,
    token: ERC20OrNativeTokenMetadata
}

export const decodeNativeTokenTransfer = (tx: Transaction, chainId: number): NativeTransfer => {
    const network = getNetwork(chainId);

    return {
        to: tx.to,
        amount: BigNumber.from(tx.value),
        token: {
            address: AddressZero,
            chainId: chainId,
            isNativeToken: true,
            name: network.name,
            symbol: network.nativeTokenSymbol,
            decimals: 18,
            centerData: network.centerData
        }
    }
}

export const checkIsNativeTokenTransfer = (tx: Transaction): boolean => {
    return tx.data == "0x" && BigNumber.from(tx.value).gt(0)
}