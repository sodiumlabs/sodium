
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Footer from "./footer";
import Header from "./header";



export function BaseScreen(props: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Header />
      {
        props.children
      }
      <Footer />
    </View>
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