

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { formatWei2Price } from '../../lib/common/common';
import { IUserTokenInfo } from '../../lib/define';
import { globalStyle, eColor } from '../../lib/globalStyles';
import { useDimensionSize } from '../../lib/hook/dimension';
import { IconTokenDefault } from '../../lib/imageDefine';
import { MDivider } from '../baseUI/mDivider';
import MHStack from '../baseUI/mHStack';
import MImage from '../baseUI/mImage';
import { MLoading } from '../baseUI/mLoading';
import MText from '../baseUI/mText';
import MVStack from '../baseUI/mVStack';

export const TokenDropdown = (props: { options: IUserTokenInfo[], selectedOption: IUserTokenInfo, defaultOption?: IUserTokenInfo, setSelectedOption: Dispatch<SetStateAction<IUserTokenInfo>> }) => {
  const { options, selectedOption, setSelectedOption, defaultOption } = props;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dimension = useDimensionSize();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };
  // If nothing is selected, close the dropdown immediately
  useEffect(() => {
    if (!selectedOption) {
      setIsDropdownVisible(false);
    }
  }, [selectedOption])

  useEffect(() => {
    if (!options) return;
    if (!selectedOption) {
      if (defaultOption) {
        const option = options.find(item => item.token.symbol == defaultOption.token.symbol);
        handleOptionPress(option || options[0]);
      } else {
        handleOptionPress(options[0]);
      }
    } else {
      // debugger
      // If the selected item is not found in the collection, the data has changed
      const index = options.findIndex(item => item.token.symbol == selectedOption.token.symbol);
      if (index == -1) {
        handleOptionPress(options[0]);
      }
    }
  }, [selectedOption, options, defaultOption])

  return (
    <View style={styles.container}>

      <MHStack stretchW style={[globalStyle.whiteBorderWidth, { overflow: 'hidden', minHeight: 62 }]}>
        {
          options == null ?
            (<MHStack style={{ marginLeft: 15 }} ><MLoading /></MHStack>)
            : (<TokenItem option={selectedOption} isSelected={false} handleOptionPress={toggleDropdown} />)
        }
      </MHStack>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            style={[{ maxHeight: dimension[1] - 300 }, globalStyle.whiteBorderWidth]}
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <>
                <TokenItem option={item} isSelected={selectedOption.token.symbol == item.token.symbol} handleOptionPress={handleOptionPress} />
                {index != options.length - 1 && (<MDivider />)}
              </>

            )}
          />
        </View>
      )}
    </View>
  );
};

const TokenItem = (props: { option: IUserTokenInfo, isSelected: boolean, handleOptionPress: (option: IUserTokenInfo) => void }) => {
  const { option, isSelected, handleOptionPress } = props;
  const [isItemHovered, setIsItemHovered] = useState(false);
  if (option == null) {
    return <></>
  }
  return (
    <Pressable

      onHoverIn={() => setIsItemHovered(true)}
      onHoverOut={() => setIsItemHovered(false)}
      onPress={() => handleOptionPress(option)}
      style={[styles.option, { backgroundColor: isSelected || isItemHovered ? eColor.GrayHover : '#ffffff' }]}
    >
      <MHStack style={styles.sendCoin} stretchW>
        <MImage w={32} h={32} uri={option.token.centerData?.logoURI} source={IconTokenDefault} />
        <MVStack style={{ flex: 1, marginLeft: 8 }}>
          <MHStack style={{ flex: 1 }}>
            <MText style={{ fontWeight: '700' }} fontSize={14}>{option.token.symbol}</MText>
            {/* <MImage size={12} /> */}
            {/* <MText>{option.token.name}</MText> */}
          </MHStack>
          <MHStack style={{ flex: 1 }}>
            {/* <MText>{formatWei2Price(option.balance.toString(), option.token.decimals)}</MText> */}
            <MText style={{ color: eColor.GrayContentText }}> Balance:{formatWei2Price(option.balance.toString(), option.token.decimals)}</MText>
          </MHStack>
        </MVStack>
      </MHStack>

    </Pressable>

  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  option: {
    paddingVertical: 15,
    width: '100%',
    borderColor: eColor.Border,
    paddingHorizontal: 15,
  },
  sendCoin: {
  }
});