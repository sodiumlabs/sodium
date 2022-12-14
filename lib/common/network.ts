import { NetworkConfig, networks } from "@0xsodium/network";


export function getNetwork(chainId: string | number): NetworkConfig {
  const nets = networks;
  return nets[chainId];
}

export function getAddressExplorer(chainId: string | number, address: string) {
  const network = getNetwork(chainId);
  if (network) {
    const link = network.blockExplorer.rootUrl + 'address/' + address;
    console.log(link);
    return link;
  }
}


export function getTranscationExplorer(chainId: string | number, txn: string) {
  const network = getNetwork(chainId);
  if (network) {
    const link = network.blockExplorer.rootUrl + 'tx/' + txn;
    console.log(link);
    return link;
  }
}