import RNWalletConnect from "@walletconnect/client";
import { loadWalletConnectSessions } from "../common";
import { WalletConnectV1 } from './v1';
import { v2sdk, WalletConnectV2, init as v2Init } from './v2';
import { getWalletConnectLinkVersion } from './utils';
import { authAtom } from "../data/auth";
import { WalletConnectSessionSerialized } from "./type";

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

async function init(): Promise<void> {
    try {
        await v2Init();
    } catch (error) {
        console.warn(error)
        // TODO upsentry;
    }

    const connectV1WithRetry = async (session: WalletConnectSessionSerialized, count = 0) => {
        newPairV1(session.connectURI, true, session.sessionV1).then(w => w.startSession(session.meta, true)).catch((error) => {
            if (!error.toString().includes("connect first")) {
                // TODO upsentry;
                if (count < 10) {
                    connectV1WithRetry(session, count ++);
                }
            }
        });
    }

    const sessions = await loadWalletConnectSessions();
    sessions.forEach(session => {
        if (session.version == "1") {
            console.debug("load wallet connect pair", session);
            connectV1WithRetry(session);
        }
    })
}

authAtom.subscribe((auth) => {
    if (auth.isLogin) {
        init();
    }
})