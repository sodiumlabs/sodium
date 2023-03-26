import { testnetNetworks, mainnetNetworks, NetworkConfig } from '@0xsodium/network';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';

export const xtestNetworks = testnetNetworks.filter(n => n.name == "mumbai").map((n) => {
    return {
        ...n,
        isDefaultChain: false,
        isAuthChain: false,
        rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/fIbA8DRSTQXPAhcHKiPFo19SPqhHNHam",
        bundlerUrl: "https://bundler-mumbai.melandworld.com/",
    }
});

// sodium test net
xtestNetworks.push({
    name: "sodiumt",
    title: "sodium test network",
    chainId: 777,
    nativeTokenSymbol: "TSODO",
    subgraphHost: "https://graphql-graph-node-sodiumt.melandworld.com",
    isDefaultChain: true,
    isAuthChain: true,
    rpcUrl: "http://18.141.11.82:26651",
    bundlerUrl: "https://bundler-sodiumt.melandworld.com/",
    blockExplorer: {
        name: 'SodiumtScan (Sodium TestNet)',
        rootUrl: "http://18.141.11.82:4000/",
    }
})

// TODO fix sodium.js
export const xmainNetworks = mainnetNetworks.filter(n => n.name == "polygon").map((n) => {
    return {
        ...n,
        isDefaultChain: false,
        isAuthChain: false,
        rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/y48IcelCwZwwppoj-CXBEwmIjBOZ2ZLt",
        bundlerUrl: "https://bundler-polygon.melandworld.com/",
    }
});

export const networks = [...xmainNetworks, ...xtestNetworks];
export const mainNetworks = networks;
export const testNetworks = [];

export const currentChainIdAtom = atom<number>(networks.find(n => n.isDefaultChain).chainId);

export function getCurrentChainId(): number {
    return currentChainIdAtom.get();
}

export function useCurrentChainId() {
    return useStore(currentChainIdAtom);
}

export function useMabyeCurrentChainId(mabyeChainId: number | undefined) {
    const currentChainId = useStore(currentChainIdAtom, undefined);
    if (mabyeChainId) {
        return mabyeChainId;
    }
    return currentChainId;
}

export function useCurrentNetwork() {
    const chainId = useCurrentChainId();
    return networks.find(n => n.chainId == chainId);
}

export function switchNetwork(chainId: number) {
    currentChainIdAtom.set(chainId);
}

export function getNetwork(chainId: number): NetworkConfig | undefined {
    return networks.find(n => n.chainId == chainId);
}

export function getAddressExplorer(chainId: number, address: string): string | undefined {
    const network = getNetwork(chainId);
    if (network) {
        const link = network.blockExplorer.rootUrl + 'address/' + address;
        return link;
    }
    return undefined;
}

export function getTranscationExplorer(chainId: number, txn: string): string | undefined {
    const network = getNetwork(chainId);
    if (network) {
        const link = network.blockExplorer.rootUrl + 'tx/' + txn;
        return link;
    }
    return undefined;
}