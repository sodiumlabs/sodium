import { useQuery } from "react-query";
import { getAuth } from '../data/auth';
import { IUserTokenInfo } from "../define";
import { fetchTokenRates } from "./tokenRate";


const fetchTokens = async (): Promise<IUserTokenInfo[]> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  const result = await authData.web3signer.getTokens(authData.blockchainAddress) as IUserTokenInfo[];
  const rates = await fetchTokenRates(result);

  for (let i = 0; i < rates.length; i++) {
    result[i].rate = rates[i];
  }

  console.log("fetchTokens");
  console.log(result);

  return result;
};

export const useQueryTokens = () => {
  return useQuery(['fetchTokens'], () => fetchTokens());
};


