export const CLIENT_OPTIONS = {
    clientMeta: {
        description: 'sodium wallet',
        url: 'https://metamask.io',
        icons: [
            'https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg',
        ],
        name: 'sodium',
        ssl: true,
    },
};

export const WALLET_CONNECT_ORIGIN = 'wc::';
export type Versions = '1' | '2';
export const getWalletConnectLinkVersion = (url: string): Versions => {
    // wc:316ea344-3ad9-40f4-a0fb-7f3cd698d7cc@1?bridge=https%3A%2F%2Fn.bridge.walletconnect.org&key=481aeac3f5214fabe600ca521237d1710405ff5dbf61d1ca140ad33f48091e91
    return url.split("?")[0].split("@")[1] as Versions
}