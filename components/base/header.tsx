
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MVStack from '../baseUI/mVStack';
import HeaderExpansion from './headerExpansion';
import HeaderFold from './headerFold';



export default function Header() {
  const [isFold, setIsFold] = useState(true);
  const insets = useSafeAreaInsets();
  return (
    <MVStack stretchW style={[styles.container, { top: insets.top }]}>
      {
        isFold ? <HeaderFold setIsFold={setIsFold} /> : <HeaderExpansion setIsFold={setIsFold} />
      }
    </MVStack>
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