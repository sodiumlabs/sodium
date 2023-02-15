import { Core, } from "@walletconnect/core";
import { getSdkError, formatUri } from '@walletconnect/utils';
import { Web3Wallet } from "@walletconnect/web3wallet";
import Client from "@walletconnect/web3wallet";
import { pushSession, findSessionByTopic } from "./atom";
import { CLIENT_OPTIONS } from './utils';
import {
    IWalletConnect,
    WalletConnectPairMetadata,
    NeedsNamespaces,
    BaseNamespaces
} from './type';
import { getDefaultChainId } from "../network";
import { Wallet } from "@0xsodium/provider";
import { createWallet } from "./wallet";
import { atom } from 'nanostores';

let v2sdk = atom<Client>();

function encodeId(id: number): string {
    return `${id}`;
}

export function decodeId(id: string): number {
    return parseInt(id);
}

export class WalletConnectV2 implements IWalletConnect {
    protected wallet: Promise<Wallet>;
    protected topic: string;
    protected uri: string;
    protected origin: string;

    constructor(protected sessionId: string, protected needsNamespaces: NeedsNamespaces) {
        const defaultChainId = getDefaultChainId();
        this.wallet = createWallet(defaultChainId);
    }

    mapNamespaces(address: string): BaseNamespaces {
        let bn = {};
        const needsNamespaces = this.needsNamespaces;
        Object.keys(needsNamespaces).forEach(key => {
            const accounts: string[] = []
            needsNamespaces[key].chains.map(chain => {
                accounts.push(`${chain}:${address}`);
            })
            bn[key] = {
                accounts,
                methods: needsNamespaces[key].methods,
                events: needsNamespaces[key].events
            }
        })
        return bn;
    }

    async startSession(meta: WalletConnectPairMetadata, id?: number, existingTopic: string | undefined = undefined) {
        const defaultChainId = getDefaultChainId();
        const wallet = await this.wallet;
        await wallet.connect({
            networkId: defaultChainId,
            origin: meta.url
        });
        this.origin = meta.url;
        const address = await wallet.getAddress();
        const sdk = v2sdk.get();
        if (existingTopic) {
            await sdk.updateSession({
                topic: existingTopic,
                namespaces: this.mapNamespaces(address),
            });
        } else {
            const session = await sdk.approveSession({
                id: id,
                namespaces: this.mapNamespaces(address),
            });
            existingTopic = session.topic;
        }
        this.topic = existingTopic;
        pushSession({
            id: this.sessionId,
            version: "2",
            meta: meta,
            connector: this,
            topic: existingTopic,
            needsNamespaces: this.needsNamespaces
        });
    }

    async callRequest(method: string, params: any, chainId?: string | number): Promise<any> {
        const wallet = await this.wallet;
        return wallet.getProvider().send(method, params);
    }

    async kill(message: string) {
        const sdk = v2sdk.get();
        sdk.disconnectSession({
            topic: this.topic,
            reason: getSdkError("USER_DISCONNECTED")
        });
        const wallet = await this.wallet;
        wallet.removeConnectedSite(
            this.origin
        );
    }

    getURI(): string {
        return this.uri;
    }
}

async function init(): Promise<void> {
    const core = new Core({
        projectId: "3dea5e1f2e4c86222bd29888c46c4744",
        logger: 'info',
    });
    const sdk = await Web3Wallet.init({
        core,
        metadata: CLIENT_OPTIONS.clientMeta,
    });

    sdk.on("session_proposal", async (proposal) => {
        const w = new WalletConnectV2(
            proposal.params.proposer.publicKey,
            proposal.params.requiredNamespaces
        );
        try {
            await w.startSession(
                proposal.params.proposer.metadata,
                proposal.id,
                undefined
            );
        } catch (error) {
            sdk.rejectSession({
                id: proposal.id,
                reason: getSdkError("SESSION_SETTLEMENT_FAILED")
            });
            // TODO upto sentry
        }
    });

    sdk.on("auth_request", async (authRequest) => {
        // TODO
    });

    sdk.on("session_request", async (event) => {
        const { topic, params, id } = event;
        const { request, chainId: namespaceChainId } = params;
        const defaultChainId = getDefaultChainId();
        const wallet = await createWallet(defaultChainId);
        const [namespace, chainIdStr] = namespaceChainId.split(":");
        const chainId = parseInt(chainIdStr);
        wallet.getProvider(chainId)
            .send(request.method, request.params, chainId)
            .then(result => {
                const response = { id, result: result, jsonrpc: "2.0" };
                sdk.respondSessionRequest({
                    topic,
                    response
                });
            })
            .catch(error => {
                const response = {
                    id,
                    jsonrpc: "2.0",
                    error: {
                        code: 5000,
                        message: error,
                    },
                };
                sdk.respondSessionRequest({
                    topic,
                    response
                });
            });
    });

    // @ts-ignore
    sdk.on("session_delete", async (event) => {
        console.debug("wallet connect v2 session delete", event);
    });

    v2sdk.set(sdk);
}

export {
    v2sdk,
    init
}