

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { IDepositToken, ISelectItemData } from '../../lib/define';
import { useDimensionSize } from '../../lib/hook/dimension';
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import MText from '../baseUI/mText';
import { eColor, globalStyle } from '../../lib/globalStyles';
import { IconTokenDefault } from '../../lib/imageDefine';

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

      {/* <Pressable onPress={toggleDropdown}>
        <MHStack stretchW style={[{ padding: 10 }, globalStyle.whiteBorderWidth]}>
          <TokenItem option={selectedOption} />
        </MHStack>
      </Pressable> */}

      <MHStack stretchW style={[globalStyle.whiteBorderWidth, { overflow: 'hidden' }]}>
        <TokenItem isSelected={false} option={selectedOption} handleOptionPress={toggleDropdown} />
      </MHStack>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            style={[{ maxHeight: dimension[1] - 300 }, globalStyle.whiteBorderWidth]}
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <>
                <TokenItem isSelected={item.data == selectedOption.data} option={item} handleOptionPress={handleOptionPress} />
                {index != options.length - 1 && (<MDivider />)}
              </>
            )}
          />
        </View>
      )}
    </View>
  );
};

const TokenItem = (props: { option: ISelectItemData, isSelected: boolean, handleOptionPress: (option: ISelectItemData) => void }) => {
  const { option, isSelected, handleOptionPress } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);

  if (option == null) {
    return <></>
  }
  const curToken = option.data as IDepositToken;

  return (
    <Pressable

      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      onPress={() => handleOptionPress(option)}
      style={[styles.option, { backgroundColor: isSelected || isItemHovered ? eColor.GrayHover : '#ffffff' }]}
    >
      <MHStack style={styles.sendCoin} stretchW>
        <MHStack style={{ flex: 1, alignItems: 'center', }}>
          <MImage w={24} h={24} uri={curToken.icon} source={IconTokenDefault} />
          <MText style={{ marginLeft: 6, fontWeight: '700' }}>{curToken.tokenID}</MText>
        </MHStack>
      </MHStack>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 5,
    // backgroundColor: 'white',
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
    width: '100%',
    padding: 10,
    // backgroundColor: '#ffffff',
    paddingHorizontal: 15,
  },
  sendCoin: {
  }
});