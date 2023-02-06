import { TransactionHistory } from '@0xsodium/provider';
import { useStore } from '@nanostores/react';
import { atom, WritableAtom } from "nanostores";
import { ReactNode } from 'react';
import { IComModalParam, IDeployConfirmModalParam, IModalParam, ISignMessageModalParam, ISignTranscationModalParam } from "../../lib/define";
import { ComModal } from "../modal/comModal";
import { DeployConfirmModal } from "../modal/deployConfirmModal";
import { FullScreenModal } from "../modal/fullScreenModal";
import { SignMessageModal } from '../modal/signMessageModal';
import { SignTranscationModal } from '../modal/signTranscationModal';
import { TranscationDetailModal } from "../modal/transcationDetailModal";
import { TranscationQueueModal } from "../modal/transcationQueneModal";
import {
  showUpdateTranscationDetailModal,
  showUpdateTranscationQueueModal,
  showUpdateSignTranscationModal,
  showUpdateSignMessageModal,
  showUpdateComModal,
  showUpdateFullScreenModal,
  showUpdateDeployConfirmModal,
  transcationDetailModalAtom,
  transcationQueueModalAtom,
  comModalAtom,
  deployConfirmModalAtom,
  signTranscationModalAtom,
  signMessageModalAtom,
  fullScreenModalAtom,
  scanModalAtom,
  showUpdateScanModal
} from '../../lib/data/modal';
import { ScanModal } from '../modal/scanModal';

export default function ModalInit() {
  // debugger
  const transcationDetailModal = useStore(transcationDetailModalAtom);
  const transcationQueueModal = useStore(transcationQueueModalAtom);
  const signTranscationModal = useStore(signTranscationModalAtom);
  const signMessageModal = useStore(signMessageModalAtom);
  const comModal = useStore(comModalAtom);
  const fullScreenModal = useStore(fullScreenModalAtom);
  const deployConfirmModal = useStore(deployConfirmModalAtom);
  const scanModal = useStore(scanModalAtom);
  return (
    <>
      <TranscationDetailModal modalParam={transcationDetailModal} hideModal={() => showUpdateTranscationDetailModal(false, null, transcationDetailModal.uniqueKey)} />
      <TranscationQueueModal modalParam={transcationQueueModal} hideModal={() => showUpdateTranscationQueueModal(false, null, transcationQueueModal.uniqueKey)} />
      <SignTranscationModal modalParam={signTranscationModal} hideModal={() => showUpdateSignTranscationModal(false, null, signTranscationModal.uniqueKey)} />
      <SignMessageModal modalParam={signMessageModal} hideModal={() => showUpdateSignMessageModal(false, null, signMessageModal.uniqueKey)} />
      <DeployConfirmModal modalParam={deployConfirmModal} hideModal={() => showUpdateDeployConfirmModal(false, null, deployConfirmModal.uniqueKey)} />
      <ScanModal modalParam={scanModal} hideModal={() => showUpdateScanModal(false, null, scanModal.uniqueKey)} />
      <FullScreenModal modalParam={fullScreenModal} hideModal={() => showUpdateFullScreenModal(false, null, fullScreenModal.uniqueKey)} />
      <ComModal modalParam={comModal} hideModal={() => showUpdateComModal(false, null, comModal.uniqueKey)} />
    </>
  );
}

