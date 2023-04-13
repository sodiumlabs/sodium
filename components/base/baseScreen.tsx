
import { useFocusEffect } from '@react-navigation/native';
import { ReactNode, useCallback } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MVStack from '../baseUI/mVStack';
import { updateBarParam } from './barUI';
import { tryFoldFloaterDrawer } from './floaterDrawer';


export function BaseScreen(props: { children?: ReactNode, hasNavigationBar?: boolean, hasFloatingBar?: boolean, isNavigationBarBack?: boolean }) {
  const hasNavigationBar = props.hasNavigationBar === undefined ? true : props.hasNavigationBar;
  const hasFloatingBar = props.hasFloatingBar === undefined ? true : props.hasFloatingBar;

  const updateFloater = useCallback(() => {
    updateBarParam({
      'hasFloatingBar': hasFloatingBar,
      'hasNavigationBar': hasNavigationBar,
      'hasNavigationBarBack': props.isNavigationBarBack
    });
  }, [hasFloatingBar, hasNavigationBar, props.isNavigationBarBack]);

  useFocusEffect(() => {
    updateFloater();
  });

  function handleCapture(event): boolean {
    tryFoldFloaterDrawer();
    return true; // Return true to continue firing subsequent event handlers, false to stop firing subsequent event handlers
  }
  return (
    <SafeAreaView style={styles.container}  >
      <MVStack onStartShouldSetResponderCapture={handleCapture} stretchW style={styles.content} >
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
    // backgroundColor: '#F7F7F7',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: '#F7F7F7',
  }

});