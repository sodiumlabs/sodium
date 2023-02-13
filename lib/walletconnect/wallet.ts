import { initWallet, Wallet } from '@0xsodium/provider';
import { proxyChannel } from '../provider';
import { ScopeAsyncStorage } from '../common';

export async function createWallet(
    networkId: number | string,
    sessionId: string
): Promise<Wallet> {
    console.debug("sessionId", sessionId);
    const storage = new ScopeAsyncStorage(`wcs${sessionId}`)
    const wallet = await initWallet(networkId, {
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