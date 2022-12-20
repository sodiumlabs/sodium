
import { ReactNode, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MVStack from '../baseUI/mVStack';
import { updateBarParam } from './barUI';


export function BaseScreen(props: { children?: ReactNode, hasNavigationBar?: boolean, hasFloatingBar?: boolean, isNavigationBarBack?: boolean }) {
  const hasNavigationBar = props.hasNavigationBar === undefined ? true : props.hasNavigationBar;
  const hasFloatingBar = props.hasFloatingBar === undefined ? true : props.hasFloatingBar;

  useEffect(() => {
    updateBarParam({
      'hasFloatingBar': hasFloatingBar,
      'hasNavigationBar': hasNavigationBar,
      'isNavigationBarBack': props.isNavigationBarBack
    });
  }, [hasFloatingBar, hasNavigationBar, props.isNavigationBarBack])

  // const isAdapterWeb = useAdapterWeb();
  return (
    <SafeAreaView style={styles.container}>
      {/* {hasFloatingBar && <Floater isNavigationBarBack={props.isNavigationBarBack} />} */}
      {/* {hasNavigationBar && (!isAdapterWeb ? <Footer /> : <Header />)} */}


      <MVStack stretchW style={styles.content}>

        <MVStack stretchW stretchH style={{ alignSelf: 'center' }}>
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