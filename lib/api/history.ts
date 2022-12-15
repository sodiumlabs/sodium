
import { ChainIdLike } from "@0xsodium/network";
import { TransactionHistory } from "@0xsodium/provider";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { getPageDatas } from "../common/common";
import { classifyHistory } from "../common/history";
import { getScroller } from "../common/scroller";
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

export const useQueryHistory = (chainId?: ChainIdLike, tokenAddress?: string, tokenId?: string): [UseInfiniteQueryResult, Map<string, TransactionHistory[]>, (event) => void] => {
  // return useQuery(['fetchHistory'], () => fetchHistory());
  const queryHistory = useInfiniteQuery(
    [
      "fetchHistory",
      chainId,
      tokenAddress,
      tokenId
    ],
    ({ pageParam = 1 }) => fetchHistory(pageParam, chainId, tokenAddress, tokenId),
    { getNextPageParam: (lastPage, pages) => lastPage['nexePage'] }
  );

  let transHistoryMap: Map<string, TransactionHistory[]> = null;
  if (queryHistory.isSuccess) {
    transHistoryMap = classifyHistory(getPageDatas(queryHistory.data));
  }
  const onScroll = getScroller(() => !queryHistory.isLoading && queryHistory.hasNextPage && queryHistory.fetchNextPage());

  // group
  return [queryHistory, transHistoryMap, onScroll];
};


