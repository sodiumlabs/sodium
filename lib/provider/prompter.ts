import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { waitNavigateInit } from '../../components/base/navigation';
import { decodeTransactionRequest } from '../common/decode';
import { getNetwork } from '../network';
import {
    showErrorModal, showUpdateConnectModal, showUpdateDeployConfirmModal,
    showUpdateSignMessageModal,
    showUpdateSignTranscationModal
} from '../data/modal';
import { OperateTimeStamp } from '../data/operateTime';
import { IDeployConfirmModalParam, ISignMessageModalParam, ISignTranscationModalParam, ITranscation } from '../define';
import { transactionQueue } from '../transaction';
import { walletAtom } from './atom';
import { Logger } from '../common/Logger';

export class WalletPrompter implements WalletUserPrompter {
    promptConnect(options?: ConnectOptions | undefined): Promise<PromptConnectDetails> {
        Logger.debug("WalletPrompter promptConnect options:" + JSON.stringify(options));
        return new Promise(async (tResolve: (value: PromptConnectDetails) => void, tReject: (error: any) => void) => {
            await waitNavigateInit();
            const wallet = walletAtom.get();
            if (wallet === null) {
                Logger.debug("WalletPrompter promptConnect auth is no Login,reject");
                return Promise.reject("WalletPrompter promptConnect auth no auth");
            }

            // TODO
            // 临时代码
            // 后续增加协议判断是否是在系统内app打开. 
            if (options.app == "uniswap") {
                const result = await wallet.handler.connect(options) as PromptConnectDetails;

                console.debug("connect success", result);

                tResolve(result);
                return;
            }

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
        Logger.debug("WalletPrompter promptSignTransaction");
        return this.handleSignOrSendTranscation(txn, chaindId, options, "sign");
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        Logger.debug("WalletPrompter promptSendTransaction");
        return this.handleSignOrSendTranscation(txn, chaindId, options, "send");
    }

    promptSignMessage(message: MessageToSign, options?: ConnectOptions | undefined): Promise<string> {
        Logger.debug("WalletPrompter promptSignMessage message:" + JSON.stringify(message) + ' options :' + JSON.stringify(options) + " type:" + typeof message.message);
        return new Promise(async (tResolve: (value: string) => void, tReject: (error: any) => void) => {
            await waitNavigateInit();
            const wallet = walletAtom.get();
            if (wallet === null) {
                return Promise.reject();
            }
            const typeData = message.typedData;
            const continueClick = async () => {
                try {
                    if (typeData) {
                        const chaindId = await wallet.signer.getChainId();
                        console.debug("sign typeData", chaindId, typeData.domain, typeData.types, typeData.message);
                        const sign = await wallet.signer.signTypedData(typeData.domain, typeData.types, typeData.message, chaindId);
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
        Logger.debug("WalletPrompter promptConfirmWalletDeploy");
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
                        const transactions = await wallet.signer.getWalletUpgradeTransactions(chainId);
                        if (transactions.length === 0) {
                            transactions.push({
                                value: "0",
                                data: "0x",
                                to: "0x0000000000000000000000000000000000000000"
                            });
                        }
                        const tx = await wallet.signer.sendTransaction(transactions);
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
                    Logger.debug("txnResponse:" + JSON.stringify(txnResponse));
                    onPendingStart && onPendingStart(txnResponse.hash);
                    Logger.debug("txnResponse.wait start");
                    // await txnResponse.wait();
                    Logger.debug("txnResponse.wait end");
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