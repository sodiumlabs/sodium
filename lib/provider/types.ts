import { WalletRequestHandler, Web3Signer } from '@0xsodium/provider';
import { Account } from '@0xsodium/wallet';
import { Platform as SodiumPlatform } from '@0xsodium/config';
import { Wallet } from 'ethers';

export type Session = {
    sodiumUserId: string,
    platform: SodiumPlatform, 
    w: Wallet
}

export type SodiumWallet = {
    address: string,
    handler: WalletRequestHandler,
    signer: Account,
    web3signer: Web3Signer,
    session: Session
}