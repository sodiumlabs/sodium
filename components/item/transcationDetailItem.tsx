import { Divider } from "@ui-kitten/components"
import { View, Image, StyleSheet, ViewProps } from 'react-native';
import { BaseFoldFrame } from "../base/baseFoldFrame"
import MHStack from "../baseUI/mHStack"
import MText from "../baseUI/mText"
import MVStack from "../baseUI/mVStack"


export const TranscationDetailItem = (props: ViewProps) => {
  return (
    <BaseFoldFrame {...props} defaultExpansion header={<MText >Received(1/1)</MText>}>
      <MHStack style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
        <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
        <MText style={{ flex: 1 }}>USDC</MText>
        <MText >1.46666 USDC</MText>
      </MHStack>

      <Divider />
      <MVStack style={styles.marginV}>
        <MText style={{ marginVertical: 5 }}>To</MText>
        <MHStack stretchW style={{ padding: 15, backgroundColor: '#fff', borderRadius: 15 }}>
          <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
          <MText style={{ flex: 1 }}>0x8BB759Bb68995343FF1e9D57Ac85Ff5c5Fb79</MText>
          <Image style={{ width: 20, height: 20 }} source={require('./../../assets/favicon.png')} />
        </MHStack>
      </MVStack>
    </BaseFoldFrame>
  )
}



const styles = StyleSheet.create({
  marginV: {
    marginVertical: 20
  }
});