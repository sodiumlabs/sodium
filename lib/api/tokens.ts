import { useQuery, UseQueryResult } from "react-query";
import { token2Usd } from "../common/common";
import { getAuth } from '../data/authAtom';
import { IUserTokenInfo } from "../define";
import { fetchTokenRates } from "./tokenRate";
import { Logger } from "../common/Logger";


const fetchTokens = async (chainId: number): Promise<IUserTokenInfo[]> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  const result = await authData.web3signer.getTokens(authData.blockchainAddress, chainId) as IUserTokenInfo[];
  const rates = await fetchTokenRates(result, chainId);

  for (let i = 0; i < rates.length; i++) {
    const tokenInfo = result[i];
    tokenInfo.rate = rates[i];
    tokenInfo.usdBalance = token2Usd(tokenInfo.balance.toString(), tokenInfo.token.decimals, tokenInfo.rate + '');
  }

  Logger.debug("fetchTokens");
  Logger.debug(result);

  return result;
};

export const useQueryTokens = (chainId: number): [UseQueryResult, IUserTokenInfo[], number] => {
  const tokensQuery = useQuery(['fetchTokens'], () => fetchTokens(chainId), { refetchInterval: 2000 });
  const tokenInfos = tokensQuery.data as IUserTokenInfo[];
  let usdBalance = 0;
  if (tokenInfos) {
    usdBalance = tokenInfos.reduce<number>((pre, cur, index, arr) => {
      return pre + parseFloat(cur.usdBalance);
    }, 0);
  }
  return [tokensQuery, tokenInfos, usdBalance];
};


