import { Versions } from './utils';

export interface IWalletConnectV1 {
    kill(message: string): void
    getURI(): string
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
} & (
    {
        version: "1";
        connectorV1: IWalletConnectV1;
        sessionV1: any;
    } | {
        version: "2";
    }
)

export type WalletConnectSessionSerialized = {
    id: string;
    meta: WalletConnectPairMetadata;
    version: Versions;
    connectURI: string;
    sessionV1?: any;
}