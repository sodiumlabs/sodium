import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';

export class WalletPrompter implements WalletUserPrompter {
    promptConnect(options?: ConnectOptions | undefined): Promise<PromptConnectDetails> {
        throw new Error('Method not implemented.');
    }

    promptSignTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        throw new Error('Method not implemented.');
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        throw new Error('Method not implemented.');
    }

    promptSignMessage(message: MessageToSign, options?: ConnectOptions | undefined): Promise<string> {
        throw new Error('Method not implemented.');
    }

    promptConfirmWalletDeploy(chainId: number, options?: ConnectOptions | undefined): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}