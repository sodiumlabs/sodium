import { NetworkConfig } from '@0xsodium/network';
import { ConnectOptions, MessageToSign, TransactionHistory, UserTokenInfo, WalletRequestHandler, Web3Signer } from '@0xsodium/provider';
import { Transaction, TransactionRequest } from '@0xsodium/transactions';
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { Account } from '@0xsodium/wallet';
import { ReactNode } from 'react';
import { ERC20Transfer } from '../abi';
import { ERC20Approve } from '../abi/erc20';

export const fixWidth = 720;
export const designWidth = 1280;
export const MaxBigNumber = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
export const MaxFixedNumber = FixedNumber.from(MaxBigNumber);

export interface AuthData {
  isLogin: boolean,
  blockchainAddress: string,
  wallet: WalletRequestHandler,
  signer: Account,
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
  Allowance = 'Allowance',
}

export type ScreenParamList = {
  Wallet: undefined,
  Setting: undefined,
  Profile: undefined,
  Session: undefined,
  History: undefined,
  Coin: IUserTokenInfo,
  Send: undefined,
  Deposit: undefined,
  Login: undefined,
  Connect: IConnectScreenParam,
  Security: undefined,
  SetupAuth: undefined,
  RecoveryCode: undefined,
  Allowance: undefined,
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
  continueClick: (continueTxn: Transaction[]) => Promise<void>,
  cancelClick: () => void,
  decodeDatas: IDecodeTranscation[],
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
  originTxReq: Transaction,
  decodeTransferData: ERC20Transfer,
  decodeApproveData: ERC20Approve,
  // decodeStr: string
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
  requestedTxs = '@sodium.requestedTxs',

  session = '@sodium.session.security'
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

export interface ISelectItemData {
  isSelected: boolean,
  data: unknown
}

export interface IDepositToken {
  icon: string,
  tokenCount: number,
  tokenID: string,
  usdCount: number,
}

export enum eApproveType {
  SetAllowance,
  RevokeAfter,
  KeepUnlimted
}