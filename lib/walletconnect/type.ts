import { Versions } from './utils';

export interface IWalletConnect {
    kill(message: string): void
    getURI(): string
    callRequest(method: string, params: any, chainId?: number | string): Promise<any>
}

export type WalletConnectPairMetadata = {
    name: string;
    description: string;
    url: string;
    icons: string[];
}

export type WalletConnectSession = {
    id: string;
    meta: WalletConnectPairMetadata;
    version: Versions;
    connector: IWalletConnect;
} & (
        {
            version: "1";
            sessionV1: any;
        } | {
            needsNamespaces: NeedsNamespaces;
            topic: string;
            version: "2";
        }
    )

export type NeedsNamespaces = {
    [keyof: string]: {
        chains?: string[];
        methods: string[];
        events: string[];
    }
}

export type BaseNamespaces = {
    [keyof: string]: {
        chains?: string[];
        accounts: string[];
        methods: string[];
        events: string[];
    }
}

export type WalletConnectSessionSerialized = {
    id: string;
    meta: WalletConnectPairMetadata;
    version: Versions;
    connectURI: string;
    topic: string;
    sessionV1: any;
    needsNamespaces: NeedsNamespaces;
}