
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "./footer";
import Header from "./header";



export function BaseScreen(props: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}>
       
      </View> */}
      <Header />
      {
        props.children
      }
      <Footer />
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
});