
import { useQuery } from "react-query";
import { getAuth } from '../data/auth';
import { IUserTokenInfo } from "../define";

export const fetchTokenRates = async (tokens: IUserTokenInfo[], chaindId: number): Promise<number[]> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }

  const rates = await authData.web3signer.getTokenRates(tokens.map(t => t.token.address), chaindId) as number[];
  console.log("fetchTokenRates");
  console.log(rates);
  return rates;
};

export const useQueryTokenRates = (tokens: IUserTokenInfo[], chainId: number) => {
  return useQuery(['fetchTokenRates', tokens], () => fetchTokenRates(tokens, chainId));
};