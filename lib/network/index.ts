import { testnetNetworks, mainnetNetworks, NetworkConfig } from '@0xsodium/network';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import { Chain } from '@web3-onboard/common';

export const xtestNetworks = testnetNetworks.filter(n => n.name == "mumbai").map((n) => {
    return {
        ...n,
        isDefaultChain: true,
        isAuthChain: true,
        rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/fIbA8DRSTQXPAhcHKiPFo19SPqhHNHam",
        bundlerUrl: "https://bundler-mumbai.melandworld.com/",
    }
});

export const lumiHardhat: NetworkConfig = {
    title: "Lumi Hardhat",
    name: "lumi dev network",
    chainId: 31337,
    nativeTokenSymbol: "ETH",
    isDefaultChain: true,
    isAuthChain: true,
    rpcUrl: "http://18.142.121.214:8545",
    bundlerUrl: "http://bundler-lumidev.melandworld.com",
    centerData: {

    }
}

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

// export const networks = [...xmainNetworks, ...xtestNetworks];
export const networks = [lumiHardhat];
export const mainNetworks = networks;
export const testNetworks = [];

export const getWeb3OnboardNetworks = (): Chain[] => {
    return networks.map(n => {
        let blockExplorerUrl: string|undefined = undefined;

        if (n.blockExplorer) {
            blockExplorerUrl = n.blockExplorer.rootUrl;
        }

        return {
            namespace: "evm",
            id: `0x${n.chainId.toString(16)}`,
            rpcUrl: n.rpcUrl,
            token: n.nativeTokenSymbol,
            blockExplorerUrl: blockExplorerUrl
        } as Chain
    })
}

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
    if (!network.blockExplorer) {
        return undefined;
    }
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
