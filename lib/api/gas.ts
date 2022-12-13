

import { TransactionRequest } from "@0xsodium/transactions";
import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useAuth } from '../data/auth';
import { AuthData, PaymasterInfo } from "../define";



const fetchGas = async (txn: TransactionRequest, authData: AuthData): Promise<PaymasterInfo[]> => {
  console.log("fetchGas");
  // const gasSuggest = await authData.web3signer.getGasSuggest() as GasSuggest;
  // txn.maxPriorityFeePerGas = gasSuggest.rapid.maxPriorityFeePerGas;
  // txn.maxFeePerGas = gasSuggest.rapid.maxFeePerGas;

  const paymasterInfo = await authData.web3signer.getPaymasterInfos(txn) as PaymasterInfo[];
  console.log("fetchGas result");
  console.log(paymasterInfo);
  return paymasterInfo;
};

export const useQueryGas = (txn: TransactionRequest): [UseQueryResult, PaymasterInfo[]] => {
  const authData = useAuth();
  const gasQuery = useQuery(['fetchGas', txn], () => fetchGas(txn, authData), { enabled: false });
  const paymasterInfos = gasQuery.data as PaymasterInfo[];

  useEffect(() => {
    if (txn) {
      gasQuery.refetch();
    }
  }, [txn]);
  return [gasQuery, paymasterInfos];
};


