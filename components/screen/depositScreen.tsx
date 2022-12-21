import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, IDepositItemData } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import DepositItem from "../item/depositItem";

export function DepositScreen() {
  const dimension = useDimensionSize();
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
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }]}>
            <MText style={{ marginVertical: 6 }}>Deposit</MText>
            <DepositItem depositItemData={curDepositItem} isSelected={true} onDeposiItemClick={onDeposiItemClick} />
            <Spacer />
            <Information />
          </MVStack>
        </MVStack>
      </ScrollView>
    </BaseScreen>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 15,
    maxWidth: fixWidth
  },
});