
import { Dispatch, SetStateAction } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLoginData } from '../../src/data/login';
import MButton from '../baseUI/mButton';
import MText from '../baseUI/mText';
import { useWindowDimensions } from 'react-native';

export default function HeaderExpansion(props: { setIsFold: Dispatch<SetStateAction<boolean>> }) {
  const loginData = useLoginData();
  const windowDimension = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Image style={styles.img} source={require('./../../assets/favicon.png')} />
        <View style={{ flex: 1 }}>
          <MText >{loginData.blockchainAddress}</MText>
          <View style={{ flexDirection: 'row' }}>
            <MButton title='Copy' onPress={undefined} styles={{ 'margin': 5 }}></MButton>
            <MButton title='Receive' onPress={undefined} styles={{ 'margin': 5 }}></MButton>
          </View>
        </View>
        <Pressable onPress={() => props.setIsFold(true)}>
          <Image style={{ 'width': 12, 'height': 12, marginLeft: 20 }} source={require('./../../assets/favicon.png')} />
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
          <View style={{ flex: 1 }}>
            <MText>Connected</MText>
            <MText>Ethereum</MText>
          </View>
          <Image style={{ width: 10, height: 10 }} source={require('./../../assets/favicon.png')} />
        </View>
      </Pressable>

      <View style={styles.button}>
        <MButton title='Settings' onPress={undefined} styles={{ 'margin': 5, 'flex': 1, 'height': 50 }}></MButton>
        <MButton title='Sign Out' onPress={undefined} styles={{ 'margin': 5, 'flex': 1, 'height': 50 }}></MButton>
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
    padding: 10,
    backgroundColor: 'rgba(200,200,200,1)',
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  email: {
    flex: 1,
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  connected: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
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