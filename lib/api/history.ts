
import { ChainIdLike } from "@0xsodium/network";
import { TransactionHistory } from "@0xsodium/provider";
import { useInfiniteQuery, useQuery } from "react-query";
import { getAuth } from '../data/auth';

const onePageCount = 20;
const fetchHistory = async (pageParam: number, chainId?: ChainIdLike, tokenAddress?: string, tokenId?: string): Promise<{ data: TransactionHistory[], nexePage: number }> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }

  const first = onePageCount;
  const skip = (pageParam - 1) * onePageCount;

  const result = await authData.web3signer.getTransactionHistories(skip, first, chainId, tokenAddress, tokenId) as unknown as TransactionHistory[];
  console.log(`fetchHistory page:${pageParam} first:${first} skip:${skip}`);
  console.log(result);

  let nextPage = null;
  if (result.length >= onePageCount) {
    nextPage = pageParam + 1;
  }

  return {
    data: result,
    nexePage: nextPage
  };
};

export const useQueryHistory = (chainId?: ChainIdLike, tokenAddress?: string, tokenId?: string) => {
  // return useQuery(['fetchHistory'], () => fetchHistory());
  return useInfiniteQuery(
    [
      "fetchHistory",
      chainId,
      tokenAddress,
      tokenId
    ],
    ({ pageParam = 1 }) => fetchHistory(pageParam, chainId, tokenAddress, tokenId),
    { getNextPageParam: (lastPage, pages) => lastPage['nexePage'] }
  );
};


