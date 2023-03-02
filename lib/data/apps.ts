import { IApp } from '../define';

export const getApps = (): Promise<IApp[]> => {
    return Promise.resolve([
        {
            name: "uniswap",
            description: "a uniswap",
            icon: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
            uri: "https://uniswap-interface-mocha.vercel.app/",
            // uri: "http://192.168.50.196:3001",
            supportChainIds: [
                137, 80001
            ],
            supportedMobile: true
        }
    ] as IApp[]);
}