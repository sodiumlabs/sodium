import { atom } from "nanostores";
import { useState } from "react";
import { IModalParam } from "../../src/define";
import { ComModal } from "../modal/comModal";
import { TranscationModal } from "../modal/transcationModal";
import { useStore } from '@nanostores/react';

const transcationModalAtom = atom<IModalParam>({ visible: false });
const comModalAtom = atom<IModalParam>({ visible: false });

export const showComModal = (visible: boolean) => {
  comModalAtom.set({ ...comModalAtom.get(), visible: visible });
}

export const showTranscationModal = (visible: boolean) => {
  transcationModalAtom.set({ ...transcationModalAtom.get(), visible: visible });
}

export default function ScreenInit() {
  const transcationModalParam = useStore(transcationModalAtom);
  const comModalParam = useStore(comModalAtom);
  return (
    <>
      <TranscationModal visible={transcationModalParam.visible} hideModal={() => showTranscationModal(false)} />
      <ComModal visible={comModalParam.visible} hideModal={() => showComModal(false)} />
    </>
  );
}
