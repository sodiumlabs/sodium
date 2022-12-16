
import { ReactNode } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import MVStack from '../baseUI/mVStack';
import Floater from './floater';
import Footer from "./footer";
import Header from "./header";


export function BaseScreen(props: { children?: ReactNode, hasNavigationBar?: boolean, hasFloatingBar?: boolean, isNavigationBarBack?: boolean }) {
  const hasNavigationBar = props.hasNavigationBar === undefined ? true : props.hasNavigationBar;
  const hasFloatingBar = props.hasFloatingBar === undefined ? true : props.hasFloatingBar;

  const isAdapterWeb = useAdapterWeb();
  return (
    <SafeAreaView style={styles.container}>
      {hasFloatingBar && <Floater isNavigationBarBack={props.isNavigationBarBack} />}
      {hasNavigationBar && (!isAdapterWeb ? <Footer /> : <Header />)}


      <MVStack stretchW style={styles.content}>

        <MVStack stretchW stretchH style={{ alignSelf: 'center', maxWidth: fixWidth }}>
          {
            props.children
          }
        </MVStack>

      </MVStack >

    </SafeAreaView >
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
  }

});