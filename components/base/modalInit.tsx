import { TransactionHistory } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { useStore } from '@nanostores/react';
import { atom } from "nanostores";
import { IDeployConfirmModalParam, IModalParam, ISignMessageModalParam, ISignTranscationModalParam } from "../../lib/define";
import { ComModal } from "../modal/comModal";
import { DeployConfirmModal } from "../modal/deployConfirmModal";
import { LoadingModal } from "../modal/loadingModal";
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
const loadingModalAtom = atom<IModalParam>({ visible: false });

export const showComModal = (visible: boolean, param?: unknown) => {
  comModalAtom.set({ visible: visible, param: param });
}
export const showDeployConfirmModal = (visible: boolean, param?: IDeployConfirmModalParam) => {
  deployConfirmModalAtom.set({ visible: visible, param: param });
}

export const showTranscationDetailModal = (visible: boolean, param?: TransactionHistory) => {
  transcationDetailModalAtom.set({ visible: visible, param: param });
}
export const showSignMessageModal = (visible: boolean, param?: ISignMessageModalParam) => {
  signMessageModalAtom.set({ visible: visible, param: param });
}
export const showSignTranscationModal = (visible: boolean, param?: ISignTranscationModalParam) => {
  signTranscationModalAtom.set({ visible: visible, param: param });
}
export const showTranscationQueueModal = (visible: boolean, param?: unknown) => {
  transcationQueueModalAtom.set({ visible: visible, param: param });
}
export const showLoadingModal = (visible: boolean, param?: unknown) => {
  loadingModalAtom.set({ visible: visible, param: param });
}

export default function ModalInit() {
  // debugger
  const transcationDetailModal = useStore(transcationDetailModalAtom);
  const transcationQueueModal = useStore(transcationQueueModalAtom);
  const signTranscationModal = useStore(signTranscationModalAtom);
  const signMessageModal = useStore(signMessageModalAtom);
  const comModal = useStore(comModalAtom);
  const loadingModal = useStore(loadingModalAtom);
  const deployConfirmModal = useStore(deployConfirmModalAtom);
  return (
    <>
      <TranscationDetailModal modalParam={transcationDetailModal} hideModal={() => showTranscationDetailModal(false)} />
      <TranscationQueueModal modalParam={transcationQueueModal} hideModal={() => showTranscationQueueModal(false)} />
      <SignTranscationModal modalParam={signTranscationModal} hideModal={() => showSignTranscationModal(false)} />
      <SignMessageModal modalParam={signMessageModal} hideModal={() => showSignMessageModal(false)} />
      <ComModal modalParam={comModal} hideModal={() => showComModal(false)} />
      <LoadingModal modalParam={loadingModal} hideModal={() => showLoadingModal(false)} />
      <DeployConfirmModal modalParam={deployConfirmModal} hideModal={() => showDeployConfirmModal(false)} />
    </>
  );
}
