import { flattenAuxTransactions, Transaction, TransactionRequest } from "@0xsodium/transactions";
import { checkIsERC20Transfer, decodeERC20Transfer } from "../../abi";
import { checkIsNativeTokenTransfer, decodeNativeTokenTransfer } from "../../abi/nativeToken";
import { IDecodeTranscation } from "../define";


export function decodeTransactionRequest(txn: TransactionRequest) {
  const decodes: IDecodeTranscation[] = [];
  const txs = flattenAuxTransactions(txn) as Transaction[];
  for (let tx of txs) {
    let decodeTransfer = null;
    if (checkIsERC20Transfer(tx)) {
      decodeTransfer = decodeERC20Transfer(tx);
    }
    else if (checkIsNativeTokenTransfer(tx)) {
      decodeTransfer = decodeNativeTokenTransfer(tx);
    } else {
      decodeTransfer = tx.data.slice(0, 10);
    }
    decodes.push(
      {
        'origin': tx,
        'decodeTransfer': decodeTransfer
      });
  }
  return decodes;
}