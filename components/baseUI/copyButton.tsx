

import { useState } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { waitTime } from '../../lib/common/common';
import { useMClipboard } from '../../lib/hook/clipboard';
import { IconCopy } from '../../lib/imageDefine';
import MHStack from './mHStack';
import MImage from './mImage';
import MText from './mText';

export default function CopyButton(props: PressableProps & { copyText: string }) {
  const { copyText, style, ...rest } = props;
  const [clipboardContent, setClipboardContent] = useMClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const copyClick = async () => {
    if (isCopied) return;
    setIsCopied(true);
    setClipboardContent(copyText);
    await waitTime(5000);
    setIsCopied(false);
  }

  return (
    <Pressable style={[styles.button, style as unknown]} onPress={copyClick} {...rest}>
      <MHStack style={{ justifyContent: 'center', alignItems: 'center' }} >
        <MImage h={10} w={10} style={{ marginRight: 5 }} source={IconCopy} />
        <MText > {isCopied ? "Copied" : "  Copy"} </MText>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: "#EDF2F5",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  }
})
