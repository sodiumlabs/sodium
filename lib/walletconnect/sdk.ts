import RNWalletConnect from "@walletconnect/client";
import { loadWalletConnectSessions } from "../common";
import { WalletConnectV1 } from './v1';
import { v2sdk, WalletConnectV2, init as v2Init } from './v2';
import { getWalletConnectLinkVersion } from './utils';

export function newPairV1(url: string, existing: boolean = false, existingSession: any = undefined): Promise<WalletConnectV1> {
    return new Promise((resolve, reject) => {
        try {
            // Create connector
            const connector = new RNWalletConnect(
                {
                    // Required
                    uri: url,
                    session: existingSession,
                    // Required
                    clientMeta: {
                        description: "WalletConnect Developer App",
                        url: "https://walletconnect.org",
                        icons: ["https://walletconnect.org/walletconnect-logo.png"],
                        name: "WalletConnect",
                    },
                }
            );

            console.debug("new pair", url);

            new WalletConnectV1(connector, existing, (w: WalletConnectV1) => {
                resolve(w);
            });
        } catch (error) {
            reject(error);
        }
    })
}

export async function newPair(url: string): Promise<void> {
    const version = getWalletConnectLinkVersion(url);

    if (version === "1") {
        return newPairV1(url, false, undefined).then();
    } else {
        const sdk = v2sdk.get();
        return sdk.core.pairing.pair({
            uri: url
        }).then();
    }
}

export async function init(): Promise<void> {
    try {
        await v2Init();
    } catch(error) {
        // TODO upsentry;
    }
    
    const sessions = await loadWalletConnectSessions();
    sessions.forEach(session => {
        if (session.version == "1") {
            newPairV1(session.connectURI, true, session.sessionV1).then(w => w.startSession(session.meta, true)).catch((error) => {
                // TODO up to sentry
                console.warn("load wallet connect pair error", error)
            });
        } else {
            (new WalletConnectV2(session.id, session.needsNamespaces)).startSession(session.meta, undefined, session.topic);
        }
    })
}