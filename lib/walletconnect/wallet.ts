import { initWallet, Wallet } from '@0xsodium/provider';
import { proxyChannel } from '../provider';
import { ScopeAsyncStorage } from '../common';

let wallet: Promise<Wallet>

export async function createWallet(
    networkId: number | string,
): Promise<Wallet> {
    const storage = new ScopeAsyncStorage(`wc`)
    if (wallet) {
        return wallet;
    }
    wallet = initWallet(networkId, {
        localStorage: storage,
        transports: {
            iframeTransport: {
                enabled: false
            },
            windowTransport: {
                enabled: false
            },
            proxyTransport: {
                enabled: true,
                appPort: proxyChannel.app
            }
        },
        defaultNetworkId: networkId
    })
    return wallet;
} 