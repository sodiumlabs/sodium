import { Web3Signer } from "@0xsodium/provider";
import { flattenAuxTransactions, Transaction, TransactionRequest } from "@0xsodium/transactions";
import { checkIsERC20Transfer, decodeERC20Transfer } from "../../abi";
import { ERC20Transfer } from "../../abi/index";
import { checkIsNativeTokenTransfer, decodeNativeTokenTransfer } from "../../abi/nativeToken";
import { IDecodeTranscation } from "../define";
import { checkIsERC20Approve, decodeERC20Approve, ERC20Approve } from '../../abi/erc20';


export async function decodeTransactionRequest(txn: TransactionRequest, web3signer: Web3Signer, chainId?: number) {
  const txs = flattenAuxTransactions(txn) as Transaction[];
  const decodes: IDecodeTranscation[] = [];
  for (let tx of txs) {
    const decodeTsfData = await decodeTransfer(tx, web3signer, chainId);
    const decodeApproveData = await decodeApprove(tx, web3signer, chainId);
    const decodeData = {
      'originTxReq': tx,
      'decodeTransferData': decodeTsfData,
      'decodeApproveData': decodeApproveData,
      // 'decodeStr': !decodeTsfData && !decodeApproveData && tx.data.toString().slice(0, 10)
    } as IDecodeTranscation;
    if (decodeApproveData) {
      decodes.unshift(decodeData);
    }
    else {
      decodes.push(decodeData);
    }
  }

  console.log("decodeTransactionRequest decodes:");
  console.log(decodes);
  return decodes;
}

async function decodeTransfer(tran: Transaction, web3signer: Web3Signer, chainId?: number): Promise<ERC20Transfer> {
  let decodeData = null;
  if (checkIsERC20Transfer(tran)) {
    decodeData = await decodeERC20Transfer(tran, web3signer, chainId);
  }
  else if (checkIsNativeTokenTransfer(tran)) {
    decodeData = decodeNativeTokenTransfer(tran, chainId);
  }
  return decodeData;
}


async function decodeApprove(tran: Transaction, web3signer: Web3Signer, chainId?: number): Promise<ERC20Approve> {
  let decodeData = null;
  if (checkIsERC20Approve(tran)) {
    decodeData = await decodeERC20Approve(tran, web3signer, chainId);
  }
  return decodeData;
}