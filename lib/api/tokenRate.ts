
import { useQuery } from "react-query";
import { getAuth } from '../data/auth';
import { IUserTokenInfo } from "../define";


export const fetchTokenRates = async (tokens: IUserTokenInfo[]): Promise<number[]> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }

  // const rates = await authData.web3signer.getTokenRates(["0x000"]) as number[];
  const rates = await authData.web3signer.getTokenRates(tokens.map(t => t.token.address)) as number[];
  console.log("fetchTokenRates");
  console.log(rates);
  return rates;
};

export const useQueryTokenRates = (tokens: IUserTokenInfo[]) => {
  return useQuery(['fetchTokenRates', tokens], () => fetchTokenRates(tokens));
};