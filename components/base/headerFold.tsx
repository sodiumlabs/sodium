
import { createRef, Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useLoginData } from '../../src/data/login';
import MText from '../baseUI/mText';
import MHStack from '../baseUI/mHStack';
import { useNavigation } from '@react-navigation/native';
import MAnimView from '../baseUI/mAnimView';
import MImage from '../baseUI/mImage';

export default function HeaderFold(props: { setIsFold: Dispatch<SetStateAction<boolean>>, isBack?: boolean }) {
  const loginData = useLoginData();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);

  return (
    <MAnimView hideFinishCb={() => props.setIsFold(false)} visible={visible} >
      <MHStack stretchW style={styles.container}>
        {
          props.isBack && (
            <Pressable style={{ paddingRight: 20 }} onPress={() => navigation.goBack()}>
              <MImage size={10} />
            </Pressable>
          )
        }
        <Pressable style={{ flexDirection: 'row', flex: 1, paddingVertical: 10 }} onPress={() => setVisible(false)} >
          <MImage style={styles.img} />
          <MText style={{ flex: 1 }} >{loginData.blockchainAddress}</MText>
          <MImage style={styles.expand} />
        </Pressable>
      </MHStack>
    </MAnimView>
  );
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(200,200,200,1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 24,
    height: 24
  },
  expand: {
    width: 24,
    height: 24,
    marginLeft: 20,
  }
});