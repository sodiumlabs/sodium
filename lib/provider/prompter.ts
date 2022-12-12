import { ConnectOptions, MessageToSign, PromptConnectDetails, WalletUserPrompter } from '@0xsodium/provider';
import { TransactionRequest, flattenAuxTransactions } from '@0xsodium/transactions';
import { checkIsERC20Transfer, decodeERC20Transfer } from '../../abi';
import { showDeployConfirmModal, showSignMessageModal, showSignTranscationModal } from '../../components/base/modalInit';
import { navigation } from '../../components/base/navigationInit';
import { getAuth } from '../data/auth';
import { IConnectScreenParam, IDeployConfirmModalParam, ISignTranscationModalParam, Screens, ISignMessageModalParam } from '../define';
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
        return new Promise((tResolve: (value: string) => void, tReject: () => void) => {
            const continueClick = async () => {
                const auth = getAuth();
                if (!auth.isLogin) {
                    return tReject();
                }
                const result = await auth.wallet['signer'].signTransactions(txn, chaindId);
                tResolve(result);
            }
            showSignTranscationModal(true, {
                continueClick: continueClick,
                cancelClick: () => tReject(),
                options: options
            } as ISignTranscationModalParam);
        });
    }

    promptSendTransaction(txn: TransactionRequest, chaindId?: number, options?: ConnectOptions): Promise<string> {
        const transactionQueueFindIndex = transactionQueue.add(txn);

        // check
        const txs = flattenAuxTransactions(txn);
        checkIsERC20Transfer(txs[0]);
        decodeERC20Transfer(txs[0]);

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