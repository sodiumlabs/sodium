import { 
    IComModalParam, 
    IDeployConfirmModalParam, 
    IModalParam, 
    ISignMessageModalParam, 
    ISignTranscationModalParam, 
    IConnectModalParam,
    IWebViewModalParam
} from "../define";
import { atom, WritableAtom } from "nanostores";
import { TransactionHistory } from '@0xsodium/provider';
import { ReactNode } from 'react';
import { FailModalItem } from '../../components/modal/modalItem/failModalItem';

export const transcationDetailModalAtom = atom<IModalParam<TransactionHistory>>({ visible: false });
export const transcationQueueModalAtom = atom<IModalParam>({ visible: false });
export const comModalAtom = atom<IModalParam<IComModalParam>>({ visible: false });
export const deployConfirmModalAtom = atom<IModalParam<IDeployConfirmModalParam>>({ visible: false });
export const signTranscationModalAtom = atom<IModalParam<ISignTranscationModalParam>>({ visible: false });
export const signMessageModalAtom = atom<IModalParam<ISignMessageModalParam>>({ visible: false });
export const fullScreenModalAtom = atom<IModalParam>({ visible: false });
export const scanModalAtom = atom<IModalParam>({ visible: false });
export const connectModalAtom = atom<IModalParam<IConnectModalParam>>({ visible: false });

export const showUpdateComModal = (visible: boolean, param?: IComModalParam, closeUniqueKey?: unknown) => {
    setModal(comModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateDeployConfirmModal = (visible: boolean, param?: IDeployConfirmModalParam, closeUniqueKey?: unknown) => {
    setModal(deployConfirmModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateTranscationDetailModal = (visible: boolean, param?: TransactionHistory, closeUniqueKey?: unknown) => {
    setModal(transcationDetailModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateSignMessageModal = (visible: boolean, param: ISignMessageModalParam, closeUniqueKey?: unknown) => {
    setModal(signMessageModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateSignTranscationModal = (visible: boolean, param: ISignTranscationModalParam, closeUniqueKey?: unknown) => {
    setModal(signTranscationModalAtom, visible, param, param?.txn?.timeStamp, closeUniqueKey);
}
export const showUpdateTranscationQueueModal = (visible: boolean, param?: unknown, closeUniqueKey?: unknown) => {
    setModal(transcationQueueModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateConnectModal = (visible: boolean, param: IConnectModalParam, closeUniqueKey?: unknown) => {
    console.debug("showUpdateConnectModal", visible);
    setModal(connectModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateFullScreenModal = (visible: boolean, param?: ReactNode, closeUniqueKey?: unknown) => {
    setModal(fullScreenModalAtom, visible, param, undefined, undefined);
}
export const showUpdateScanModal = (visible: boolean, param?: ReactNode, closeUniqueKey?: unknown) => {
    setModal(scanModalAtom, visible, param, undefined, undefined);
}

const setModal = (modalAtom: WritableAtom<IModalParam>, visible: boolean, param: unknown, openUniqueKey: unknown, closeUniqueKey: unknown) => {
    const modal = modalAtom.get() as IModalParam;
    if (!visible) {
        // When you close it, you need the same key
        // console.log(`When you close it, you need the same key: ${modal.uniqueKey == closeUniqueKey}`);
        if (modal.uniqueKey == closeUniqueKey) {
            modalAtom.set({ visible: visible, param: param, uniqueKey: null });
        }
        return;
    }
    // When it opens, set the new key
    modalAtom.set({ visible: visible, param: param, uniqueKey: openUniqueKey });
}
//extra
export const showErrorModal = (message: string) => {
    console.error(message);
    showUpdateComModal(true, { 'height': 400, 'reactNode': <FailModalItem error={message} /> });
}