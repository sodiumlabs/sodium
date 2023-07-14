import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, IDepositItemData } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import Information from "../base/information";
import { Spacer } from "../base/spacer";
import { MLoading } from "../baseUI/mLoading";
import MVStack from "../baseUI/mVStack";
import { ScreenTitle } from "../baseUI/screenTitle";
import DepositItem from "../item/depositItem";
import { UseTopCenterScale } from "../base/scaleInit";

export function DepositScreen() {
  const dimension = useDimensionSize();
  // @ts-ignore
  // TODO
  // 还没有接入入金模块
  const [depositQuery, depositItems] = useQueryDeposit();
  const [curDepositItem, setCurDepositItem] = useState<IDepositItemData>(null);
  const topCenterStyle = UseTopCenterScale();
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
    <BaseScreen isNavigationBarBack>
      <ScrollView style={{ width: '100%', height: '100%', }}>
        <MVStack stretchW style={{ alignItems: 'center' }}>
          <MVStack stretchW style={[styles.container, { minHeight: dimension[1] }, topCenterStyle]}>
            <ScreenTitle title="Deposit" />
            {
              depositItems && depositItems.length > 0 && depositItems.map((data, index) => {
                return (
                  <DepositItem isSelected={curDepositItem && data.name == curDepositItem.name} depositItemData={data} key={data.name} onDeposiItemClick={onDeposiItemClick} />
                )
              })
            }
            {
              depositQuery.isFetching && <MLoading />
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