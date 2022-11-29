
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderExpansion from './headerExpansion';
import HeaderFold from './headerFold';
import MVStack from '../baseUI/mVStack';



export default function Header() {
  const [isFold, setIsFold] = useState(true);
  return (
    <MVStack stretchW style={styles.container}>
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