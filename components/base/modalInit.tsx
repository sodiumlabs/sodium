import { TransactionHistory } from '@0xsodium/provider';
import { useStore } from '@nanostores/react';
import { atom, WritableAtom } from "nanostores";
import { ReactNode } from 'react';
import { IComModalParam, IDeployConfirmModalParam, IModalParam, ISignMessageModalParam, ISignTranscationModalParam } from "../../lib/define";
import { ComModal } from "../modal/comModal";
import { DeployConfirmModal } from "../modal/deployConfirmModal";
import { FullScreenModal } from "../modal/fullScreenModal";
import { FailModalItem } from '../modal/modalItem/failModalItem';
import { SignMessageModal } from '../modal/signMessageModal';
import { SignTranscationModal } from '../modal/signTranscationModal';
import { TranscationDetailModal } from "../modal/transcationDetailModal";
import { TranscationQueueModal } from "../modal/transcationQueneModal";

const transcationDetailModalAtom = atom<IModalParam>({ visible: false });
const transcationQueueModalAtom = atom<IModalParam>({ visible: false });
const comModalAtom = atom<IModalParam>({ visible: false });
const deployConfirmModalAtom = atom<IModalParam>({ visible: false });
const signTranscationModalAtom = atom<IModalParam>({ visible: false });
const signMessageModalAtom = atom<IModalParam>({ visible: false });
const fullScreenModalAtom = atom<IModalParam>({ visible: false });

export const showUpdateComModal = (visible: boolean, param?: IComModalParam, closeUniqueKey?: unknown) => {
  // comModalAtom.set({ visible: visible, param: param });
  setModal(comModalAtom, visible, param, param, closeUniqueKey);

}
export const showUpdateDeployConfirmModal = (visible: boolean, param?: IDeployConfirmModalParam, closeUniqueKey?: unknown) => {
  // deployConfirmModalAtom.set({ visible: visible, param: param });
  setModal(deployConfirmModalAtom, visible, param, param, closeUniqueKey);

}

export const showUpdateTranscationDetailModal = (visible: boolean, param?: TransactionHistory, closeUniqueKey?: unknown) => {
  // transcationDetailModalAtom.set({ visible: visible, param: param });
  setModal(transcationDetailModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateSignMessageModal = (visible: boolean, param?: ISignMessageModalParam, closeUniqueKey?: unknown) => {
  // signMessageModalAtom.set({ visible: visible, param: param });
  setModal(signMessageModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateSignTranscationModal = (visible: boolean, param?: ISignTranscationModalParam, closeUniqueKey?: unknown) => {
  // console.log("showUpdateSignTranscationModal");
  // console.log(`param?.txn?.timeStamp ${param?.txn?.timeStamp}   closeUniqueKey ${closeUniqueKey}`);
  setModal(signTranscationModalAtom, visible, param, param?.txn?.timeStamp, closeUniqueKey);
}
export const showUpdateTranscationQueueModal = (visible: boolean, param?: unknown, closeUniqueKey?: unknown) => {
  // transcationQueueModalAtom.set({ visible: visible, param: param });
  setModal(transcationQueueModalAtom, visible, param, param, closeUniqueKey);
}
export const showUpdateFullScreenModal = (visible: boolean, param?: ReactNode, closeUniqueKey?: unknown) => {
  // fullScreenModalAtom.set({ visible: visible, param: param });
  setModal(fullScreenModalAtom, visible, param, undefined, undefined);
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

export default function ModalInit() {
  // debugger
  const transcationDetailModal = useStore(transcationDetailModalAtom);
  const transcationQueueModal = useStore(transcationQueueModalAtom);
  const signTranscationModal = useStore(signTranscationModalAtom);
  const signMessageModal = useStore(signMessageModalAtom);
  const comModal = useStore(comModalAtom);
  const fullScreenModal = useStore(fullScreenModalAtom);
  const deployConfirmModal = useStore(deployConfirmModalAtom);
  return (
    <>
      <TranscationDetailModal modalParam={transcationDetailModal} hideModal={() => showUpdateTranscationDetailModal(false, null, transcationDetailModal.uniqueKey)} />
      <TranscationQueueModal modalParam={transcationQueueModal} hideModal={() => showUpdateTranscationQueueModal(false, null, transcationQueueModal.uniqueKey)} />
      <SignTranscationModal modalParam={signTranscationModal} hideModal={() => showUpdateSignTranscationModal(false, null, signTranscationModal.uniqueKey)} />
      <SignMessageModal modalParam={signMessageModal} hideModal={() => showUpdateSignMessageModal(false, null, signMessageModal.uniqueKey)} />
      <ComModal modalParam={comModal} hideModal={() => showUpdateComModal(false, null, comModal.uniqueKey)} />
      <FullScreenModal modalParam={fullScreenModal} hideModal={() => showUpdateFullScreenModal(false, null, fullScreenModal.uniqueKey)} />
      <DeployConfirmModal modalParam={deployConfirmModal} hideModal={() => showUpdateDeployConfirmModal(false, null, deployConfirmModal.uniqueKey)} />
    </>
  );
}

