import { SodiumWallet, } from './types';
import { WalletRequestHandler } from '@0xsodium/provider';
import { atom } from 'nanostores';

export const walletAtom = atom<SodiumWallet | null>(null);
export const walletHandlerAtom = atom<WalletRequestHandler>();