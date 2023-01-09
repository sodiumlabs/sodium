import { ChainIdLike } from "@0xsodium/network";
import { getAuth } from "../data/auth";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import { Allowance } from "@0xsodium/provider";
import { getScroller } from "../common/scroller";
import { getPageDatas } from "../common/common";

const onePageCount = 20;
const fetchAllowance = async (pageParam: number, chainId?: ChainIdLike): Promise<{ data: Allowance[], nexePage: number }|null> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return null;
  }

  const first = onePageCount;
  const skip = (pageParam - 1) * onePageCount;
  const result = await authData.web3signer.getAccountAllowances(skip, first, chainId) as unknown as Allowance[];
  let nextPage = null;
  if (result.length >= onePageCount) {
    nextPage = pageParam + 1;
  }

  return {
    data: result,
    nexePage: nextPage
  };
};

export const useQueryAllowances = (chainId?: ChainIdLike): [UseInfiniteQueryResult, Allowance[], (event) => void] => {
    // return useQuery(['fetchHistory'], () => fetchHistory());
    const queryAllowance = useInfiniteQuery(
      [
        "fetchAllowance",
        chainId,
      ],
      ({ pageParam = 1 }) => fetchAllowance(pageParam, chainId),
      { getNextPageParam: (lastPage, pages) => lastPage['nexePage'] }
    );
    let allowances: Allowance[] = [];
    if (queryAllowance.data) {
        allowances = getPageDatas(queryAllowance.data);
    }
    const onScroll = getScroller(() => !queryAllowance.isLoading && queryAllowance.hasNextPage && queryAllowance.fetchNextPage());
    // group
    return [queryAllowance, allowances, onScroll];
  };