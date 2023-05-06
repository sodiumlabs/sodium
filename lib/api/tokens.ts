import { ChainIdLike } from "@0xsodium/network/dist/declarations/src/config";
import { useQuery, UseQueryResult } from "react-query";
import { token2Usd } from "../common/common";
import { Logger } from "../common/utils";
import { getAuth } from '../data/authAtom';
import { IUserTokenInfo } from "../define";
import { fetchTokenRates } from "./tokenRate";


export const fetchTokens = async (address: string, chainId: number): Promise<IUserTokenInfo[]> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  const result = await authData.web3signer.getTokens(address, chainId) as IUserTokenInfo[];
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
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  const tokensQuery = useQuery(['fetchTokens'], () => fetchTokens(authData.blockchainAddress, chainId), { refetchInterval: 2000 });
  const tokenInfos = tokensQuery.data as IUserTokenInfo[];
  let usdBalance = 0;
  if (tokenInfos) {
    usdBalance = tokenInfos.reduce<number>((pre, cur, index, arr) => {
      return pre + parseFloat(cur.usdBalance);
    }, 0);
  }
  return [tokensQuery, tokenInfos, usdBalance];
};





const fetchToken = async (tokenAddress: string, chainId: ChainIdLike): Promise<IUserTokenInfo> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  // const result = await authData.web3signer.getToken(tokenAddress, chainId) as ERC20OrNativeTokenMetadata;
  const results = await authData.web3signer.getTokens(authData.blockchainAddress, chainId) as IUserTokenInfo[];
  const token = results.find(item => {
    return item.token.address == tokenAddress && item.token.chainId == chainId;
  });
  Logger.debug("fetchToken");
  Logger.debug(token);

  return token;
};

export const useQueryToken = (tokenAddress: string, chainId: ChainIdLike): [UseQueryResult, IUserTokenInfo] => {
  const tokensQuery = useQuery(['fetchToken', tokenAddress, chainId], () => {
    console.log("fetchToken");
    return fetchToken(tokenAddress, chainId);
  });
  const tokenData = tokensQuery.data as IUserTokenInfo;
  return [tokensQuery, tokenData];
};