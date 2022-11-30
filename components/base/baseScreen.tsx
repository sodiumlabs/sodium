
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MVStack from '../baseUI/mVStack';
import Footer from "./footer";
import Header from "./header";


export function BaseScreen(props: { children?: ReactNode, hasHeaderFooter?: boolean, isHeaderBack?: boolean }) {
  const hasHeaderFooter = props.hasHeaderFooter === undefined ? true : props.hasHeaderFooter;
  return (
    <SafeAreaView style={styles.container}>
      {hasHeaderFooter && (
        <>
          <Header isBack={props.isHeaderBack} />
          <Footer />
        </>)
      }
      <ScrollView style={{ backgroundColor: 'pink', width: '100%', height: '100%' }}>

        <MVStack stretchW style={{ marginTop: hasHeaderFooter ? 80 : 0, marginBottom: hasHeaderFooter ? 60 : 0 }}>
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
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // position: 'relative'
  }

});