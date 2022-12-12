

import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IUserTokenInfo } from '../../lib/define';

export const TokenDropdown = (props: { options: IUserTokenInfo[] }) => {
  const { options } = props;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IUserTokenInfo>(null);

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
        <Text>{selectedOption?.token?.symbol || 'Select an option'}</Text>
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
                <Text>{item.token.symbol}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};


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
    top: 40,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  option: {
    padding: 10,
    // borderRadius: 5,
    backgroundColor: 'white',
  },
});