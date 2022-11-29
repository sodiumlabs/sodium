
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderExpansion from './headerExpansion';
import HeaderFold from './headerFold';



export default function Header() {
  const [isFold, setIsFold] = useState(false);
  return (
    <View style={styles.container}>
      {
        isFold ? <HeaderFold setIsFold={setIsFold} /> : <HeaderExpansion setIsFold={setIsFold} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    width: '100%',
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