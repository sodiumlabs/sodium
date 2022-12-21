

import { useState } from 'react';
import { Pressable, StyleSheet, PressableProps } from 'react-native';
import { waitTime } from '../../lib/common/common';
import { useMClipboard } from '../../lib/hook/clipboard';
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
        <MImage size={8} style={{ marginRight: 5 }} />
        <MText > {isCopied ? "Copied" : "  Copy"} </MText>
      </MHStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#bbb',
    paddingHorizontal: 10
  }
})
