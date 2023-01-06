import { TransactionHistory } from "@0xsodium/provider";
import { formatHistoryTime2Today } from "./time";


export function classifyHistory(transcationHistorys: TransactionHistory[]): Map<string, TransactionHistory[]> {
  let transHistoryMap: Map<string, TransactionHistory[]> = new Map();

  transcationHistorys.forEach((history) => {
    const group = formatHistoryTime2Today(history.block.blockTimestamp * 1000);
    if (!transHistoryMap[group]) {
      transHistoryMap[group] = [];
    }
    transHistoryMap[group].push(history);
  });

  transHistoryMap.forEach(historys => {
    historys.sort((hA, hB) => {
      return hA.block.blockTimestamp - hB.block.blockTimestamp;
    })
  })
  return transHistoryMap;
}