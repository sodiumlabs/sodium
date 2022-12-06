
import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fixWidth } from '../../lib/define';
import { useAdapterWeb } from '../../lib/hook/adapter';
import MVStack from '../baseUI/mVStack';
import Footer from "./footer";
import Header from "./header";
import ScreenInit from './screenInit';


export function BaseScreen(props: { children?: ReactNode, hasHeaderFooter?: boolean, isHeaderBack?: boolean }) {
  const hasHeaderFooter = props.hasHeaderFooter === undefined ? true : props.hasHeaderFooter;
  const isAdapterWeb = useAdapterWeb();
  return (
    <SafeAreaView style={styles.container}>
      {hasHeaderFooter && (
        <>
          <Header isBack={props.isHeaderBack} />
          {!isAdapterWeb && <Footer />}
        </>)
      }
      <MVStack stretchW style={styles.content}>

        <ScrollView style={{ width: '100%', height: '100%', }}>

          <MVStack stretchW style={{ alignSelf: 'center', maxWidth: fixWidth, marginTop: hasHeaderFooter ? 80 : 0, marginBottom: hasHeaderFooter ? 60 : 0 }}>
            {
              props.children
            }
          </MVStack>
        </ScrollView>
      </MVStack >
      <ScreenInit />
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