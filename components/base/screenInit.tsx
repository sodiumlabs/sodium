import { atom } from "nanostores";
import { useState } from "react";
import { IModalParam } from "../../src/define";
import { ComModal } from "../modal/comModal";
import { TranscationDetailModal } from "../modal/transcationDetailModal";
import { useStore } from '@nanostores/react';
import { TranscationQueueModal } from "../modal/transcationQueneModal";
import { SignModal } from '../modal/signModal';
import { LoadingModal } from "../modal/loadingModal";

const transcationDetailModalAtom = atom<IModalParam>({ visible: false });
const transcationQueueModalAtom = atom<IModalParam>({ visible: false });
const comModalAtom = atom<IModalParam>({ visible: false });
const signModalAtom = atom<IModalParam>({ visible: false });
const loadingModalAtom = atom<IModalParam>({ visible: false });

export const showComModal = (visible: boolean) => {
  comModalAtom.set({ ...comModalAtom.get(), visible: visible });
}

export const showTranscationModal = (visible: boolean) => {
  transcationDetailModalAtom.set({ ...transcationDetailModalAtom.get(), visible: visible });
}
export const showTranscationQueueModal = (visible: boolean) => {
  transcationQueueModalAtom.set({ ...transcationQueueModalAtom.get(), visible: visible });
}
export const showSignModal = (visible: boolean) => {
  signModalAtom.set({ ...signModalAtom.get(), visible: visible });
}
export const showLoadingModal = (visible: boolean) => {
  loadingModalAtom.set({ ...loadingModalAtom.get(), visible: visible });
}

export default function ScreenInit() {
  const transcationModalDetailParam = useStore(transcationDetailModalAtom);
  const transcationModalQueueParam = useStore(transcationQueueModalAtom);
  const comModalParam = useStore(comModalAtom);
  const signModalParam = useStore(signModalAtom);
  const loadingModalParam = useStore(loadingModalAtom);
  return (
    <>
      <TranscationDetailModal visible={transcationModalDetailParam.visible} hideModal={() => showTranscationModal(false)} />
      <TranscationQueueModal visible={transcationModalQueueParam.visible} hideModal={() => showTranscationQueueModal(false)} />
      <SignModal visible={signModalParam.visible} hideModal={() => showSignModal(false)} />
      <ComModal visible={comModalParam.visible} hideModal={() => showComModal(false)} />
      <LoadingModal visible={loadingModalParam.visible} hideModal={() => showLoadingModal(false)} />
    </>
  );
}
