import { SodiumWallet, } from './types';
import { WalletRequestHandler, ProxyMessageChannel } from '@0xsodium/provider';
import { atom } from 'nanostores';

export const walletAtom = atom<SodiumWallet | null>(null);
export const walletHandlerAtom = atom<WalletRequestHandler>();

export const proxyChannel = new ProxyMessageChannel();

// ignore
proxyChannel.app.handleMessage = () => {}