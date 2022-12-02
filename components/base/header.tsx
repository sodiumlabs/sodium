
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdapterWeb } from '../../src/hook/adapter';
import MHStack from '../baseUI/mHStack';
import MLineLR from '../baseUI/mLineLR';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';
import HeaderExpansion from './headerExpansion';
import HeaderFold from './headerFold';



export default function Header(props: { isBack?: boolean }) {
  const [isFold, setIsFold] = useState(true);
  const insets = useSafeAreaInsets();
  const isAdapterWeb = useAdapterWeb();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setIsFold(true);
      };
    }, [])
  );



  return (
    // { top: insets.top }
    <MHStack stretchW style={[styles.container, { top: insets.top }]}>

      {
        isAdapterWeb && (
          <MHStack stretchH stretchW style={{ position: 'relative', justifyContent: 'center' }}>
            <MHStack style={{ width: 222, position: 'absolute', right: 0 }}>
              {
                isFold ? <HeaderFold setIsFold={setIsFold} isBack={props.isBack} /> : <HeaderExpansion setIsFold={setIsFold} />
              }
            </MHStack>

            <Image style={{ width: 40, height: 40, position: 'absolute', left: 0 }} source={require('./../../assets/favicon.png')} />

            <Pressable onPress={() => navigation.navigate('Wallet')}>
              <MLineLR
                left={<Image style={{ width: 20, height: 20, }} source={require('./../../assets/favicon.png')} />}
                right={<MText>wallet</MText>}
              />
            </Pressable>

            <Pressable onPress={() => navigation.navigate('History')}>
              <MLineLR
                left={<Image style={{ width: 20, height: 20, }} source={require('./../../assets/favicon.png')} />}
                right={<MText>history</MText>}
              />
            </Pressable>

          </MHStack>

        )
      }
      {
        !isAdapterWeb && (
          <MHStack stretchW>
            {
              isFold ? <HeaderFold setIsFold={setIsFold} isBack={props.isBack} /> : <HeaderExpansion setIsFold={setIsFold} />
            }
          </MHStack>
        )
      }

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