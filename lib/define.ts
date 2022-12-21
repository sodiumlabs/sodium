import { NetworkConfig } from '@0xsodium/network';
import { ConnectOptions, MessageToSign, TransactionHistory, UserTokenInfo, WalletRequestHandler, Web3Signer } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { BigNumber } from "@ethersproject/bignumber";
import { ReactNode } from 'react';
import { ERC20Transfer } from '../abi';

export const fixWidth = 720;
export const designWidth = 1280;

export interface AuthData {
  isLogin: boolean,
  blockchainAddress: string,
  wallet: WalletRequestHandler,
  web3signer: Web3Signer
}

export interface IModalParam {
  visible?: boolean,
  param?: unknown,
}

export interface IDepositItemData {
  name: string,
  paywiths: string[],
  fee: string,
  limit: string,
  currencies: string[]
}

export enum Screens {
  Wallet = 'Wallet',
  Setting = 'Setting',
  Profile = 'Profile',
  Session = 'Session',
  History = 'History',
  Coin = 'Coin',
  Send = 'Send',
  Deposit = 'Deposit',
  Login = 'Login',
  Connect = 'Connect',
  Security = 'Security',
  SetupAuth = 'SetupAuth',
  RecoveryCode = 'RecoveryCode',
}

export type ScreenParamList = {
  Wallet: undefined,
  Setting: undefined,
  Profile: undefined,
  Session: undefined,
  History: undefined,
  Coin: undefined,
  Send: undefined,
  Deposit: undefined,
  Login: undefined,
  Connect: undefined,
  Security: undefined,
  SetupAuth: undefined,
  RecoveryCode: undefined,
}

export interface IConnectScreenParam {
  continueClick: () => void,
  cancelClick: () => void,
  options: ConnectOptions,
}


// ---------------------modal-------------------------
export interface IModalParam {
  visible?: boolean,
  param?: unknown,
}

export interface ISignMessageModalParam {
  // signeeIcon: string,
  // signeeName: string,
  // signeeAddress: string,
  // signMessage: string,
  continueClick: () => Promise<void>,
  cancelClick: () => void,
  options: ConnectOptions,
  message: MessageToSign
}

export interface IDeployConfirmModalParam {
  continueClick: () => void,
  cancelClick: () => void,
  options: ConnectOptions,
  network: NetworkConfig
}

export interface ISignTranscationModalParam {
  continueClick: () => Promise<void>,
  cancelClick: () => void,
  decodeTransfer: IDecodeTranscation[],
  options: ConnectOptions,
  chaindId: number,
  txn: ITranscation
}


export interface IComModalParam {
  height: number,
  reactNode: ReactNode
}


export interface IDropdownOption {
  name: string,
  data: unknown
}

export interface IDecodeTranscation {
  origin: TransactionRequest,
  decodeTransfer: ERC20Transfer,
}

//---- from sdk define

export type IUserTokenInfo = UserTokenInfo & { rate: number, usdBalance: string };

export declare type ERC20OrNativeTokenMetadata = {
  address: string;
  chainId: number;
  isNativeToken?: true;
  name: string;
  symbol: string;
  decimals: number;
  centerData: {
    logoURI?: string;
    website?: string;
    description?: string;
  };
};


export declare type GasPrice = {
  maxPriorityFeePerGas: BigNumber;
  maxFeePerGas: BigNumber;
};

export declare type GasSuggest = {
  standard: GasPrice;
  fast: GasPrice;
  rapid: GasPrice;
};


export type PaymasterInfo = {
  token: ERC20OrNativeTokenMetadata
  // wei
  amount: BigNumber
  expiry: number
}

export interface ITranscation {
  txReq: TransactionRequest,
  timeStamp: number,
}

export enum eStotageKey {
  requestedTxs = 'requestedTxs',
}

export interface ITransactionHistoryGroup {
  historys: TransactionHistory[],
  gourpName: string,
}

export interface IBarParam {
  hasNavigationBar: boolean,
  hasFloatingBar: boolean,
  hasNavigationBarBack: boolean,
}