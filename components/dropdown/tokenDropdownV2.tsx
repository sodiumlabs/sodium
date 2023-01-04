

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { IUserTokenInfo } from '../../lib/define';
import { useDimensionSize } from '../../lib/hook/dimension';
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const TokenDropdown = (props: { options: IUserTokenInfo[], selectedOption: IUserTokenInfo, setSelectedOption: Dispatch<SetStateAction<IUserTokenInfo>> }) => {
  const { options, selectedOption, setSelectedOption } = props;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dimension = useDimensionSize();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    if (selectedOption == null && options != null) {
      handleOptionPress(options[0]);
    }
  }, [selectedOption, options])

  return (
    <View style={styles.container}>

      <Pressable onPress={toggleDropdown}>
        <MHStack stretchW style={{ borderWidth: 1, borderColor: '#EEF0F2', padding: 10, borderRadius: 10 }}>
          <TokenItem option={selectedOption} />
        </MHStack>
      </Pressable>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            style={{ maxHeight: dimension[1] - 300, borderRadius: 10, borderWidth: 1, borderColor: '#EEF0F2' }}
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => handleOptionPress(item)}
                style={styles.option}
              >
                <TokenItem option={item} />
                {index != options.length - 1 && (<MDivider style={{ marginTop: 10 }} />)}

              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

const TokenItem = (props: { option: IUserTokenInfo }) => {
  const { option } = props;
  if (option == null) {
    return <></>
  }
  return (
    <MHStack style={styles.sendCoin} stretchW>
      <MImage size={32} />
      <MVStack style={{ flex: 1 }}>
        <MHStack style={{ flex: 1 }}>
          <MText style={{ fontWeight: '700' }} fontSize={14}>{option.token.symbol}</MText>
          {/* <MImage size={12} /> */}
          {/* <MText>{option.token.name}</MText> */}
        </MHStack>
        <MHStack style={{ flex: 1 }}>
          {/* <MText>{formatWei2Price(option.balance.toString(), option.token.decimals)}</MText> */}
          <MText> Balance:{formatWei2Price(option.balance.toString(), option.token.decimals)}</MText>
        </MHStack>
      </MVStack>
    </MHStack>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  option: {
    padding: 10,
    // borderRadius: 10,
    // backgroundColor: 'white',
    backgroundColor: '#ffffff',
    // borderWidth: 1,
    borderColor: '#EEF0F2',
    paddingHorizontal: 15,
  },
  sendCoin: {
  }
});