import { WalletRequestHandler, Web3Signer } from '@0xsodium/provider';
import { Account } from '@0xsodium/wallet';
import { AuthSessionResponse } from '../auth';
import { Signer as AbstractSigner } from 'ethers';

// TODO
// 支持safe session

export type Session = {
    sessionKeyOwner: AbstractSigner
    sessionKeyOwnerAddress: string
    sodiumNetworkResponse?: AuthSessionResponse
    authre: {
        authProvider: string
        displayName: string
    }
}

export type SodiumWallet = {
    address: string,
    handler: WalletRequestHandler,
    signer: Account,
    web3signer: Web3Signer,
    session: Session
}