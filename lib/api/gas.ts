import { GasSuggest, TransactionRequest } from "@0xsodium/transactions";
import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useAuth } from '../data/authAtom';
import { AuthData, PaymasterInfo } from "../define";
import { Logger } from "../common/utils";

const fetchGas = async (txn: TransactionRequest, authData: AuthData): Promise<PaymasterInfo[]> => {
  Logger.debug("fetchGas");
  // const gasSuggest = await authData.web3signer.getGasSuggest() as GasSuggest;
  // Logger.debug("fetchGas GasSuggest");
  // Logger.debug(gasSuggest);
  // txn.maxPriorityFeePerGas = gasSuggest.fast.maxPriorityFeePerGas;
  // txn.maxFeePerGas = gasSuggest.fast.maxFeePerGas;

  const paymasterInfo = await authData.web3signer.getPaymasterInfos(txn) as PaymasterInfo[];
  Logger.debug("fetchGas result");
  Logger.debug(paymasterInfo);
  return paymasterInfo;
};

export const useQueryGas = (txn: TransactionRequest): [UseQueryResult, PaymasterInfo[]] => {
  const authData = useAuth();
  const gasQuery = useQuery(['fetchGas', txn], () => fetchGas(txn, authData), { enabled: false });
  const paymasterInfos = gasQuery.data as PaymasterInfo[];

  useEffect(() => {
    if (txn && authData) {
      gasQuery.refetch();
    }
  }, [txn, authData]);
  return [gasQuery, paymasterInfos];
};


