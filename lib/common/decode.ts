import { Web3Signer } from "@0xsodium/provider";
import { flattenAuxTransactions, Transaction, TransactionRequest } from "@0xsodium/transactions";
import { checkIsERC20Transfer, decodeERC20Transfer } from "../../abi";
import { checkIsNativeTokenTransfer, decodeNativeTokenTransfer } from "../../abi/nativeToken";
import { IDecodeTranscation } from "../define";


export async function decodeTransactionRequest(txn: TransactionRequest, web3signer: Web3Signer, chainId?: number) {
  const decodes: IDecodeTranscation[] = [];
  const txs = flattenAuxTransactions(txn) as Transaction[];

  for (let tx of txs) {
    const decodeData = await decodeTransaction(tx, web3signer, chainId)
    decodes.push(
      {
        'origin': tx,
        'decodeTransfer': decodeData
      });
  }
  // console.log("decodeTransactionRequest decodes:");
  // console.log(decodes);
  return decodes;
}

export async function decodeTransaction(tran: Transaction, web3signer: Web3Signer, chainId?: number) {
  let decodeData = null;
  if (checkIsERC20Transfer(tran)) {
    decodeData = await decodeERC20Transfer(tran, web3signer, chainId);
  }
  else if (checkIsNativeTokenTransfer(tran)) {
    decodeData = decodeNativeTokenTransfer(tran, chainId);
  } else {
    decodeData = tran.data.toString().slice(0, 10);
  }
  return decodeData;
}