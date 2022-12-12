import { ConnectOptions, UserTokenInfo, WalletRequestHandler, Web3Signer } from '@0xsodium/provider';
import { TransactionRequest } from '@0xsodium/transactions';
import { BigNumber } from "@ethersproject/bignumber";
import { ERC20Transfer } from '../abi';

export const fixWidth = 720;

export type AuthData = {
  isLogin: true,
  blockchainAddress: string,
  wallet: WalletRequestHandler,
  web3signer: Web3Signer
} | {
  isLogin: false
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
}

export interface IDeployConfirmModalParam {
  continueClick: () => void,
  cancelClick: () => void,
  options: ConnectOptions,
}

export interface ISignTranscationModalParam {
  continueClick: () => Promise<void>,
  cancelClick: () => void,
  decodeTransfer: IDecodeTranscation[],
  options: ConnectOptions,
  chaindId: number,
  txn: TransactionRequest
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