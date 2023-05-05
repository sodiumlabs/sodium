import { NetworkConfig } from '@0xsodium/network';
import { ConnectOptions, MessageToSign, TransactionHistory, UserTokenInfo, WalletRequestHandler, Web3Signer } from '@0xsodium/provider';
import { Transaction, TransactionRequest } from '@0xsodium/transactions';
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { Account } from '@0xsodium/wallet';
import { ReactNode } from 'react';
import { ERC20Transfer } from '../abi';
import { ERC20Approve } from '../abi/erc20';
import { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { Session } from './provider/types';
import { JsonFragment } from '@ethersproject/abi';
import { ERC20OrNativeTokenMetadata } from '@0xsodium/utils/dist/declarations/src/erc20';
import { IconMumbai, IconPolygon, IconSodium } from './imageDefine';

export const fixWidth = 720;
export const designWidth = 1280;
export const MaxBigNumber = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
export const MaxFixedNumber = FixedNumber.from(MaxBigNumber);

export interface AuthData {
  isLogin: boolean,
  blockchainAddress: string,
  wallet: WalletRequestHandler,
  signer: Account,
  web3signer: Web3Signer,
  session: Session
}

export interface ProfileData {
  authorizedSource: string,
  userName: string
}

export interface IModalParam<T = unknown> {
  visible?: boolean,
  hideImmediately?: boolean,
  param?: T,
  uniqueKey?: unknown
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
  Apps = 'Apps',
  Session = 'Session',
  History = 'History',
  Coin = 'Coin',
  Send = 'Send',
  Deposit = 'Deposit',
  Login = 'Login',
  Security = 'Security',
  SetupAuth = 'SetupAuth',
  RecoveryCode = 'RecoveryCode',
  Allowance = 'Allowance',
  Opening = 'Opening',
  AuthCallbackScreen = 'AuthCallbackScreen',
}

export type ScreenParamList = {
  Wallet: undefined,
  Setting: undefined,
  Profile: undefined,
  Session: undefined,
  Apps: undefined,
  History: undefined,
  Coin: IUserTokenInfo,
  Send: IUserTokenInfo,
  Deposit: undefined,
  Login: undefined,
  Security: undefined,
  SetupAuth: undefined,
  RecoveryCode: undefined,
  Allowance: undefined,
  Opening: undefined,
  AuthCallbackScreen: undefined
}


// ---------------------modal-------------------------
export interface IModalParam<T = unknown> {
  visible?: boolean,
  param?: T,
}

export interface ISignMessageModalParam {
  continueClick: () => Promise<void>,
  cancelClick: () => void,
  options: ConnectOptions,
  message: MessageToSign
}

export interface IConnectModalParam {
  continueClick: () => Promise<void>,
  cancelClick: () => Promise<void>,
  options: ConnectOptions,
}

export interface IWebViewModalParam {
  options: {
    source: WebViewSource
  },
}

export interface IDeployConfirmModalParam {
  continueClick: () => void,
  cancelClick: () => void,
  options: ConnectOptions,
  network: NetworkConfig
}

export interface ISignTranscationModalParam {
  continueClick: (continueTxn: Transaction[], onPendingStart?: (txHash: string) => void, onPendingEnd?: () => void, onError?: () => void) => Promise<void>,
  cancelClick: () => void,
  decodeDatas: IDecodeTranscation[],
  options: ConnectOptions,
  chaindId: number,
  txn: ITranscation,
}


export interface IComModalParam {
  height: number,
  reactNode: ReactNode
}


export interface IDropdownOption {
  name: string,
  data: unknown
}

export type ContractABI = JsonFragment

export type Contract = {
  contractName: string;
  abi: ContractABI[];
}

export interface IDecodeTranscation {
  originTxReq: Transaction,
  decodeTransferData?: ERC20Transfer,
  decodeApproveData?: ERC20Approve,
  contractInfo?: Contract
}

//---- from sdk define

export type IUserTokenInfo = UserTokenInfo & { rate: number, usdBalance: string };

export type PaymasterInfo = {
  token: ERC20OrNativeTokenMetadata
  // wei
  amount: BigNumber
  expiry: number
}

export interface ITranscation {
  txReq: TransactionRequest,
  timeStamp: number,
  decodeDatas: IDecodeTranscation[],
  txHash?: string,
  txGas?: PaymasterInfo
}

export enum eStotageKey {
  requestedTxs = '@sodium.requestedTxs',
  pendingTxs = '@sodium.pendingTxs',
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

export interface IApp {
  name: string
  description: string
  icon: string
  uri: string
  supportChainIds: number[]
  supportedMobile: boolean
}

export const NetWorkIconMap = {
  polygon: IconPolygon,
  sodiumt: IconSodium,
  mumbai: IconMumbai
}