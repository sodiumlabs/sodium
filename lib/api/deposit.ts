import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { IDepositItemData } from "../define";
import { useQueryNetwork } from "./network";

export type ApisRequestWyreDepositResponse = {
  url: string;
};


export type ApisGetWyreDepositCurrenciesResponse = {
  canBuyTokens: Array<{
    icon: string;
    name: string;
  }>;
  receiveCurrencies: Array<{
    icon: string;
    name: string;
  }>;
};

export type RequestWyrePreDepositInput = {
  amount: number;
  destCurrency: string;
  networkId: number;
  sourceCurrency: string;
};


export type RequestWyreDepositInput = {
  amount: number;
  destCurrency: string;
  networkId: number;
  sourceCurrency: string;
};


export type WyrePreReserveResponse = {
  destAmount: number;
  exchangeRate: number;
  fees: Record<string, number>;
};


const fetchDeposit = async (chainId: number): Promise<IDepositItemData[]> => {
  // const currentResults = await WalletService.getWyreDepositCurrencies(chainId);
  const currentResults = { "receiveCurrencies": [{ "name": "USD", "icon": "" }, { "name": "EUR", "icon": "" }, { "name": "GBP", "icon": "" }], "canBuyTokens": [{ "name": "MATIC", "icon": "https://etherscan.io/token/images/polygonnew_32.png" }, { "name": "USDC", "icon": "https://meland.ai/centre-usdc_28.webp" }] };
  const depositItems = [] as IDepositItemData[];
  depositItems.push({
    name: 'Wyre',
    paywiths: ['Apple Pay', 'Debit', 'Credit Card'],
    fee: '3%',
    limit: '$500/week',
    currencies: currentResults.canBuyTokens.map(curr => curr.name)
    // currencies: ['token1', 'token2', 'token3']
  });
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



export const fetchDepositUrl = async ({ queryKey }): Promise<ApisRequestWyreDepositResponse> => {
  // await waitTime(2000);
  const param = queryKey[1] as RequestWyreDepositInput;
  // const result = WalletService.requestWyreDeposit(param);
  const result = { url: "www.google.com" };
  return result;
}

export const fetchWyreDepositCurrencies = async ({ queryKey }): Promise<ApisGetWyreDepositCurrenciesResponse> => {
  const networkId = queryKey[1] as number;
  // const result = await WalletService.getWyreDepositCurrencies(networkId);
  const result = { "receiveCurrencies": [{ "name": "USD", "icon": "" }, { "name": "EUR", "icon": "" }, { "name": "GBP", "icon": "" }], "canBuyTokens": [{ "name": "MATIC", "icon": "https://etherscan.io/token/images/polygonnew_32.png" }, { "name": "USDC", "icon": "https://meland.ai/centre-usdc_28.webp" }] };
  return result;
}
export const fetchWyrePreDeposit = async ({ queryKey }): Promise<WyrePreReserveResponse> => {
  const param = queryKey[1] as RequestWyrePreDepositInput;
  // const result = await WalletService.requestWyrePreDeposit(param);
  const result = { "fees": { "MATIC": 5.4751320822e-8, "USD": 5 }, "exchangeRate": 1.258919481096297, "destAmount": 6.2945973507301645 };
  return result;
}

