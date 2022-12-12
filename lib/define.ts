import { ConnectOptions, UserTokenInfo, WalletRequestHandler, Web3Signer } from '@0xsodium/provider';

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
  options: ConnectOptions,
}


//----

export type IUserTokenInfo = UserTokenInfo & { rate: number, usdBalance: string };
