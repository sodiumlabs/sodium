import { useStore } from "@nanostores/react";
import { atom, computed, WritableAtom } from 'nanostores';
import { loadTxnQueue, saveTxnQueue } from "../common/asyncStorage";
import { hashcodeObj, waitTime } from '../common/common';
import { eStotageKey, ITranscation } from '../define';
import { getAuth } from '../data/auth';

class PendingTxs {
  public transcations: WritableAtom<ITranscation[]>;

  constructor() {
    this.transcations = atom<ITranscation[]>([]);
  }
  public add(tx: ITranscation) {
    const pendings = this.transcations.get();
    if (pendings.some((itemTx) => itemTx.txHash == tx.txHash)) {
      return;
    }
    const newTxs = [...pendings, tx];
    newTxs.sort((a, b) => {
      return a.timeStamp - b.timeStamp;
    });
    this.transcations.set(newTxs);
    // return index
    return newTxs.length - 1;
  }

  set(txs: ITranscation[]) {
    this.transcations.set(txs);
  }

  get(): ITranscation[] {
    return this.transcations.get();
  }

  removeByTxn(txn: ITranscation) {
    const newPendingTransactions = computed(this.transcations, txs => {
      return txs.filter((item, index) => item.txHash != txn.txHash);
    });
    this.transcations.set(newPendingTransactions.get());
  }
}


const LocalPendingTxs = new PendingTxs();
const CurPendingTxs = new PendingTxs();
const TotalPendingTxs = new PendingTxs();

LocalPendingTxs.transcations.subscribe(value => {
  TotalPendingTxs.set([...LocalPendingTxs.get(), ...CurPendingTxs.get()]);
});
CurPendingTxs.transcations.subscribe(value => {
  TotalPendingTxs.set([...LocalPendingTxs.get(), ...CurPendingTxs.get()]);
});

TotalPendingTxs.transcations.subscribe(value => {
  saveTxnQueue(eStotageKey.pendingTxs, value);
});

function usePendingTransactions() {
  return useStore(TotalPendingTxs.transcations);
}

function removeAll() {
  LocalPendingTxs.set([]);
  CurPendingTxs.set([]);
}

const loadAsyncStorage = async () => {
  const pendingTxs = await loadTxnQueue(eStotageKey.pendingTxs);
  // Check whether it is complete. If yes, remove it
  // ...
  LocalPendingTxs.set(pendingTxs);
  checkTxState();
}

const checkTxState = async () => {
  const localPendingTxs = LocalPendingTxs.get();
  console.log("checkTxState");
  if (localPendingTxs == null || localPendingTxs.length <= 0) {
    return;
  }
  const auth = getAuth();
  if (localPendingTxs) {
    console.log("localPendingTxs before remove:");
    console.log(localPendingTxs);
    const promises = [];
    for (let i = localPendingTxs.length - 1; i >= 0; i--) {
      const localTx = localPendingTxs[i];
      promises.push(new Promise(async (resolve, reject) => {
        const transactionReceipt = await auth.web3signer.provider.getTransactionReceipt(localTx.txHash);
        resolve({
          transactionReceipt,
          localTx
        })
      }));
    }

    const pendingResult = await Promise.all(promises);
    console.log("localPendingTxsResult:");
    console.log(pendingResult);
    for (let i = localPendingTxs.length - 1; i >= 0; i--) {
      if (!!pendingResult[i].transactionReceipt) {
        const index = localPendingTxs.findIndex(localTx => localTx.txHash == pendingResult[i].localTx.txHash)
        if (index != -1) {
          localPendingTxs.splice(index, 1);
        }
      }
    }
    console.log("localPendingTxs after remove:");
    console.log(localPendingTxs);
  }
  LocalPendingTxs.set([...localPendingTxs]);
  await waitTime(2000);
  checkTxState();
}

export const transactionPending = {
  addCurPending: CurPendingTxs.add.bind(CurPendingTxs),
  removeCurPending: CurPendingTxs.removeByTxn.bind(CurPendingTxs),

  removeAll: removeAll,
  usePendingTransactions,
  loadAsyncStorage
}

