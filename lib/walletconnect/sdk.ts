import RNWalletConnect from "@walletconnect/client";
import { loadWalletConnectSessions } from "../common";
import { WalletConnectV1 } from './v1';

export function newPair(url: string, existing: boolean = false, existingSession: any = undefined): Promise<WalletConnectV1> {
    console.debug("ex", existingSession);
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

export async function init(): Promise<void> {
    const sessions = await loadWalletConnectSessions();
    sessions.forEach(session => {
        if (session.version == "1") {
            newPair(session.connectURI, true, session.sessionV1).then(w => w.startSession(session.meta, true)).catch((error) => {
                // TODO up to sentry
                console.warn("load wallet connect pair error", error)
            });
        }
    })
}