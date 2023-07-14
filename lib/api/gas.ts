import { GasSuggest, TransactionRequest } from "@0xsodium/transactions";
import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useAuth } from '../data/authAtom';
import { AuthData, PaymasterInfo } from "../define";
import { Logger } from "../common/utils";
import { fetchTokens } from "./tokens";

const fetchGas = async (txn: TransactionRequest, authData: AuthData, chainId: number): Promise<PaymasterInfo[]> => {
  // const gasSuggest = await authData.web3signer.getGasSuggest() as GasSuggest;
  // Logger.debug("fetchGas GasSuggest");
  // Logger.debug(gasSuggest);
  // txn.maxPriorityFeePerGas = gasSuggest.fast.maxPriorityFeePerGas;
  // txn.maxFeePerGas = gasSuggest.fast.maxFeePerGas;

  const paymasterInfo = await authData.web3signer.getPaymasterInfos(txn) as PaymasterInfo[];
  for (let i = 0; i < paymasterInfo.length; i++) {
    const userInfos = await fetchTokens(paymasterInfo[i].token.address, paymasterInfo[i].token.chainId);
    const userInfo = userInfos.find((info) => info.token.symbol == paymasterInfo[i].token.symbol);
    paymasterInfo[i].userTokenInfo = userInfo;
  }
  return paymasterInfo;
};

export const useQueryGas = (txn: TransactionRequest, chainId: number): [UseQueryResult, PaymasterInfo[]] => {
  const authData = useAuth();
  const gasQuery = useQuery(['fetchGas', txn], () => fetchGas(txn, authData, chainId), { enabled: false });
  const paymasterInfos = gasQuery.data as PaymasterInfo[];

  useEffect(() => {
    if (txn && authData) {
      gasQuery.refetch();
    }
  }, [txn, authData]);
  return [gasQuery, paymasterInfos];
};


