import { BigNumber } from "ethers";
import { Transaction } from '@0xsodium/transactions';
import { AddressZero, ERC20OrNativeTokenMetadata } from "@0xsodium/utils";

export type NativeTransfer = {
    to: string,
    amount: BigNumber,
    token: ERC20OrNativeTokenMetadata
}

export const decodeNativeTokenTransfer = (tx: Transaction, chainId: number): NativeTransfer => {
    return {
        to: tx.to,
        amount: BigNumber.from(tx.value),

        // TODO 支持多网络时改为在 @0xsodium/network 中配置
        token: {
            address: AddressZero,
            chainId: 1337,
            isNativeToken: true,
            name: "Polygon",
            symbol: "MATIC",
            decimals: 18,
            centerData: {
              website: "https://polygon.technology/",
              description: "Matic Network provides scalable, secure and instant Ethereum transactions. It is built on an implementation of the PLASMA framework and functions as an off chain scaling solution. Matic Network offers scalability solutions along with other tools to the developer ecosystem, which enable Matic to seamlessly integrate with dApps while helping developers create an enhanced user experience.",
              logoURI: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png"
            },
        }
    }
}

export const checkIsNativeTokenTransfer = (tx: Transaction): boolean => {
    return tx.data == "0x" && BigNumber.from(tx.value).gt(0)
}