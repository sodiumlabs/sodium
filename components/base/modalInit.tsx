import { TransactionHistory } from '@0xsodium/provider';
import { useStore } from '@nanostores/react';
import { atom } from "nanostores";
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

export const showUpdateComModal = (visible: boolean, param?: IComModalParam) => {
  comModalAtom.set({ visible: visible, param: param });
}
export const showUpdateDeployConfirmModal = (visible: boolean, param?: IDeployConfirmModalParam) => {
  deployConfirmModalAtom.set({ visible: visible, param: param });
}

export const showUpdateTranscationDetailModal = (visible: boolean, param?: TransactionHistory) => {
  transcationDetailModalAtom.set({ visible: visible, param: param });
}
export const showUpdateSignMessageModal = (visible: boolean, param?: ISignMessageModalParam) => {
  signMessageModalAtom.set({ visible: visible, param: param });
}
export const showUpdateSignTranscationModal = (visible: boolean, param?: ISignTranscationModalParam) => {
  signTranscationModalAtom.set({ visible: visible, param: param });
}
export const showUpdateTranscationQueueModal = (visible: boolean, param?: unknown) => {
  transcationQueueModalAtom.set({ visible: visible, param: param });
}
export const showUpdateFullScreenModal = (visible: boolean, param?: ReactNode) => {
  fullScreenModalAtom.set({ visible: visible, param: param });
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
      <TranscationDetailModal modalParam={transcationDetailModal} hideModal={() => showUpdateTranscationDetailModal(false)} />
      <TranscationQueueModal modalParam={transcationQueueModal} hideModal={() => showUpdateTranscationQueueModal(false)} />
      <SignTranscationModal modalParam={signTranscationModal} hideModal={() => showUpdateSignTranscationModal(false)} />
      <SignMessageModal modalParam={signMessageModal} hideModal={() => showUpdateSignMessageModal(false)} />
      <ComModal modalParam={comModal} hideModal={() => showUpdateComModal(false)} />
      <FullScreenModal modalParam={fullScreenModal} hideModal={() => showUpdateFullScreenModal(false)} />
      <DeployConfirmModal modalParam={deployConfirmModal} hideModal={() => showUpdateDeployConfirmModal(false)} />
    </>
  );
}

