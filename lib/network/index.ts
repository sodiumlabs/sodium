import { testnetNetworks, mainnetNetworks } from '@0xsodium/network';
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

// TODO fix sodium.js
export const xmainNetworks = mainnetNetworks.filter(n => n.name == "polygon").map((n) => {
    return {
        ...n,
        isDefaultChain: true,
        isAuthChain: true,
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

export function switchNetwork(chainId: number) {
    currentChainIdAtom.set(chainId);
}