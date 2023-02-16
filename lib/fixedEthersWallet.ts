import { Bytes, Wallet as EthersWallet } from 'ethers';
import { arrayify, joinSignature } from 'ethers/lib/utils';
import { toUtf8Bytes } from "@ethersproject/strings";

export class Wallet extends EthersWallet {
    async signMessage(message: string | Bytes): Promise<string> {
        console.debug("sign", message)
        // if (typeof message === "string") {
        //     message = toUtf8Bytes(message);
        // }
        return joinSignature(this._signingKey().signDigest((message)));
    }
}