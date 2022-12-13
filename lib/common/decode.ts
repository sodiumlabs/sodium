import { Web3Signer } from "@0xsodium/provider";
import { flattenAuxTransactions, Transaction, TransactionRequest } from "@0xsodium/transactions";
import { checkIsERC20Transfer, decodeERC20Transfer } from "../../abi";
import { checkIsNativeTokenTransfer, decodeNativeTokenTransfer } from "../../abi/nativeToken";
import { IDecodeTranscation } from "../define";


export async function decodeTransactionRequest(txn: TransactionRequest, web3signer: Web3Signer, chainId?: number) {
  const decodes: IDecodeTranscation[] = [];
  const txs = flattenAuxTransactions(txn) as Transaction[];

  for (let tx of txs) {
    let decodeTransfer = null;
    if (checkIsERC20Transfer(tx)) {
      decodeTransfer = await decodeERC20Transfer(tx, web3signer, chainId);
    }
    else if (checkIsNativeTokenTransfer(tx)) {
      decodeTransfer = decodeNativeTokenTransfer(tx, chainId);
    } else {
      decodeTransfer = tx.data.toString().slice(0, 10);
    }
    decodes.push(
      {
        'origin': tx,
        'decodeTransfer': decodeTransfer
      });
  }
  console.log("decodeTransactionRequest decodes:");
  console.log(decodes);
  return decodes;
}