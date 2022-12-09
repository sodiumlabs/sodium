import { networks } from "@0xsodium/network";


export function getBlockExplorer(chainId: string | number, address: string) {
  // chainId = 80001;
  // debugger
  const nets = networks;
  const network = nets[chainId];

  if (network) {
    const link = network.blockExplorer.rootUrl + 'address/' + address;
    console.log(link);
    return link;
  }
}