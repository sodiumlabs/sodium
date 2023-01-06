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
    await decodeTx(decodes, tx, web3signer, chainId);
  }

  console.log("decodeTransactionRequest decodes:");
  console.log(decodes);
  return decodes;
}

async function decodeTx(decodes: IDecodeTranscation[], tran: Transaction, web3signer: Web3Signer, chainId?: number): Promise<void> {
  const decodeData = {
    'originTxReq': tran,
  } as IDecodeTranscation;

  if (checkIsERC20Transfer(tran)) {
    decodeData.decodeTransferData = await decodeERC20Transfer(tran, web3signer, chainId);
    decodes.push(decodeData);
  }
  else if (checkIsNativeTokenTransfer(tran)) {
    decodeData.decodeTransferData = decodeNativeTokenTransfer(tran, chainId);
    decodes.push(decodeData);
  }
  else if (checkIsERC20Approve(tran)) {
    decodeData.decodeApproveData = await decodeERC20Approve(tran, web3signer, chainId);
    decodes.unshift(decodeData);
  }
  else {
    decodeData.decodeStr = tran.data.toString().slice(0, 10);
    decodes.push(decodeData);
  }
}
