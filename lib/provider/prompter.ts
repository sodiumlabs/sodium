import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { flattenAuxTransactions, Transaction, TransactionRequest } from '@0xsodium/transactions';
import { showUpdateDeployConfirmModal, showUpdateSignMessageModal, showUpdateSignTranscationModal } from '../../components/base/modalInit';
import { navigate, waitNavigateInit } from '../../components/base/navigationInit';
import { decodeTransactionRequest } from '../common/decode';
import { getNetwork } from '../common/network';
import { getAuth } from '../data/auth';
import { OperateTimeStamp } from '../data/operateTime';
import { IConnectScreenParam, IDeployConfirmModalParam, ISignMessageModalParam, ISignTranscationModalParam, Screens } from '../define';
import { transactionQueue } from '../transaction';

export class WalletPrompter implements WalletUserPrompter {
    promptConnect(options?: ConnectOptions | undefined): Promise<PromptConnectDetails> {
        console.log("WalletPrompter promptConnect options:" + JSON.stringify(options));
        return new Promise(async (tResolve: (value: PromptConnectDetails) => void, tReject: () => void) => {
            await waitNavigateInit();
            const auth = getAuth();
            if (!auth.isLogin) {
                console.log("WalletPrompter promptConnect auth is no Login,reject");
                return Promise.reject();
            }
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

    //signTransactions
    promptSignTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        console.log("WalletPrompter promptSignTransaction");
        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {

            await waitNavigateInit();
            const auth = getAuth();
            if (!auth.isLogin) {
                return Promise.reject();
            }
            const txnWithTime = {
                'txReq': txn,
                'timeStamp': OperateTimeStamp.getAndReset()
            }
            // txn.push();
            const transactionQueueFindIndex = transactionQueue.add(txnWithTime);

            if (chaindId == null) {
                chaindId = await auth.signer.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, auth.web3signer, chaindId);
            const continueClick = async (continueTxn: TransactionRequest) => {
                transactionQueue.remove(transactionQueueFindIndex);
                const txnResponse = await auth.signer.signTransactions(continueTxn, chaindId);
                tResolve(txnResponse.hash);
            }
            showUpdateSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.remove(transactionQueueFindIndex);
                    tReject();
                },
                decodeDatas: decodes,
                options: options,
                chaindId: chaindId,
                txn: txnWithTime
            } as ISignTranscationModalParam);
        });
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        console.log("WalletPrompter promptSendTransaction");
        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {
            await waitNavigateInit();
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
                chaindId = await auth.signer.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, auth.web3signer, chaindId);
            const continueClick = async (continueTxn: TransactionRequest) => {
                transactionQueue.remove(transactionQueueFindIndex);
                const txnResponse = await auth.signer.sendTransaction(continueTxn, chaindId);
                tResolve(txnResponse.hash);
            }
            showUpdateSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.remove(transactionQueueFindIndex);
                    tReject();
                },
                decodeDatas: decodes,
                options: options,
                chaindId: chaindId,
                txn: txnWithTime
            } as ISignTranscationModalParam);
        });
    }

    promptSignMessage(message: MessageToSign, options?: ConnectOptions | undefined): Promise<string> {
        console.log("WalletPrompter promptSignMessage message:" + JSON.stringify(message) + ' options :' + JSON.stringify(options));

        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {
            await waitNavigateInit();
            const auth = getAuth();
            if (!auth.isLogin) {
                return Promise.reject();
            }
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
        console.log("WalletPrompter promptConfirmWalletDeploy");
        return new Promise(async (tResolve: (value: boolean) => void, tReject: () => void) => {
            await waitNavigateInit();
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