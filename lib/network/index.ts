import { testnetNetworks, mainnetNetworks } from '@0xsodium/network';

export function getDefaultChainId(): number {
    return testnetNetworks.find((n) => n.isDefaultChain).chainId;
}