import { IApp } from '../define';

export const getApps = (): Promise<IApp[]> => {
    return Promise.resolve([
        // {
        //     name: "uniswap",
        //     description: "a uniswap",
        //     icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
        //     uri: "http://192.168.50.196:3000",
        //     supportChainIds: [
        //         137, 80001
        //     ],
        //     supportedMobile: true
        // }
    ] as IApp[]);
}