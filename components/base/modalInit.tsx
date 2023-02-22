import { useStore } from '@nanostores/react';
import {
  ConnectModal,
  ScanModal,
  TranscationQueueModal,
  TranscationDetailModal,
  SignTranscationModal,
  SignMessageModal,
  FullScreenModal,
  DeployConfirmModal,
  ComModal,
} from '../modal';

import {
  showUpdateTranscationDetailModal,
  showUpdateTranscationQueueModal,
  showUpdateSignTranscationModal,
  showUpdateSignMessageModal,
  showUpdateComModal,
  showUpdateFullScreenModal,
  showUpdateDeployConfirmModal,
  showUpdateScanModal,
  showUpdateConnectModal,

  transcationDetailModalAtom,
  transcationQueueModalAtom,
  comModalAtom,
  deployConfirmModalAtom,
  signTranscationModalAtom,
  signMessageModalAtom,
  fullScreenModalAtom,
  scanModalAtom,
  connectModalAtom,
} from '../../lib/data/modal';

export default function ModalInit() {
  const transcationDetailModal = useStore(transcationDetailModalAtom);
  const transcationQueueModal = useStore(transcationQueueModalAtom);
  const signTranscationModal = useStore(signTranscationModalAtom);
  const signMessageModal = useStore(signMessageModalAtom);
  const comModal = useStore(comModalAtom);
  const fullScreenModal = useStore(fullScreenModalAtom);
  const deployConfirmModal = useStore(deployConfirmModalAtom);
  const scanModal = useStore(scanModalAtom);
  const connectModal = useStore(connectModalAtom);
  return (
    <>
      <TranscationDetailModal modalParam={transcationDetailModal} hideModal={(immediately?: boolean) => showUpdateTranscationDetailModal(false, null, transcationDetailModal.uniqueKey, immediately)} />
      <TranscationQueueModal modalParam={transcationQueueModal} hideModal={(immediately?: boolean) => showUpdateTranscationQueueModal(false, null, transcationQueueModal.uniqueKey, immediately)} />
      <SignTranscationModal modalParam={signTranscationModal} hideModal={(immediately?: boolean) => showUpdateSignTranscationModal(false, null, signTranscationModal.uniqueKey, immediately)} />
      <SignMessageModal modalParam={signMessageModal} hideModal={(immediately?: boolean) => showUpdateSignMessageModal(false, null, signMessageModal.uniqueKey, immediately)} />
      <DeployConfirmModal modalParam={deployConfirmModal} hideModal={(immediately?: boolean) => showUpdateDeployConfirmModal(false, null, deployConfirmModal.uniqueKey, immediately)} />
      <ScanModal modalParam={scanModal} hideModal={(immediately?: boolean) => showUpdateScanModal(false, null, scanModal.uniqueKey, immediately)} />
      <FullScreenModal modalParam={fullScreenModal} hideModal={(immediately?: boolean) => showUpdateFullScreenModal(false, null, fullScreenModal.uniqueKey, immediately)} />
      <ComModal modalParam={comModal} hideModal={(immediately?: boolean) => showUpdateComModal(false, null, comModal.uniqueKey, immediately)} />
      <ConnectModal modalParam={connectModal} hideModal={(immediately?: boolean) => showUpdateConnectModal(false, null, connectModal.uniqueKey, immediately)} />
    </>
  );
}

