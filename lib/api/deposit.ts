import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { Logger } from "../common/utils";
import { useAuth } from "../data/auth";
import { IDepositItemData, IDepositToken, ISelectItemData } from "../define";
import { useCurrentChainId } from "../network";
import { GetWyreDepositCurrenciesReturn, RequestWyreDepositArgs, RequestWyreDepositReturn, RequestWyrePreDepositArgs, RequestWyrePreDepositReturn, WyreService } from "../wyre";

export const DepositAtLeastAmount = 10;
// ***************************************Deposit***********************************************

const fetchDeposit = async (chainId: number): Promise<IDepositItemData[]> => {
  // const currentResults = await WalletService.getWyreDepositCurrencies(chainId);
  const currentResults = await WyreService.instance.getWyreDepositCurrencies();
  // const currentResults = { "receiveCurrencies": [{ "name": "USD", "icon": "" }, { "name": "EUR", "icon": "" }, { "name": "GBP", "icon": "" }], "canBuyTokens": [{ "name": "MATIC", "icon": "https://etherscan.io/token/images/polygonnew_32.png" }, { "name": "USDC", "icon": "https://meland.ai/centre-usdc_28.webp" }] };
  const depositItems = [] as IDepositItemData[];
  depositItems.push({
    name: 'Wyre',
    paywiths: ['Apple Pay', 'Debit', 'Credit Card'],
    fee: '3%',
    limit: '$500/week',
    currencies: currentResults.canBuyTokens.map(curr => curr.name)
    // currencies: ['token1', 'token2', 'token3']
  });
  Logger.debug("fetchDeposit");
  Logger.debug(depositItems);
  return depositItems;
}

export const useQueryDeposit = (): [UseQueryResult, IDepositItemData[]] => {
  const chainId = useCurrentChainId();
  const depositQuery = useQuery(["fetchDeposit", chainId], () => fetchDeposit(chainId), { enabled: false });
  useEffect(() => {
    if (chainId) {
      depositQuery.remove();
      depositQuery.refetch();
    }
  }, [chainId])
  return [depositQuery, depositQuery.data];
};


// ***************************************Deposit Url***********************************************
const fetchDepositUrl = async (param: RequestWyreDepositArgs): Promise<RequestWyreDepositReturn> => {
  // debugger
  const result = WyreService.instance.requestWyreDeposit(param);
  Logger.debug("fetchDepositUrl");
  Logger.debug(result);
  return result;
}


export const useQueryDepositUrl = (youPayTokenCount: number, curYouPayTokenData: IDepositToken, curYouBuyTokenData: IDepositToken): [UseQueryResult, RequestWyreDepositReturn] => {
  const chainId = useCurrentChainId();
  const auth = useAuth();
  const param = {
    'request': {
      'amount': +youPayTokenCount,
      'destCurrency': curYouBuyTokenData?.tokenID,
      'networkId': chainId + '',
      'sourceCurrency': curYouPayTokenData?.tokenID,
      'walletAddress': auth.blockchainAddress
    }
  } as RequestWyreDepositArgs;
  const depositUrlQuery = useQuery(["fetchDepositUrl", param], () => fetchDepositUrl(param), { enabled: false });
  return [depositUrlQuery, depositUrlQuery.data];
};

// ***************************************Deposit Currencies***********************************************
const fetchWyreDepositCurrencies = async (): Promise<GetWyreDepositCurrenciesReturn> => {
  // const networkId = queryKey[1] as number;
  const result = await WyreService.instance.getWyreDepositCurrencies();
  // const result = { "receiveCurrencies": [{ "name": "USD", "icon": "" }, { "name": "EUR", "icon": "" }, { "name": "GBP", "icon": "" }], "canBuyTokens": [{ "name": "MATIC", "icon": "https://etherscan.io/token/images/polygonnew_32.png" }, { "name": "USDC", "icon": "https://meland.ai/centre-usdc_28.webp" }] };
  Logger.debug("fetchWyreDepositCurrencies");
  Logger.debug(result);
  return result;
}


export const useQueryDepositCurrencies = (): [UseQueryResult, ISelectItemData[], ISelectItemData[], Dispatch<SetStateAction<ISelectItemData[]>>, Dispatch<SetStateAction<ISelectItemData[]>>] => {
  const chainId = useCurrentChainId();
  const [youBuyTokens, setYouBuyTokens] = useState<ISelectItemData[]>(null);
  const [youPayTokens, setYouPayTokens] = useState<ISelectItemData[]>(null);
  const depositCurrenciesQuery = useQuery(["fetchWyreDepositCurrencies"], () => fetchWyreDepositCurrencies(), { enabled: false });
  useEffect(() => {
    if (chainId) {
      depositCurrenciesQuery.remove();
      depositCurrenciesQuery.refetch();
    }
  }, [chainId])


  useEffect(() => {
    if (depositCurrenciesQuery.data) {
      const canBuyTokens = depositCurrenciesQuery.data.canBuyTokens;
      const receiveCurrencies = depositCurrenciesQuery.data.receiveCurrencies;
      const initYouBuyTokens = [] as ISelectItemData[];
      for (let i = 0; i < canBuyTokens.length; i++) {
        initYouBuyTokens.push({
          isSelected: i == 0,
          data: { icon: canBuyTokens[i].icon, tokenID: canBuyTokens[i].name } as IDepositToken,
        })
      }
      setYouBuyTokens(initYouBuyTokens);

      const initYouPayTokens = [] as ISelectItemData[];
      for (let i = 0; i < receiveCurrencies.length; i++) {
        initYouPayTokens.push({
          isSelected: i == 0,
          data: { icon: receiveCurrencies[i].icon, tokenID: receiveCurrencies[i].name } as IDepositToken,
        })
      }
      setYouPayTokens(initYouPayTokens);

    }
  }, [depositCurrenciesQuery.data])

  return [depositCurrenciesQuery, youBuyTokens, youPayTokens, setYouBuyTokens, setYouPayTokens];
};

// ***************************************Pre Deposit***********************************************
const fetchWyrePreDeposit = async (param: RequestWyrePreDepositArgs): Promise<RequestWyrePreDepositReturn> => {
  const result = await WyreService.instance.requestWyrePreDeposit(param);
  // const result = { "fees": { "MATIC": 5.4751320822e-8, "USD": 5 }, "exchangeRate": 1.258919481096297, "destAmount": 6.2945973507301645 };
  Logger.debug("fetchWyrePreDeposit");
  Logger.debug(result);
  return result;
}


export const useQueryPreDeposit = (youPayTokenCount: number, curYouPayTokenData: IDepositToken, curYouBuyTokenData: IDepositToken): [UseQueryResult, RequestWyrePreDepositReturn] => {

  const chainId = useCurrentChainId();
  const auth = useAuth();
  const param = {
    'request': {
      'amount': youPayTokenCount,
      'networkId': chainId + '',
      'sourceCurrency': curYouPayTokenData?.tokenID,
      'destCurrency': curYouBuyTokenData?.tokenID,
      'walletAddress': auth.blockchainAddress
    }
  } as RequestWyrePreDepositArgs;
  const preDepositQuery = useQuery(['fetchWyrePreDeposit', param], () => fetchWyrePreDeposit(param), { enabled: false });

  useEffect(() => {
    if (!youPayTokenCount) return;
    if (+youPayTokenCount < DepositAtLeastAmount) return;
    if (!chainId) return;
    if (!curYouPayTokenData?.tokenID) return;
    if (!curYouBuyTokenData?.tokenID) return;
    // preDepositQuery.remove();
    preDepositQuery.refetch();

  }, [youPayTokenCount, chainId, curYouPayTokenData?.tokenID, curYouBuyTokenData?.tokenID])


  return [preDepositQuery, preDepositQuery.data];
};