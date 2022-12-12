import { BigNumber } from "ethers";
import { Transaction } from '@0xsodium/transactions';

export type NativeTransfer = {
    to: string,
    amount: BigNumber
}

export const decodeNativeTokenTransfer = (tx: Transaction): NativeTransfer => {
    return {
        to: tx.to,
        amount: BigNumber.from(tx.value)
    }
}

export const checkIsNativeTokenTransfer = (tx: Transaction): boolean => {
    return tx.data == "0x" && BigNumber.from(tx.value).gt(0)
}