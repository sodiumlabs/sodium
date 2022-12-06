import { WalletRequestHandler } from '@0xsodium/provider';

export const fixWidth = 720;

export type AuthData = {
  isLogin: true,
  blockchainAddress: string,
  wallet: WalletRequestHandler
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
  Login = 'Login'
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
}