
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
      <MVStack stretchW style={styles.content}>

        <ScrollView style={{ width: '100%', height: '100%' }}>

          <MVStack stretchW style={{ marginTop: hasHeaderFooter ? 80 : 0, marginBottom: hasHeaderFooter ? 60 : 0 }}>
            {
              props.children
            }
          </MVStack>
        </ScrollView>
      </MVStack>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#777',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 720,
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#777',
  }

});