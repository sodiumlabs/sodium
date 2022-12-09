import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { IDepositItemData } from "../../lib/define";
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
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={styles.container}>
          <MText style={{ marginVertical: 6 }}>Deposit</MText>
          <DepositItem depositItemData={curDepositItem} isSelected={true} onDeposiItemClick={onDeposiItemClick} />
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
});