
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
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
          <MVStack style={styles.header} />
        </>)
      }
      <MVStack style={{ width: '100%' }}>
        {
          props.children
        }
      </MVStack>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    height: 80,
    width: '100%'
  }

});