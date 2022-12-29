import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useAuth } from "../data/auth";
import { IDepositItemData, IDepositToken, ISelectItemData } from "../define";
import { GetWyreDepositCurrenciesReturn, RequestWyreDepositArgs, RequestWyreDepositReturn, RequestWyrePreDepositArgs, RequestWyrePreDepositReturn, WyreService } from "../wyre";
import { useQueryNetwork } from "./network";

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
  console.log("fetchDeposit");
  console.log(depositItems);
  return depositItems;
}

export const useQueryDeposit = (): [UseQueryResult, IDepositItemData[]] => {
  const [queryNetwork, network] = useQueryNetwork();
  const depositQuery = useQuery(["fetchDeposit", network?.chainId], () => fetchDeposit(network?.chainId), { enabled: false });
  useEffect(() => {
    if (network?.chainId) {
      depositQuery.remove();
      depositQuery.refetch();
    }
  }, [network?.chainId])
  return [depositQuery, depositQuery.data];
};


// ***************************************Deposit Url***********************************************
const fetchDepositUrl = async (param: RequestWyreDepositArgs): Promise<RequestWyreDepositReturn> => {
  // debugger
  const result = WyreService.instance.requestWyreDeposit(param);
  console.log("fetchDepositUrl");
  console.log(result);
  return result;
}


export const useQueryDepositUrl = (youPayTokenCount: number, curYouPayTokenData: IDepositToken, curYouBuyTokenData: IDepositToken): [UseQueryResult, RequestWyreDepositReturn] => {
  const [queryNetwork, network] = useQueryNetwork();
  const auth = useAuth();
  const param = {
    'request': {
      'amount': +youPayTokenCount,
      'destCurrency': curYouBuyTokenData?.tokenID,
      'networkId': network?.chainId + '',
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
  console.log("fetchWyreDepositCurrencies");
  console.log(result);
  return result;
}


export const useQueryDepositCurrencies = (): [UseQueryResult, ISelectItemData[], ISelectItemData[], Dispatch<SetStateAction<ISelectItemData[]>>, Dispatch<SetStateAction<ISelectItemData[]>>] => {
  const [queryNetwork, network] = useQueryNetwork();
  const [youBuyTokens, setYouBuyTokens] = useState<ISelectItemData[]>(null);
  const [youPayTokens, setYouPayTokens] = useState<ISelectItemData[]>(null);
  const depositCurrenciesQuery = useQuery(["fetchWyreDepositCurrencies"], () => fetchWyreDepositCurrencies(), { enabled: false });
  useEffect(() => {
    if (network?.chainId) {
      depositCurrenciesQuery.remove();
      depositCurrenciesQuery.refetch();
    }
  }, [network?.chainId])


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
  console.log("fetchWyrePreDeposit");
  console.log(result);
  return result;
}


export const useQueryPreDeposit = (youPayTokenCount: number, curYouPayTokenData: IDepositToken, curYouBuyTokenData: IDepositToken): [UseQueryResult, RequestWyrePreDepositReturn] => {
  const AtLeastAmount = 10;
  const [queryNetwork, network] = useQueryNetwork();
  const auth = useAuth();
  const param = {
    'request': {
      'amount': youPayTokenCount,
      'networkId': network?.chainId + '',
      'sourceCurrency': curYouPayTokenData?.tokenID,
      'destCurrency': curYouBuyTokenData?.tokenID,
      'walletAddress': auth.blockchainAddress
    }
  } as RequestWyrePreDepositArgs;
  const preDepositQuery = useQuery(['fetchWyrePreDeposit', param], () => fetchWyrePreDeposit(param), { enabled: false });

  useEffect(() => {
    if (!youPayTokenCount) return;
    if (+youPayTokenCount < AtLeastAmount) return;
    if (!network?.chainId) return;
    if (!curYouPayTokenData?.tokenID) return;
    if (!curYouBuyTokenData?.tokenID) return;
    // preDepositQuery.remove();
    preDepositQuery.refetch();

  }, [youPayTokenCount, network?.chainId, curYouPayTokenData?.tokenID, curYouBuyTokenData?.tokenID])


  return [preDepositQuery, preDepositQuery.data];
};