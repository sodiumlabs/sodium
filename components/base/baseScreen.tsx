
import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import MVStack from '../baseUI/mVStack';
import Floater from './floater';
import Footer from "./footer";
import Header from "./header";
import { SingletonInit } from './singletonInit';


export function BaseScreen(props: { children?: ReactNode, hasNavigationBar?: boolean, hasFloatingBar?: boolean, isNavigationBarBack?: boolean }) {
  const hasNavigationBar = props.hasNavigationBar === undefined ? true : props.hasNavigationBar;
  const hasFloatingBar = props.hasFloatingBar === undefined ? true : props.hasFloatingBar;

  const isAdapterWeb = useAdapterWeb();
  return (
    <SafeAreaView style={styles.container}>
      {hasFloatingBar && <Floater isNavigationBarBack={props.isNavigationBarBack} />}
      {hasNavigationBar && (!isAdapterWeb ? <Footer /> : <Header />)}
      <SingletonInit />
      {/* <SingletonInit hasFloatingBar={hasFloatingBar} hasNavigationBar={hasFloatingBar} isNavigationBarBack={props.isNavigationBarBack} /> */}


      <MVStack stretchW style={styles.content}>

        <ScrollView style={{ width: '100%', height: '100%', }}>

          <MVStack stretchW style={{ alignSelf: 'center', maxWidth: fixWidth, marginTop: hasNavigationBar ? 80 : 0, marginBottom: hasNavigationBar ? 60 : 0 }}>
            {
              props.children
            }
          </MVStack>
        </ScrollView>

      </MVStack >

    </SafeAreaView >
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
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#777',
  }

});