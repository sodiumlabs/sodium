import { Web3Signer } from "@0xsodium/provider";
import { flattenAuxTransactions, Transaction, Transactionish } from "@0xsodium/transactions";
import { checkIsERC20Transfer, decodeERC20Transfer } from "../../abi";
import { checkIsERC20Approve, decodeERC20Approve } from '../../abi/erc20';
import { checkIsNativeTokenTransfer, decodeNativeTokenTransfer } from "../../abi/nativeToken";
import { Contract, IDecodeTranscation } from "../define";


export async function decodeTransactionRequest(txn: Transactionish, web3signer: Web3Signer, chainId: number) {
  const txs = flattenAuxTransactions(txn) as Transaction[];
  const decodes: IDecodeTranscation[] = [];
  for (let tx of txs) {
    await decodeTx(decodes, tx, web3signer, chainId);
  }
  return decodes;
}

async function getContractInfo(contractAddress: string, chainId: number): Promise<Contract | null> {
  const response = await fetch(`https://subgraph-fallback.vercel.app/api/abi3?chainId=${chainId}&contractAddress=${contractAddress}`);
  const data = await response.json();
  if (data.error) {
    return null;
  }
  return {
    contractName: data.ContractName,
    abi: data.ABI,
  }
}

async function decodeTx(decodes: IDecodeTranscation[], tran: Transaction, web3signer: Web3Signer, chainId?: number): Promise<void> {
  const decodeData = {
    'originTxReq': tran,
  } as IDecodeTranscation;
  if (checkIsERC20Transfer(tran)) {
    decodeData.decodeTransferData = await decodeERC20Transfer(tran, web3signer, chainId);
    decodes.push(decodeData);
  } else if (checkIsNativeTokenTransfer(tran)) {
    decodeData.decodeTransferData = decodeNativeTokenTransfer(tran, chainId);
    decodes.push(decodeData);
  } else if (checkIsERC20Approve(tran)) {
    decodeData.decodeApproveData = await decodeERC20Approve(tran, web3signer, chainId);
    decodes.push(decodeData);
  } else {
    const contractInfo = await getContractInfo(tran.to, chainId);
    if (contractInfo != null) {
      decodeData.contractInfo = contractInfo;
    }
    decodes.push(decodeData);
  }
}
