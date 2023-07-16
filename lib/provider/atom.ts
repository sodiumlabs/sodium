import { SodiumWallet, } from './types';
import { WalletRequestHandler, ProxyMessageChannel } from '@0xsodium/provider';
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { OnboardAPI } from '@web3-onboard/core';

export const walletAtom = atom<SodiumWallet | null>(null);
export const walletHandlerAtom = atom<WalletRequestHandler>();
export const onboardAPIAtom = atom<OnboardAPI>(null);

export const proxyChannel = new ProxyMessageChannel();

// ignore
proxyChannel.app.handleMessage = () => {}

export function useWalletHandler() {
    return useStore(walletHandlerAtom);
}