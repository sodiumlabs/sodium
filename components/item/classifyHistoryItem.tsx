import { TransactionHistory } from "@0xsodium/provider";
import { eColor } from "../../lib/globalStyles";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import HistoryItem from "./historyItem";



export const ClassifyHistoryItem = (props: { title: string, historyMap: Map<string, TransactionHistory[]> }) => {
  const { title, historyMap } = props;
  if (!historyMap || !historyMap[title]) {
    return <></>
  }
  return (
    <MVStack stretchW>
      <MText style={{ marginVertical: 15, color: eColor.GrayContentText }}>{title}</MText>
      {
        historyMap[title].map((item, index) => {
          return <HistoryItem key={index} history={item} />
        })
      }

    </MVStack>
  )
}
