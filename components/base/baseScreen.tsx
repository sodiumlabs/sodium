
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
          <View style={styles.header} />
        </>)
      }
      <View >
        {
          props.children
        }
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
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