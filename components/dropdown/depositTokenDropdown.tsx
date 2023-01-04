

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { IDepositToken, ISelectItemData } from '../../lib/define';
import { useDimensionSize } from '../../lib/hook/dimension';
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';

export const DepositTokenDropdown = (props: ViewProps & { options: ISelectItemData[], selectedOption: ISelectItemData, setSelectedOption: Dispatch<SetStateAction<ISelectItemData>> }) => {
  const { options, selectedOption, setSelectedOption, style, ...rest } = props;
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
    <View style={[styles.container, style]} {...rest}>

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
                {index != options.length - 1 && (<MDivider style={{ marginTop: 15 }} />)}
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

const TokenItem = (props: { option: ISelectItemData }) => {
  const { option } = props;

  if (option == null) {
    return <></>
  }
  const curToken = option.data as IDepositToken;

  return (
    <MHStack style={styles.sendCoin} stretchW>
      <MHStack style={{ flex: 1, alignItems: 'center', }}>
        <MImage size={32} url={curToken.icon} />
        <MText style={{ marginLeft: 5 }}>{curToken.tokenID}</MText>
      </MHStack>
    </MHStack>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 2,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  option: {
    padding: 10,
    // borderRadius: 5,
    // backgroundColor: 'white',
    backgroundColor: '#ffffff',
    // borderWidth: 1,
    borderColor: '#EEF0F2',
    paddingHorizontal: 15,
  },
  sendCoin: {
  }
});