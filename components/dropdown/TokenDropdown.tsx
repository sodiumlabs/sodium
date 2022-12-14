

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { IUserTokenInfo } from '../../lib/define';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const TokenDropdown = (props: { options: IUserTokenInfo[], selectedOption: IUserTokenInfo, setSelectedOption: Dispatch<SetStateAction<IUserTokenInfo>> }) => {
  const { options, selectedOption, setSelectedOption } = props;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);


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
      <TouchableOpacity onPress={toggleDropdown}>
        <TokenItem option={selectedOption} />
      </TouchableOpacity>

      {isDropdownVisible && (

        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleOptionPress(item)}
                style={styles.option}
              >
                <TokenItem option={item} />
              </TouchableOpacity>
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
          <MText>{option.token.symbol}</MText>
          <MImage size={12} />
          <MText>{option.token.name}</MText>
        </MHStack>
        <MHStack style={{ flex: 1 }}>
          <MText>{formatWei2Price(option.balance.toString(), option.token.decimals)}</MText>
          <MText> {option.token.symbol}</MText>
          <MText> ${option.usdBalance}</MText>
        </MHStack>
      </MVStack>
    </MHStack>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 10,
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
    // borderRadius: 5,
    // backgroundColor: 'white',
    backgroundColor: '#999',
    paddingHorizontal: 15,
  },
  sendCoin: {
  }
});