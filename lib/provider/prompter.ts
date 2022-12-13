import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { showDeployConfirmModal, showSignMessageModal, showSignTranscationModal } from '../../components/base/modalInit';
import { navigation } from '../../components/base/navigationInit';
import { decodeTransactionRequest } from '../common/decode';
import { getNetwork } from '../common/network';
import { getAuth } from '../data/auth';
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
        return Promise.reject();
        // const auth = getAuth();
        // if (!auth.isLogin) {
        //     return Promise.reject();
        // }
        // const decodes = decodeTransactionRequest(txn);

        // return new Promise((tResolve: (value: string) => void, tReject: () => void) => {

        //     const continueClick = async () => {

        //         const result = await auth.wallet['signer'].signTransactions(txn, chaindId);
        //         // @ts-ignore
        //         tResolve(result);
        //     }
        //     showSignTranscationModal(true, {
        //         continueClick: continueClick,
        //         cancelClick: () => tReject(),
        //         decodeTransfer: decodes,
        //         options: options
        //     } as ISignTranscationModalParam);
        // });
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        console.log("promptSendTransaction");
        console.log(txn);
        const auth = getAuth();
        if (!auth.isLogin) {
            return Promise.reject();
        }

        const transactionQueueFindIndex = transactionQueue.add(txn);

        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {
            if (chaindId == null) {
                chaindId = await auth.wallet.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, auth.web3signer, chaindId);
            const continueClick = async () => {
                transactionQueue.remove(transactionQueueFindIndex);
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
                options: options,
                chaindId: chaindId,
                txn: txn
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
                const sign = await auth.wallet['signer'].signMessage(message.message, message.chainId);
                tResolve(sign);
            }
            showSignMessageModal(true, {
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
            showDeployConfirmModal(true, {
                continueClick: () => tResolve(true),
                cancelClick: () => tReject(),
                options: options,
                network: network,
            } as IDeployConfirmModalParam);
        });
    }
}