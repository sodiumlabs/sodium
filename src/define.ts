
export const fixWidth = 720;

export enum eStorageKey {
  stoken = "stoken"
}

export interface ILoginData {
  isLogin?: boolean,
  blockchainAddress?: string,
  token?: string
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
