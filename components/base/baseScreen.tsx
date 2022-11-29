
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MVStack from '../baseUI/mVStack';
import Footer from "./footer";
import Header from "./header";


export function BaseScreen(props: { children?: ReactNode, isPreset?: boolean }) {
  const isPreset = props.isPreset === undefined ? true : props.isPreset;
  return (
    <SafeAreaView style={styles.container}>
      {isPreset && (
        <>
          <Header />
          <Footer />
        </>)
      }
      <ScrollView style={{ backgroundColor: 'pink' }}>

        <MVStack stretchW style={{ marginTop: isPreset ? 80 : 0, marginBottom: isPreset ? 60 : 0 }}>
          {
            props.children
          }
        </MVStack>
      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // position: 'relative'
  }

});