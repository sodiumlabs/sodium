import { ViewProps } from "react-native"
import { hashcodeObj } from "../../../lib/common"
import { IDecodeTranscation } from "../../../lib/define"
import { eColor } from "../../../lib/globalStyles"
import { BaseFoldFrame } from "../../base/baseFoldFrame"
import MText from "../../baseUI/mText"
import MVStack from "../../baseUI/mVStack"


export function TranscationDataItem(props: ViewProps & { uiDecodeDatas: IDecodeTranscation[] }) {
  const { uiDecodeDatas } = props;
  return (
    <BaseFoldFrame
      maxHeight={300}
      header={`Transcation Data(${uiDecodeDatas.length})`}
      style={{ marginTop: 20 }}>
      {
        uiDecodeDatas.map((decodetxn, index) => {
          return (
            <MVStack stretchW key={hashcodeObj(decodetxn) + index}
              style={{ borderRadius: 10, padding: 15, marginBottom: 10, backgroundColor: 'rgba(1,1,1,0.05)' }}>
              <MText numberOfLines={null} style={{ color: eColor.GrayContentText }}>
                {
                  JSON.stringify(decodetxn.originTxReq, null, 2)
                }
              </MText>
            </MVStack>
          )
        })
      }
    </BaseFoldFrame>
  )
}