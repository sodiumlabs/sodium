import { FixedNumber, formatFixed, parseFixed, BigNumber } from "@ethersproject/bignumber";

export const waitTime = (tTime: number): Promise<number> => {
  return new Promise((tResolve: (value: number | PromiseLike<number>) => void, tReject: (reason?: unknown) => void) => {
    const timeIndex = setTimeout(() => {
      return tResolve(timeIndex);
    }, tTime);
  });
}

export const token2Usd = (tokenWei: string, usdRate: string, orgin?: boolean) => {
  if (!tokenWei) return null;
  if (!usdRate) return null;
  const usddecimals = 30;
  const t1 = FixedNumber.fromString(tokenWei).mulUnsafe(FixedNumber.from(usdRate));
  const t2 = t1.divUnsafe(FixedNumber.fromString(BigNumber.from("10").pow(usddecimals).toString())).toString();
  // console.debug('token2Usd', tokenWei, usdRate, t2.toString());
  // return `${parseInt(`${parseFloat(t2) * 100}`) / 100}`;
  if (orgin) {
    return parseFloat(t2) + '';
  }
  return `${parseInt(`${parseFloat(t2) * 100}`) / 100}`;
}


export const formatPrice2Wei = (tPrice: string, decimals: number = 18): string => {
  if (tPrice === undefined || tPrice === null || tPrice == '') {
    return tPrice;
  }

  const splits = tPrice.split('.');

  let targetPrice = tPrice;
  const mainStr = splits[0] as string;
  const dotStr = splits[1] as string;
  if (dotStr && dotStr.length > decimals) {
    targetPrice = mainStr + '.' + dotStr.slice(0, decimals);
    console.warn('formatPrice2Wei param warn:' + tPrice);
  }

  const format = parseFixed(targetPrice, decimals);
  return format.toString();
}


export const formatWei2Price = (tWei: string, decimals: number = 18, toFiexd: number = 2): string => {
  if (tWei === undefined || tWei === null || tWei == '') {
    return tWei;
  }
  tWei = FixedNumber.from(tWei).mulUnsafe(FixedNumber.from(10 ** toFiexd)).toString();
  let format = removeAllDecimalPoint(formatFixed(removeAllDecimalPoint(tWei), decimals));
  return FixedNumber.from(format).divUnsafe(FixedNumber.from(10 ** toFiexd)).toString();
}


export const removeAllDecimalPoint = (tStr: string): string => {
  if (!tStr) return tStr;
  if (!/^\d*\.\d*$/.test(tStr)) return tStr;
  return tStr.slice(0, tStr.indexOf("."));
}


export const getPageDatas = (pageData) => {
  let result = [];
  if (pageData) {
    for (let i = 0; i < pageData.pages.length; i++) {
      result = result.concat(pageData.pages[i]['data']);
    }
  }
  return result;
}
export const getPageDataByPage = (pageData, page) => {
  let result = [];
  if (pageData) {
    for (let i = 0; i < pageData.pages.length; i++) {
      result = result.concat(pageData.pages[i]['data']);
    }
  }
  return result;
}

export function hashcode(str: string) {
  let hash = 0;
  if (!str || str.length === 0) return hash;
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function hashcodeObj(obj: unknown) {
  const str = JSON.stringify(obj);
  return hashcode(str);
}



export function mapRange(x: number, a: number, b: number, c: number, d: number): number {
  return (x - a) * (d - c) / (b - a) + c;
}


export function isMatchEthAddress(address: string) {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}


export function isMatchEnsAddress(address: string) {
  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(address);
}


export function downText(text: string) {
  // const text = 'This is the text that will be downloaded';

  fetch('data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'recovery-codes.txt';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.error(error));
}

export function isBeOpenedByThirdParty() {
  return !!window.opener;
}