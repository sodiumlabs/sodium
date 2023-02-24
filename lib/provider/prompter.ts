import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { waitNavigateInit } from '../../components/base/navigation';
import { decodeTransactionRequest } from '../common/decode';
import { getNetwork } from '../common/network';
import {
    showErrorModal, showUpdateConnectModal, showUpdateDeployConfirmModal,
    showUpdateSignMessageModal,
    showUpdateSignTranscationModal
} from '../data/modal';
import { OperateTimeStamp } from '../data/operateTime';
import { IDeployConfirmModalParam, ISignMessageModalParam, ISignTranscationModalParam, ITranscation } from '../define';
import { transactionQueue } from '../transaction';
import { walletAtom } from './atom';

export class WalletPrompter implements WalletUserPrompter {
    promptConnect(options?: ConnectOptions | undefined): Promise<PromptConnectDetails> {
        console.log("WalletPrompter promptConnect options:" + JSON.stringify(options));
        return new Promise(async (tResolve: (value: PromptConnectDetails) => void, tReject: (error: any) => void) => {
            await waitNavigateInit();
            const wallet = walletAtom.get();
            if (wallet === null) {
                console.log("WalletPrompter promptConnect auth is no Login,reject");
                return Promise.reject("WalletPrompter promptConnect auth no auth");
            }

            // // TODO
            // // 临时代码
            // // 后续增加协议判断是否是在系统内app打开. 
            // if (options.app == "uniswap") {
            //     const result = await wallet.handler.connect(options) as PromptConnectDetails;

            //     console.debug("connect success", result);

            //     tResolve(result);
            //     return;
            // }

            const continueClick = async () => {
                try {
                    const result = await wallet.handler.connect(options) as PromptConnectDetails;
                    tResolve(result);
                } catch (error) {
                    tReject(error);
                }
            }
            showUpdateConnectModal(true, {
                continueClick: continueClick,
                cancelClick: async () => tReject("user"),
                options: options
            });
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
        console.log("WalletPrompter promptSignMessage message:" + JSON.stringify(message) + ' options :' + JSON.stringify(options) + " type:" + typeof message.message);
        return new Promise(async (tResolve: (value: string) => void, tReject: (error: any) => void) => {
            await waitNavigateInit();
            const wallet = walletAtom.get();
            if (wallet === null) {
                return Promise.reject();
            }
            const continueClick = async () => {
                try {
                    if (message.typedData) {
                        const chaindId = await wallet.signer.getChainId();
                        const sign = await wallet.signer.signTypedData(message.typedData.domain, message.typedData.types, message.typedData.message, chaindId);
                        tResolve(sign);
                    } else {
                        const sign = await wallet.signer.signMessage(message.message, message.chainId);
                        tResolve(sign);
                    }

                } catch (error) {
                    tReject(error)
                }
            }
            showUpdateSignMessageModal(true, {
                continueClick: continueClick,
                cancelClick: () => tReject("user cancel"),
                options: options,
                message: message
            } as ISignMessageModalParam);
        });
    }

    promptConfirmWalletDeploy(chainId: number, options?: ConnectOptions | undefined): Promise<boolean> {
        console.log("WalletPrompter promptConfirmWalletDeploy");
        return new Promise(async (tResolve: (value: boolean) => void, tReject: (error: any) => void) => {
            await waitNavigateInit();
            const wallet = walletAtom.get();
            if (wallet === null) {
                return Promise.reject();
            }
            const network = getNetwork(chainId);
            showUpdateDeployConfirmModal(true, {
                continueClick: async () => {
                    try {
                        const tx = await wallet.signer.sendTransaction({
                            value: "0",
                            data: "0x",
                            to: "0x0000000000000000000000000000000000000000"
                        });
                        await tx.wait();
                    } catch (error) {
                        tReject(error);
                    }
                    tResolve(true);
                },
                cancelClick: () => tReject("user cancel"),
                options: options,
                network: network,
            } as IDeployConfirmModalParam);
        });
    }

    handleSignOrSendTranscation(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions, handleName?: string): Promise<string> {
        return new Promise(async (tResolve: (value: string) => void, tReject: (error: any) => void) => {
            await waitNavigateInit();
            const wallet = walletAtom.get();
            if (wallet === null) {
                return Promise.reject();
            }
            if (chaindId == null) {
                chaindId = await wallet.signer.getChainId();
            }
            const decodes = await decodeTransactionRequest(txn, wallet.web3signer, chaindId);

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
                        txnResponse = await wallet.signer.sendTransaction(continueTxn, chaindId);
                    } else {
                        txnResponse = await wallet.signer.signTransaction(continueTxn);
                    }
                    transactionQueue.removeByTxn(txnWithTime);
                    console.log("txnResponse:" + JSON.stringify(txnResponse));
                    onPendingStart && onPendingStart(txnResponse.hash);
                    console.log("txnResponse.wait start");
                    await txnResponse.wait();
                    console.log("txnResponse.wait end");
                    onPendingEnd && onPendingEnd();
                    tResolve(txnResponse.hash);
                    showUpdateSignTranscationModal(false, null, txnWithTime.timeStamp);
                } catch (error) {
                    tReject(error);
                    showErrorModal(error.message);
                    onError && onError();
                }
            }

            showUpdateSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => {
                    transactionQueue.removeByTxn(txnWithTime);
                    tReject("user cancel");
                },
                decodeDatas: decodes,
                options: options,
                chaindId: chaindId,
                txn: txnWithTime
            } as ISignTranscationModalParam);
        });
    }
}