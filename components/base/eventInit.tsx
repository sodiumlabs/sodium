import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { comModalAtom, showUpdateComModal, showUpdateSignMessageModal, showUpdateSignTranscationModal, showUpdateTranscationDetailModal, signMessageModalAtom, signTranscationModalAtom } from "../../lib/data";

export const EventInit = () => {

  const signTranscationModal = useStore(signTranscationModalAtom);
  const signMessageModal = useStore(signMessageModalAtom);
  const comModal = useStore(comModalAtom);

  useEffect(() => {
    const messageLisenter = (event) => {
      const messageFromParent = event.data;
      console.log('Message from parent wallet:', messageFromParent);

      try {
        const data = JSON.parse(messageFromParent);
        if (data.type == "close") {
          console.log('Message from parent wallet: close');
          showUpdateSignTranscationModal(false, null, signTranscationModal.uniqueKey, true);
          showUpdateSignMessageModal(false, null, signMessageModal.uniqueKey, true);
          showUpdateComModal(false, null, comModal.uniqueKey, true);
        }
      } catch {

      }
      // Reply message to parent page
      // const replyToParent = { type: 'response', data: 'This is a response from the child page.' };
      // event.source.postMessage(replyToParent, event.origin);
    }

    window.addEventListener('message', messageLisenter);

    return () => window.removeEventListener('message', messageLisenter);
  }, []);


  return <></>
}