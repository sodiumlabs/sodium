import { useStore } from "@nanostores/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, computed } from 'nanostores';
import { hashcodeObj } from '../common/common';
import { getAuth } from "../data/auth";
import { eStotageKey, ITranscation } from '../define';

export const requestedTransactions = atom<ITranscation[]>([]);

const loadReqTxsAsyncStorage = async () => {
    const auth = getAuth();
    if (auth.isLogin) {
        console.log('load AsyncStorage：' + eStotageKey.requestedTxs);
        const reqs = await AsyncStorage.getItem(eStotageKey.requestedTxs + auth.blockchainAddress);
        if (reqs != null) {
            try {
                const txs = JSON.parse(reqs);
                requestedTransactions.set(txs);
            } catch (error) {
                requestedTransactions.set([]);
            }
        }
    }
}

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
    try {
        const auth = getAuth();
        if (auth.isLogin) {
            console.log('save AsyncStorage：' + eStotageKey.requestedTxs);
            AsyncStorage.setItem(eStotageKey.requestedTxs + auth.blockchainAddress, JSON.stringify(value));
        }
    } catch (error) {
        //
    }

});

export const transactionQueue = {
    add,
    remove,
    removeByTxn,
    useRequestedTransactions,
    loadAsyncStorage: loadReqTxsAsyncStorage
}

