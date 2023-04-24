// 控制所有事件依赖性状态变更
import { walletHandlerAtom } from './provider';
import { switchNetwork, currentChainIdAtom } from './network';
import { updateV1SessionChainId } from './walletconnect';

export const listenWalletHanlder = () => {
    walletHandlerAtom.subscribe((walletHandler) => {
        if (walletHandler) {
            walletHandler.on("connect", (details) => {
                // console.debug("wallet connect", details);
            });

            walletHandler.on("disconnect", (error) => {
                // console.debug("wallet disconnect", error);
            });

            walletHandler.on("accountsChanged", (accounts) => {
                // console.debug("accountsChanged", accounts);
            });

            walletHandler.on("chainChanged", (chainId) => {
                switchNetwork(parseInt(chainId));
            });
        }
    });

    currentChainIdAtom.subscribe((chainId) => {
        updateV1SessionChainId(chainId);
    });
}


export const listen = () => {
    listenWalletHanlder();
}