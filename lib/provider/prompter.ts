import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest, TransactionResponse } from '@0xsodium/transactions';
import { showErrorModal, showUpdateDeployConfirmModal, showUpdateSignMessageModal, showUpdateSignTranscationModal } from '../../components/base/modalInit';
import { navigate, waitNavigateInit } from '../../components/base/navigationInit';
import { decodeTransactionRequest } from '../common/decode';
import { getNetwork } from '../common/network';
import { getAuth } from '../data/auth';
import { OperateTimeStamp } from '../data/operateTime';
import { IConnectScreenParam, IDeployConfirmModalParam, ISignMessageModalParam, ISignTranscationModalParam, ITranscation, Screens } from '../define';
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
        return this.handleSignOrSendTranscation(txn, chaindId, options, "sign");
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        console.log("WalletPrompter promptSendTransaction");
        return this.handleSignOrSendTranscation(txn, chaindId, options, "send");
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

    handleSignOrSendTranscation(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions, handleName?: string): Promise<string> {
        return new Promise(async (tResolve: (value: string) => void, tReject: () => void) => {
            await waitNavigateInit();
            const auth = getAuth();
            if (!auth.isLogin) {
                return Promise.reject();
            }
            if (chaindId == null) {
                chaindId = await auth.signer.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, auth.web3signer, chaindId);

            const txnWithTime = {
                'txReq': txn,
                'timeStamp': OperateTimeStamp.getAndReset(),
                'decodeDatas': decodes,
            } as ITranscation;

            transactionQueue.add(txnWithTime);
            const continueClick = async (continueTxn: TransactionRequest, onPendingStart?: (txHash: string) => void, onPendingEnd?: () => void, onError?: () => void) => {
                try {
                    let txnResponse;
                    if (handleName == "send") {
                        txnResponse = await auth.signer.sendTransaction(continueTxn, chaindId);
                    } else {
                        txnResponse = await auth.signer.signTransaction(continueTxn);
                    }
                    transactionQueue.removeByTxn(txnWithTime);
                    console.log("txnResponse:" + JSON.stringify(txnResponse));
                    onPendingStart && onPendingStart(txnResponse.hash);
                    console.log("txnResponse.wait start");
                    await txnResponse.wait();
                    console.log("txnResponse.wait end");
                    onPendingEnd && onPendingEnd();
                    tResolve(txnResponse.hash);
                    showUpdateSignTranscationModal(false, null, txnWithTime.txReq);
                } catch (error) {
                    tReject();
                    showErrorModal(error.message);
                    onError && onError();
                }
            }

            showUpdateSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.removeByTxn(txnWithTime);
                    tReject();
                },
                decodeDatas: decodes,
                options: options,
                chaindId: chaindId,
                txn: txnWithTime
            } as ISignTranscationModalParam);
        });
    }
}