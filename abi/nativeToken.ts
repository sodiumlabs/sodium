import { BigNumber, Transaction } from "ethers";

export type NativeTransfer = {
    to: string,
    amount: BigNumber
}

export const decodeNativeTokenTransfer = (tx: Transaction): NativeTransfer => {
    return {
        to: tx.to,
        amount: tx.value
    }
}

export const checkIsNativeTokenTransfer = (tx: Transaction): boolean => {
    return tx.data == "0x" && tx.value.gt(0)
}