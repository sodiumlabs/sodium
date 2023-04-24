import { IApp } from '../define';
import { atom } from "nanostores";

export const getApps = (): Promise<IApp[]> => {
    return Promise.resolve([
        {
            name: "uniswap",
            description: "a uniswap",
            icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
            // uri: "https://uniswap-interface-mocha.vercel.app/",
            uri: "http://localhost:3001/",
            supportChainIds: [
                137, 80001
            ],
            supportedMobile: true
        }
    ] as IApp[]);
}

const openedAppsAtom = atom<IApp[]>([]);

export const isOpenedAppByUri = (uri: string): boolean => {
    return openedAppsAtom.get().some((app) => (new URL(app.uri)).origin === (new URL(uri).origin));
}

export const setOpenedApp = (app: IApp) => {
    openedAppsAtom.set([...openedAppsAtom.get(), app]);
}