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
      <TranscationDetailModal modalParam={transcationDetailModal} hideModal={() => showUpdateTranscationDetailModal(false, null, transcationDetailModal.uniqueKey)} />
      <TranscationQueueModal modalParam={transcationQueueModal} hideModal={() => showUpdateTranscationQueueModal(false, null, transcationQueueModal.uniqueKey)} />
      <SignTranscationModal modalParam={signTranscationModal} hideModal={() => showUpdateSignTranscationModal(false, null, signTranscationModal.uniqueKey)} />
      <SignMessageModal modalParam={signMessageModal} hideModal={() => showUpdateSignMessageModal(false, null, signMessageModal.uniqueKey)} />
      <DeployConfirmModal modalParam={deployConfirmModal} hideModal={() => showUpdateDeployConfirmModal(false, null, deployConfirmModal.uniqueKey)} />
      <ScanModal modalParam={scanModal} hideModal={() => showUpdateScanModal(false, null, scanModal.uniqueKey)} />
      <FullScreenModal modalParam={fullScreenModal} hideModal={() => showUpdateFullScreenModal(false, null, fullScreenModal.uniqueKey)} />
      <ComModal modalParam={comModal} hideModal={() => showUpdateComModal(false, null, comModal.uniqueKey)} />
      <ConnectModal modalParam={connectModal} hideModal={() => showUpdateConnectModal(false, null, connectModal.uniqueKey)} />
    </>
  );
}

