import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { showDeployConfirmModal, showSignMessageModal, showSignTranscationModal } from '../../components/base/modalInit';
import { navigation } from '../../components/base/navigationInit';
import { decodeTransactionRequest } from '../common/decode';
import { getAuth } from '../data/auth';
import { IConnectScreenParam, IDeployConfirmModalParam, ISignMessageModalParam, ISignTranscationModalParam, Screens } from '../define';
import { transactionQueue } from '../transaction';

export class WalletPrompter implements WalletUserPrompter {
    promptConnect(options?: ConnectOptions | undefined): Promise<PromptConnectDetails> {
        return new Promise((tResolve: (value: PromptConnectDetails) => void, tReject: () => void) => {
            const continueClick = async () => {
                const auth = getAuth();
                if (!auth.isLogin) {
                    return tReject();
                }
                const result = await auth.wallet.connect(options) as PromptConnectDetails;
                tResolve(result);
            }
            navigation.navigate(Screens.Connect,
                {
                    continueClick: continueClick,
                    cancelClick: tReject,
                    options: options
                } as IConnectScreenParam
            );
        });
    }

    promptSignTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        const decodes = decodeTransactionRequest(txn);

        return new Promise((tResolve: (value: string) => void, tReject: () => void) => {
            const continueClick = async () => {
                const auth = getAuth();
                if (!auth.isLogin) {
                    return tReject();
                }
                const result = await auth.wallet['signer'].signTransactions(txn, chaindId);
                // @ts-ignore
                tResolve(result);
            }
            showSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => tReject(),
                decodeTransfer: decodes,
                options: options
            } as ISignTranscationModalParam);
        });
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        const transactionQueueFindIndex = transactionQueue.add(txn);
        const decodes = decodeTransactionRequest(txn);

        return new Promise((tResolve: (value: string) => void, tReject: () => void) => {
            const continueClick = async () => {
                const auth = getAuth();
                transactionQueue.remove(transactionQueueFindIndex);
                if (!auth.isLogin) {
                    return tReject();
                }
                const txnResponse = await auth.wallet['signer'].sendTransaction(txn, chaindId);
                tResolve(txnResponse.hash);
            }
            showSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.remove(transactionQueueFindIndex);
                    tReject();
                },
                decodeTransfer: decodes,
                options: options
            } as ISignTranscationModalParam);
        });
    }

    promptSignMessage(message: MessageToSign, options?: ConnectOptions | undefined): Promise<string> {
        return new Promise((tResolve: (value: string) => void, tReject: () => void) => {
            const continueClick = async () => {
                const auth = getAuth();
                if (!auth.isLogin) {
                    return tReject();
                }
                const sign = await auth.wallet['signer'].signMessage(message.message, message.chainId);
                tResolve(sign);
            }
            showSignMessageModal(true, {
                continueClick: continueClick,
                cancelClick: () => tReject(),
                options: options
            } as ISignMessageModalParam);
        });
    }

    promptConfirmWalletDeploy(chainId: number, options?: ConnectOptions | undefined): Promise<boolean> {
        return new Promise((tResolve: (value: boolean) => void, tReject: () => void) => {
            showDeployConfirmModal(true, {
                continueClick: () => tResolve(true),
                cancelClick: () => tReject(),
                options: options,
            } as IDeployConfirmModalParam);
        });
    }
}