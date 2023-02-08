import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconModalClose } from "../../lib/imageDefine";
import MImage from "./mImage";
import MPressable from './mPressable';


export const ModalCloseButton = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <MPressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={onClose}
      style={[styles.close, { opacity: isHovered ? 1 : 0.5 }]}>
      <MImage w={30} h={30} source={IconModalClose} />
    </MPressable>
  )
}


const styles = StyleSheet.create({
  content: {
    backgroundColor: '#F7F7F7', paddingVertical: 15, alignItems: 'center', flex: 1, position: 'relative'
  },
  close: {
    width: 30, height: 30, position: 'absolute', top: -40, right: 10, borderRadius: 99
  }
});