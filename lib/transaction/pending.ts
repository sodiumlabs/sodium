import { useStore } from "@nanostores/react";
import { atom, computed } from 'nanostores';
import { loadTxnQueue, saveTxnQueue } from "../common/asyncStorage";
import { hashcodeObj } from '../common/common';
import { eStotageKey, ITranscation } from '../define';

const pendingTransactions = atom<ITranscation[]>([]);

const add = (tx: ITranscation) => {
  const pendings = pendingTransactions.get();
  if (pendings.some((itemTx) => hashcodeObj(itemTx) == hashcodeObj(tx))) {
    return;
  }
  const newTxs = [...pendings, tx];
  newTxs.sort((a, b) => {
    return a.timeStamp - b.timeStamp;
  });
  pendingTransactions.set(newTxs);
  // return index
  return newTxs.length - 1;
}

export const usePendingTransactions = () => {
  return useStore(pendingTransactions);
}

// const remove = (findIndex: number) => {
//   const newPendingTransactions = computed(pendingTransactions, txs => {
//     return txs.filter((_, index) => index != findIndex);
//   });
//   pendingTransactions.set(newPendingTransactions.get());
// }

const removeByTxn = (txn: ITranscation) => {
  const newPendingTransactions = computed(pendingTransactions, txs => {
    return txs.filter((item, index) => hashcodeObj(item) != hashcodeObj(txn));
  });
  pendingTransactions.set(newPendingTransactions.get());
}

const removeAll = () => {
  pendingTransactions.set([]);
}

const unbindListener = pendingTransactions.subscribe(value => {
  saveTxnQueue(eStotageKey.pendingTxs, value);
});

const loadAsyncStorage = async () => {
  const txs = await loadTxnQueue(eStotageKey.pendingTxs);
  // Check whether it is complete. If yes, remove it
  // ...

  pendingTransactions.set(txs);
}

export const transactionPending = {
  add,
  // remove,
  removeByTxn,
  removeAll,
  usePendingTransactions,
  loadAsyncStorage
}

