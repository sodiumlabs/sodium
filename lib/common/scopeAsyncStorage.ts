import { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Callback, MultiGetCallback, KeyValuePair, MultiCallback } from '@react-native-async-storage/async-storage/lib/typescript/types';

export class ScopeAsyncStorage implements AsyncStorageStatic {
    constructor(protected scope: string) {

    }
    computeKey(key: string): string {
        return `${this.scope}@${key}`;
    }
    async getItem(key: string): Promise<string> {
        const result = await AsyncStorage.getItem(this.computeKey(key));

        console.debug("getItem scope", this.computeKey(key), result);

        return result;
    }
    setItem(key: string, value: string): Promise<void> {
        return AsyncStorage.setItem(this.computeKey(key), value);
    }
    removeItem(key: string): Promise<void> {
        return AsyncStorage.removeItem(this.computeKey(key));
    }
    mergeItem(key: string, value: string, callback?: Callback): Promise<void> {
        throw new Error("TODO");
    }
    async clear(): Promise<void> {
        const keys = await AsyncStorage.getAllKeys();
        await Promise.all(keys.map(k => AsyncStorage.removeItem(k)));
        return Promise.resolve();
    }
    async getAllKeys(): Promise<readonly string[]> {
        const keys = await AsyncStorage.getAllKeys();
        return keys.filter(k => {
            return k.split("@")[0] == this.scope;
        });
    }
    flushGetRequests(): void {
        throw new Error("TODO");
    }
    multiGet(keys: readonly string[], callback?: MultiGetCallback): Promise<readonly KeyValuePair[]> {
        throw new Error("TODO");
    }
    multiSet(keyValuePairs: [string, string][], callback?: MultiCallback): Promise<void> {
        throw new Error("TODO");
    }
    multiRemove(keys: readonly string[], callback?: MultiCallback): Promise<void> {
        throw new Error("TODO");
    }
    multiMerge(keyValuePairs: [string, string][], callback?: MultiCallback): Promise<void> {
        throw new Error("TODO");
    }
}