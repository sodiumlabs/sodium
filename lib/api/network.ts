import { NetworkConfig } from "@0xsodium/network";
import { useQuery, UseQueryResult } from "react-query";
import { getNetwork } from '../network';
import { getAuth } from '../data/authAtom';

export const fetchNetwork = async (): Promise<NetworkConfig> => {
  const authData = getAuth();
  if (!authData.isLogin) {
    return;
  }
  const chainId = await authData.signer.getChainId();
  const network = getNetwork(chainId);
  return network;
};

export const useQueryNetwork = (): [UseQueryResult, NetworkConfig] => {
  const query = useQuery(['fetchNetwork'], () => fetchNetwork());
  const network = query.data as NetworkConfig;
  return [query, network];
};

