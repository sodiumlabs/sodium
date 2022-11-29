
import { Dispatch, SetStateAction } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MButton from '../baseUI/mButton';
import MText from '../baseUI/mText';

export default function HeaderExpansion(props: { setIsFold: Dispatch<SetStateAction<boolean>> }) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Image style={styles.img} source={require('./../../assets/favicon.png')} />
        <View style={{ width: 'calc(100% - 70px)' }}>
          <MText  >0xa085ac63AfFe1cB76e5Fb23Aad567cAB8E51e</MText>
          <View style={{ flexDirection: 'row' }}>
            <MButton title='Copy' onPress={undefined} styles={{ 'margin': '5px' }}></MButton>
            <MButton title='Receive' onPress={undefined} styles={{ 'margin': '5px' }}></MButton>
          </View>
        </View>
        <Pressable onPress={() => props.setIsFold(true)}>
          <Image style={{ 'width': 12, 'height': 12 }} source={require('./../../assets/favicon.png')} />
        </Pressable>
      </View>

      <Pressable>
        <View style={styles.email}>
          <MText>Google</MText>
          <MText>Wuyiming27094@gmail.com</MText>
        </View>
      </Pressable>

      <Pressable>
        <View style={styles.connected}>
          <Image style={{ width: 10, height: 10, marginRight: 10 }} source={require('./../../assets/favicon.png')} />
          <View style={{ width: 'calc(100% - 30px)' }}>
            <MText>Connected</MText>
            <MText>Ethereum</MText>
          </View>
          <Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />
        </View>
      </Pressable>

      <View style={styles.button}>
        <MButton title='Settings' onPress={undefined} styles={{ 'margin': '5px', 'flex': 1, 'height': '50px' }}></MButton>
        <MButton title='Sign Out' onPress={undefined} styles={{ 'margin': '5px', 'flex': 1, 'height': '50px' }}></MButton>
      </View>
      {/* 
     
      
      <Image style={styles.img} source={require('./../../assets/favicon.png')} /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(200,200,200,1)',
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  email: {
    flex: 1,
    padding: '15px',
    marginVertical: '15px',
    backgroundColor: '#fff',
    borderRadius: 8
  },
  connected: {
    flex: 1,
    flexDirection: 'row',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    width: 48,
    height: 48
  },
});