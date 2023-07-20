import { TransactionRequest } from "@0xsodium/transactions";
import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { authAtom, useAuth } from '../data/authAtom';
import { AuthData, PaymasterInfo } from "../define";
import { fetchTokens } from "./tokens";
import { getAllPaymasterAndData } from '../provider';
// // luausd
// _addToken(0x4F88D8d12f517AA41e23B32DABD23A2D7f2dF6Db);
// // usdt
// _addToken(0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9);
// // usdc
// _addToken(0xaf88d065e77c8cC2239327C5EDb3A432268e5831);
// // usdc.e
// _addToken(0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8);

const fetchGas = async (txn: TransactionRequest, authData: AuthData, chainId: number, estimateFailed: (msg: string) => void): Promise<PaymasterInfo[]> => {
  // const gasSuggest = await authData.web3signer.getGasSuggest() as GasSuggest;
  // Logger.debug("fetchGas GasSuggest");
  // Logger.debug(gasSuggest);
  // txn.maxPriorityFeePerGas = gasSuggest.fast.maxPriorityFeePerGas;
  // txn.maxFeePerGas = gasSuggest.fast.maxFeePerGas;
  return getAllPaymasterAndData(txn, authData, chainId, estimateFailed);
};

export const useQueryGas = (txn: TransactionRequest, chainId: number, estimateFailed: (msg: string) => void): [UseQueryResult, PaymasterInfo[]] => {
  const authData = useAuth();
  const gasQuery = useQuery(['fetchGas', txn], () => fetchGas(txn, authData, chainId, estimateFailed), { enabled: false });
  const paymasterInfos = gasQuery.data as PaymasterInfo[];

  useEffect(() => {
    if (txn && authData) {
      gasQuery.refetch();
    }
  }, [txn, authData]);
  return [gasQuery, paymasterInfos];
};


