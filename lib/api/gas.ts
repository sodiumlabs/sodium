

import { TransactionRequest } from "@0xsodium/transactions";
import { useQuery, UseQueryResult } from "react-query";
import { getAuth } from '../data/auth';
import { GasSuggest, PaymasterInfo } from "../define";



const fetchGas = async (txn: TransactionRequest): Promise<unknown[]> => {
  if (!txn) return;
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  console.log("fetchGas");
  // debugger
  const gasSuggest = await authData.web3signer.getGasSuggest() as GasSuggest;
  // console.log("gasSuggest" + gasSuggest);
  txn.maxPriorityFeePerGas = gasSuggest.rapid.maxPriorityFeePerGas;
  txn.maxFeePerGas = gasSuggest.rapid.maxFeePerGas;
  const paymasterInfo = await authData.web3signer.getPaymasterInfos(txn) as PaymasterInfo[];
  console.log("fetchGas result" + paymasterInfo);
  return paymasterInfo;
};

export const useQueryGas = (txn: TransactionRequest): [UseQueryResult, PaymasterInfo[]] => {
  const gasQuery = useQuery(['fetchGas', txn], () => fetchGas(txn));
  const paymasterInfos = gasQuery.data as PaymasterInfo[];
  return [gasQuery, paymasterInfos];
};


