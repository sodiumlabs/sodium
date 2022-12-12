import { useQuery } from "react-query";
import { token2Usd } from "../common/common";
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
    const tokenInfo = result[i];
    tokenInfo.rate = rates[i];
    tokenInfo.usdBalance = token2Usd(tokenInfo.balance.toString(), tokenInfo.rate + '');
  }

  console.log("fetchTokens");
  console.log(result);

  return result;
};

export const useQueryTokens = () => {
  return useQuery(['fetchTokens'], () => fetchTokens());
};


