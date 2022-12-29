import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useQueryDeposit } from "../../lib/api/deposit";
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
  const [depositQuery, depositItems] = useQueryDeposit();
  const [curDepositItem, setCurDepositItem] = useState<IDepositItemData>(null);
  useEffect(() => {
    if (depositItems && depositItems.length > 0) {
      setCurDepositItem(depositItems[0]);
    }
  }, [depositItems])

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
            {
              depositItems && depositItems.length > 0 && depositItems.map((data, index) => {
                return (
                  <DepositItem isSelected={curDepositItem && data.name == curDepositItem.name} depositItemData={data} key={data.name} onDeposiItemClick={onDeposiItemClick} />
                )
              })
            }
            {
              depositQuery.isFetching && (
                <ActivityIndicator size='small' color="#0000ff" />
              )
            }

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