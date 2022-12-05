import { useState } from "react";
import { StyleSheet } from "react-native";
import { IDepositItemData } from "../../src/define";
import { BaseScreen } from "../base/baseScreen";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import DepositItem from "../item/depositItem";

export function DepositScreen() {
  const [curDepositItem, setCurDepositItem] = useState<IDepositItemData>(null);
  const onDeposiItemClick = (selectItem: IDepositItemData) => {
    if (curDepositItem && selectItem.name == curDepositItem.name) {
      setCurDepositItem(null);
      return;
    }
    setCurDepositItem({ ...selectItem });
  }
  return (
    <BaseScreen >
      <MVStack stretchW style={{ alignItems: 'center', marginTop: 40, paddingHorizontal: 15 }}>
        <MText style={{ marginVertical: 6 }}>Deposit</MText>

        <DepositItem depositItemData={curDepositItem} isSelected={true} onDeposiItemClick={onDeposiItemClick} />
      </MVStack>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});