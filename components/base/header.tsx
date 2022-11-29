
import { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
    top: '0px',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '33px',
    paddingBottom: '15px',
  }
});