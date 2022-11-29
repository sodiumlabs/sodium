
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import MText from '../baseUI/mText';

export default function HeaderFold(props: { setIsFold: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Pressable onPress={() => props.setIsFold(false)} style={styles.container}>
      <Image style={styles.img} source={require('./../../assets/favicon.png')} />
      <MText style={{ width: '90%' }} >0xa085ac63AfFe1cB76e5Fb23Aad567cAB8E51e</MText>
      <Image style={styles.img} source={require('./../../assets/favicon.png')} />
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    // cursor: 'pointer',
    borderRadius: 15,
    flexDirection: 'row',
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(200,200,200,1)',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24
  },
});