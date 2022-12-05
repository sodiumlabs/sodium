import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export const MDropdown = (props: { options: string[] }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { options } = props;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text>{selectedOption || 'Select an option'}</Text>
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
                <Text>{item}</Text>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },
});