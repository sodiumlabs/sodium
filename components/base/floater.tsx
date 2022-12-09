
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdapterWeb } from '../../lib/hook/adapter';
import MHStack from '../baseUI/mHStack';
import HeaderExpansion from './headerExpansion';
import HeaderFold from './headerFold';
import { BlurView } from 'expo-blur';



export default function Floater(props: { isNavigationBarBack?: boolean }) {
  const [isFold, setIsFold] = useState(true);
  const insets = useSafeAreaInsets();
  const isAdapterWeb = useAdapterWeb();
  // debugger

  // useFocusEffect(
  //   useCallback(() => {
  //     // Do something when the screen is focused
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       setIsFold(true);
  //     };
  //   }, [])
  // );



  return (
    // { top: insets.top }
    <MHStack stretchW style={[styles.container, { top: insets.top }]}>
      <BlurView style={{ 'width': '100%' }}>
        {
          isAdapterWeb && (
            <MHStack stretchH stretchW style={{ position: 'relative', justifyContent: 'center' }}>
              <MHStack style={{ width: 222, position: 'absolute', right: 0 }}>
                {
                  isFold ? <HeaderFold setIsFold={setIsFold} isBack={props.isNavigationBarBack} /> : <HeaderExpansion setIsFold={setIsFold} />
                }
              </MHStack>

            </MHStack>

          )
        }
        {
          !isAdapterWeb && (
            <MHStack stretchW>
              {
                isFold ? <HeaderFold setIsFold={setIsFold} isBack={props.isNavigationBarBack} /> : <HeaderExpansion setIsFold={setIsFold} />
              }
            </MHStack>
          )
        }
      </BlurView>
    </MHStack>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    top: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 15,
    paddingRight: 12,
    paddingTop: 33,
    paddingBottom: 15,
  }
});