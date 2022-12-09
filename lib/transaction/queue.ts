import { TransactionRequest } from '@0xsodium/transactions';
import { useStore } from "@nanostores/react";
import { atom, computed } from 'nanostores';

export const requestedTransactions = atom<TransactionRequest[]>([]);

const add = (tx: TransactionRequest) => {
    const newTxs = [...requestedTransactions.get(), tx];
    requestedTransactions.set(newTxs);

    // TODO
    // async-storage limited
    // https://react-native-async-storage.github.io/async-storage/docs/advanced/db_size

    // return index
    return newTxs.length - 1;
}

const useRequestedTransactions = () => {
    return useStore(requestedTransactions);
}

const remove = (findIndex: number) => {
    const newRequestedTransactions = computed(requestedTransactions, txs => {
        return txs.filter((_, index) => index != findIndex);
    });
    requestedTransactions.set(newRequestedTransactions.get());
}

const unbindListener = requestedTransactions.subscribe(value => {
    // TODO to async-storage
});

export const transactionQueue = {
    add,
    remove,
    useRequestedTransactions
}