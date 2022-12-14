import { useStore } from "@nanostores/react";
import { atom, computed } from 'nanostores';
import { loadTxnQueue, saveTxnQueue } from "../common/asyncStorage";
import { hashcodeObj } from '../common/common';
import { ITranscation } from '../define';

export const requestedTransactions = atom<ITranscation[]>([]);


const add = (tx: ITranscation) => {
    const newTxs = [...requestedTransactions.get(), tx];
    requestedTransactions.set(newTxs);

    // TODO
    // async-storage limited
    // https://react-native-async-storage.github.io/async-storage/docs/advanced/db_size

    // return index
    return newTxs.length - 1;
}

export const useRequestedTransactions = () => {
    return useStore(requestedTransactions);
}

const remove = (findIndex: number) => {
    const newRequestedTransactions = computed(requestedTransactions, txs => {
        return txs.filter((_, index) => index != findIndex);
    });
    requestedTransactions.set(newRequestedTransactions.get());
}

const removeByTxn = (txn: ITranscation) => {
    const newRequestedTransactions = computed(requestedTransactions, txs => {
        return txs.filter((item, index) => hashcodeObj(item) != hashcodeObj(txn));
    });
    requestedTransactions.set(newRequestedTransactions.get());
}

const unbindListener = requestedTransactions.subscribe(value => {
    saveTxnQueue(value);
});

const loadReqTxsAsyncStorage = async () => {
    const txs = await loadTxnQueue();
    requestedTransactions.set(txs);
}

export const transactionQueue = {
    add,
    remove,
    removeByTxn,
    useRequestedTransactions,
    loadAsyncStorage: loadReqTxsAsyncStorage
}

