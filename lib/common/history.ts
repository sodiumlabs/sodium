import { TransactionHistory } from "@0xsodium/provider";
import { formatHistoryTime2Today } from "./time";


export function classifyHistory(transcationHistorys: TransactionHistory[]): Map<string, TransactionHistory[]> {
  let transHistoryMap: Map<string, TransactionHistory[]> = new Map();

  transcationHistorys.forEach((history) => {
    const group = formatHistoryTime2Today(history.block.blockTimestamp * 1000);
    if (!transHistoryMap.has(group)) {
      transHistoryMap.set(group, []);
    }
    transHistoryMap.get(group).push(history);
  });
  transHistoryMap.forEach((historys, group) => {
    historys.sort((hA, hB) => {
      return hB.block.blockTimestamp - hA.block.blockTimestamp;
      // return hA.block.blockTimestamp - hB.block.blockTimestamp;
    })
  })
  return transHistoryMap;
}