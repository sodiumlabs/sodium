import { useStore } from "@nanostores/react";
import { atom, computed } from 'nanostores';
import { loadTxnQueue, saveTxnQueue } from "../common/asyncStorage";
import { hashcodeObj } from '../common/common';
import { eStotageKey, ITranscation } from '../define';

export const pendingTransactions = atom<ITranscation[]>([]);


const add = (tx: ITranscation) => {
  const newTxs = [...pendingTransactions.get(), tx];
  newTxs.sort((a, b) => {
    return a.timeStamp - b.timeStamp;
  });
  pendingTransactions.set(newTxs);

  // TODO
  // async-storage limited
  // https://react-native-async-storage.github.io/async-storage/docs/advanced/db_size

  // return index
  return newTxs.length - 1;
}

export const usePendingTransactions = () => {
  return useStore(pendingTransactions);
}

const remove = (findIndex: number) => {
  const newRequestedTransactions = computed(pendingTransactions, txs => {
    return txs.filter((_, index) => index != findIndex);
  });
  pendingTransactions.set(newRequestedTransactions.get());
}

const removeByTxn = (txn: ITranscation) => {
  const newRequestedTransactions = computed(pendingTransactions, txs => {
    return txs.filter((item, index) => hashcodeObj(item) != hashcodeObj(txn));
  });
  pendingTransactions.set(newRequestedTransactions.get());
}

const removeAll = () => {
  pendingTransactions.set([]);
}

const unbindListener = pendingTransactions.subscribe(value => {
  saveTxnQueue(eStotageKey.pendingTxs, value);
});

const loadAsyncStorage = async () => {
  const txs = await loadTxnQueue(eStotageKey.pendingTxs);
  pendingTransactions.set(txs);
}

export const transactionPending = {
  add,
  remove,
  removeByTxn,
  removeAll,
  usePendingTransactions,
  loadAsyncStorage
}

