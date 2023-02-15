import RNWalletConnect from "@walletconnect/client";
import { createWallet } from './wallet';
import { getDefaultChainId } from '../network';
import { IWalletConnect, WalletConnectPairMetadata } from './type';
import { Wallet } from "@0xsodium/provider";
import { pushSession, removeSessionById } from './atom';

export class WalletConnectV1 implements IWalletConnect {
    protected wallet: Promise<Wallet>;

    constructor(protected connector: RNWalletConnect, existing: boolean, waitSessionRequest: (w: WalletConnectV1) => void) {
        // Subscribe to session requests
        const defaultChainId = getDefaultChainId();
        this.wallet = createWallet(defaultChainId, connector.key);

        if (existing) {
            waitSessionRequest(this);
        }

        connector.on("session_request", async (error, payload) => {
            if (error) {
                throw error;
            }
            try {
                const peerMeta = payload.params[0].peerMeta;
                waitSessionRequest(this);
                await this.startSession(peerMeta, existing);
            } catch (error) {
                connector.rejectSession(error);
            }
        });

        // Subscribe to call requests
        connector.on("call_request", async (error, payload) => {
            if (error) {
                throw error;
            }
            this.callRequest(payload.method, payload.params).then(result => {
                connector.approveRequest({
                    id: payload.id,
                    jsonrpc: payload.jsonrpc,
                    result,
                });
            }).catch(err => {
                console.debug("reject request", err);
                connector.rejectRequest({
                    id: payload.id,
                    jsonrpc: payload.jsonrpc,
                    error: err,
                });
            });
        });

        connector.on("disconnect", async (error, payload) => {
            if (error) {
                throw error;
            }
            let message = "";
            if (payload.params[0].message) {
                message = payload.params[0].message;
            }
            removeSessionById(this.connector.key, message);
        });
    }

    async callRequest(method: string, params: any, chainId?: string | number): Promise<any> {
        const wallet = await this.wallet;
        return wallet.getProvider().send(method, params);
    }

    async startSession(meta: WalletConnectPairMetadata, existing: boolean) {
        const defaultChainId = getDefaultChainId();
        console.debug("start session", existing);
        const wallet = await this.wallet;
        await wallet.connect({
            networkId: defaultChainId,
            origin: meta.url
        });
        console.debug("end start session");
        const address = await wallet.getAddress();
        if (existing) {
            this.connector.updateSession({
                chainId: defaultChainId,
                accounts: [
                    address
                ]
            });
        } else {
            this.connector.approveSession({
                chainId: defaultChainId,
                accounts: [
                    address
                ]
            });
        }
        pushSession({
            version: "1",
            meta: meta,
            connector: this,
            id: this.connector.key,
            sessionV1: this.connector.session
        });
    }

    async kill(message: string) {
        const wallet = await this.wallet;
        wallet.disconnect();
        console.debug("wallet disconnect")
        if (this.connector.connected) {
            this.connector.killSession({
                message
            });
        }
    }

    getURI(): string {
        return this.connector.uri;
    }
}