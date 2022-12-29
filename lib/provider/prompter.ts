import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { showUpdateDeployConfirmModal, showUpdateSignMessageModal, showUpdateSignTranscationModal } from '../../components/base/modalInit';
import { navigate } from '../../components/base/navigationInit';
import { decodeTransactionRequest } from '../common/decode';
import { getNetwork } from '../common/network';
import { getAuth } from '../data/auth';
import { OperateTimeStamp } from '../data/operateTime';
import { IConnectScreenParam, IDeployConfirmModalParam, ISignMessageModalParam, ISignTranscationModalParam, Screens } from '../define';
import { transactionQueue } from '../transaction';

export class WalletPrompter implements WalletUserPrompter {
    promptConnect(options?: ConnectOptions | undefined): Promise<PromptConnectDetails> {
        const auth = getAuth();
        if (!auth.isLogin) {
            return Promise.reject();
        }
        return new Promise((tResolve: (value: PromptConnectDetails) => void, tReject: () => void) => {
            const continueClick = async () => {
                const result = await auth.wallet.connect(options) as PromptConnectDetails;
                tResolve(result);
            }
            navigate(Screens.Connect,
                {
                    continueClick: continueClick,
                    cancelClick: tReject,
                    options: options
                } as IConnectScreenParam
            );
        });
    }

    promptSignTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        console.log("promptSendTransaction");
        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {
            const auth = getAuth();
            if (!auth.isLogin) {
                return Promise.reject();
            }
            const txnQueueItem = {
                'txReq': txn,
                'timeStamp': OperateTimeStamp.getAndReset()
            }
            const transactionQueueFindIndex = transactionQueue.add(txnQueueItem);

            if (chaindId == null) {
                chaindId = await auth.signer.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, auth.web3signer, chaindId);
            const continueClick = async () => {
                transactionQueue.remove(transactionQueueFindIndex);
                const txnResponse = await auth.signer.signTransactions(txn, chaindId);

                // @ts-ignore
                tResolve(txnResponse);
            }
            showUpdateSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.remove(transactionQueueFindIndex);
                    tReject();
                },
                decodeTransfer: decodes,
                options: options,
                chaindId: chaindId,
                txn: txnQueueItem
            } as ISignTranscationModalParam);
        });
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        console.log("promptSendTransaction");
        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {
            const auth = getAuth();
            if (!auth.isLogin) {
                return Promise.reject();
            }
            const txnWithTime = {
                'txReq': txn,
                'timeStamp': OperateTimeStamp.getAndReset()
            }
            const transactionQueueFindIndex = transactionQueue.add(txnWithTime);

            if (chaindId == null) {
                chaindId = await auth.web3signer.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, auth.web3signer, chaindId);
            const continueClick = async () => {
                transactionQueue.remove(transactionQueueFindIndex);
                const txnResponse = await auth.signer.sendTransaction(txn, chaindId);
                tResolve(txnResponse.hash);
            }
            showUpdateSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.remove(transactionQueueFindIndex);
                    tReject();
                },
                decodeTransfer: decodes,
                options: options,
                chaindId: chaindId,
                txn: txnWithTime
            } as ISignTranscationModalParam);
        });
    }

    promptSignMessage(message: MessageToSign, options?: ConnectOptions | undefined): Promise<string> {
        const auth = getAuth();
        if (!auth.isLogin) {
            return Promise.reject();
        }
        return new Promise((tResolve: (value: string) => void, tReject: () => void) => {
            const continueClick = async () => {
                const sign = await auth.signer.signMessage(message.message, message.chainId);
                tResolve(sign);
            }
            showUpdateSignMessageModal(true, {
                continueClick: continueClick,
                cancelClick: () => tReject(),
                options: options,
                message: message
            } as ISignMessageModalParam);
        });
    }

    promptConfirmWalletDeploy(chainId: number, options?: ConnectOptions | undefined): Promise<boolean> {
        return new Promise((tResolve: (value: boolean) => void, tReject: () => void) => {
            const network = getNetwork(chainId);
            showUpdateDeployConfirmModal(true, {
                continueClick: () => tResolve(true),
                cancelClick: () => tReject(),
                options: options,
                network: network,
            } as IDeployConfirmModalParam);
        });
    }
}