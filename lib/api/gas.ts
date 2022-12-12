

import { TransactionRequest } from "@0xsodium/transactions";
import { useQuery, UseQueryResult } from "react-query";
import { token2Usd } from "../common/common";
import { getAuth } from '../data/auth';
import { IUserTokenInfo } from "../define";
import { fetchTokenRates } from "./tokenRate";

// export declare type GasSuggest = {
//   standard: GasPrice;
//   fast: GasPrice;
//   rapid: GasPrice;
// };
// export declare type GasPrice = {
//   maxPriorityFeePerGas: BigNumber;
//   maxFeePerGas: BigNumber;
// };


const fetchGas = async (txn: TransactionRequest): Promise<unknown[]> => {
  if (!txn) return;
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  console.log("fetchGas");
  // debugger
  const gasSuggest = await authData.web3signer.getGasSuggest();
  // console.log("gasSuggest" + gasSuggest);
  txn.maxPriorityFeePerGas = gasSuggest.rapid.maxPriorityFeePerGas;
  txn.maxFeePerGas = gasSuggest.rapid.maxFeePerGas;

  const result = await authData.web3signer.getPaymasterInfos(txn);
  console.log("result" + result);
  return result;
};

export const useQueryGas = (txn: TransactionRequest): [UseQueryResult, unknown[]] => {
  const gasQuery = useQuery(['fetchGas', txn], () => fetchGas(txn));
  const paymasterInfos = gasQuery.data;
  return [gasQuery, paymasterInfos];
};


