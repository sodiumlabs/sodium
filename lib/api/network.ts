import { NetworkConfig } from "@0xsodium/network";



// export const networkAtom = computed<NetworkConfig, Atom<AuthData | null>>(authAtom, (auth) => {
//   if (auth) {

//   }
//   return {
//   } as NetworkConfig
// });

// const networkAtom = atom<NetworkConfig>();

// export const useNetwork = () => {
//   return useStore(networkAtom);
// }


import { useQuery, UseQueryResult } from "react-query";
import { getNetwork } from '../common/network';
import { getAuth } from '../data/auth';


export const fetchNetwork = async (): Promise<NetworkConfig> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }

  const chainId = await authData.wallet.getChainId();

  const network = getNetwork(chainId);
  console.log("fetchNetwork");
  console.log(network);
  return network;
};

export const useQueryNetwork = (): [UseQueryResult, NetworkConfig] => {
  const query = useQuery(['fetchNetwork'], () => fetchNetwork());
  const network = query.data as NetworkConfig;
  return [query, network];
};

