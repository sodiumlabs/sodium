import RNWalletConnect from "@walletconnect/client";
import { loadWalletConnectSessions } from "../common";
import { v2sdk, WalletConnectV2, init as v2Init } from './v2';
import { getWalletConnectLinkVersion } from './utils';
import { authAtom } from "../data/auth";
import { WalletConnectSessionSerialized } from "./type";

export async function newPair(url: string): Promise<void> {
    const version = getWalletConnectLinkVersion(url);

    if (version === "1") {
        // return newPairV1(url, false, undefined).then();
        throw new Error("not support v1");
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
}

authAtom.subscribe((auth) => {
    if (auth.isLogin) {
        init();
    }
})