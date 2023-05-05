

import { NetworkConfig } from "@0xsodium/network";
import { ViewProps } from "react-native";
import { IconTokenDefault } from "../../lib/imageDefine";
import { mainNetworks, switchNetwork, useCurrentChainId } from "../../lib/network";
import { Spacer } from "../base/spacer";
import MImage from "../baseUI/mImage";
import MPressable from "../baseUI/mPressable";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { MRadioItem } from "./radioItem";
import { eColor } from "../../lib/globalStyles";
import { capitalize } from "../../lib/common";
import { NetWorkIconMap } from "../../lib/define";


export function NetworkRadioGroup(props: ViewProps) {

  const getSortMainNetwork = () => {
    return mainNetworks.sort((a, b) => a.chainId - b.chainId);
  }
  const currentChainId = useCurrentChainId();
  const changeNetwork = (nw: NetworkConfig) => {
    switchNetwork(nw.chainId);
  }

  const { ...reset } = props;

  return (
    <MVStack
      {...reset}>
      {
        getSortMainNetwork().map((networkItem: NetworkConfig, index) => {
          const isSelected = currentChainId == networkItem.chainId;
          return (
            <MPressable key={index + "" + networkItem.chainId} onPress={() => { changeNetwork(networkItem) }} style={{ flexDirection: 'row', marginVertical: 7 }} >
              <MImage style={{ marginLeft: 2 }} w={16} h={16} source={NetWorkIconMap[networkItem.name]} />
              <MText style={{ marginLeft: 10, color: isSelected ? eColor.Blue : eColor.Blackest }} >{capitalize(networkItem.name)}</MText>
              <Spacer />
              <MRadioItem checked={isSelected} />
            </MPressable>
          )
        })
      }
    </MVStack>
  )
}
