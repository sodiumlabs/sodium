import { useStore } from "@nanostores/react";
import { atom, computed, WritableAtom } from 'nanostores';
import { loadTxnQueue, saveTxnQueue } from "../common/asyncStorage";
import { waitTime } from '../common/common';
import { eStotageKey, ITranscation } from '../define';
import { getAuth } from '../data/authAtom';
import { Platform } from "react-native";
import { Logger } from "../common/utils";

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

/**
 * pending can be divided into two types. 
 * One type is the recovery from Local. You need to check the tx status constantly to determine whether to remove it. 
 * The other is the Cur, which is automatically removed at runtime.
 */
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
  // Fix next.js ssr
  if (Platform.OS == "web" && typeof window !== "undefined") {
    saveTxnQueue(eStotageKey.pendingTxs, value);
  }
});

async function checkTxState() {
  const localPendingTxs = LocalPendingTxs.get();
  Logger.debug("checkTxState");
  if (localPendingTxs == null || localPendingTxs.length <= 0) {
    return;
  }
  const auth = getAuth();
  if (localPendingTxs) {
    Logger.debug("localPendingTxs before remove:");
    Logger.debug(localPendingTxs);
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
    // Logger.debug("localPendingTxsResult:");
    // Logger.debug(pendingResult);
    for (let i = localPendingTxs.length - 1; i >= 0; i--) {
      if (!!pendingResult[i].transactionReceipt) {
        let index = -1;
        for (let j = 0; j < localPendingTxs.length; j++) {
          if (localPendingTxs[j].txHash == pendingResult[i].localTx.txHash) {
            index = j;
            break;
          }
        }
        if (index != -1) {
          localPendingTxs.splice(index, 1);
        }
      }
    }
    Logger.debug("localPendingTxs after remove:");
    Logger.debug(localPendingTxs);
  }
  LocalPendingTxs.set([...localPendingTxs]);
  await waitTime(2000);
  checkTxState();
}

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

export const transactionPending = {
  addCurPending: CurPendingTxs.add.bind(CurPendingTxs),
  removeCurPending: CurPendingTxs.removeByTxn.bind(CurPendingTxs),

  removeAll: removeAll,
  usePendingTransactions,
  loadAsyncStorage
}

