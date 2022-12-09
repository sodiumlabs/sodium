import { FixedNumber, formatFixed, parseFixed, BigNumber } from "@ethersproject/bignumber";

export const waitTime = (tTime: number): Promise<number> => {
  return new Promise((tResolve: (value: number | PromiseLike<number>) => void, tReject: (reason?: unknown) => void) => {
    const timeIndex = setTimeout(() => {
      return tResolve(timeIndex);
    }, tTime);
  });
}

export const token2Usd = (tokenWei: string, usdRate: string) => {
  if (!tokenWei) return null;
  if (!usdRate) return null;
  const usddecimals = 30;
  const t1 = FixedNumber.fromString(tokenWei).mulUnsafe(FixedNumber.from(usdRate));
  const t2 = t1.divUnsafe(FixedNumber.fromString(BigNumber.from("10").pow(usddecimals).toString())).toString();
  // console.debug('token2Usd', tokenWei, usdRate, t2);
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