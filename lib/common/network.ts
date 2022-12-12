import { NetworkConfig, networks } from "@0xsodium/network";


export function getNetwork(chainId: string | number): NetworkConfig {
  const nets = networks;
  return nets[chainId];
}

export function getBlockExplorer(chainId: string | number, address: string) {
  const network = getNetwork(chainId);
  if (network) {
    const link = network.blockExplorer.rootUrl + 'address/' + address;
    console.log(link);
    return link;
  }
}
