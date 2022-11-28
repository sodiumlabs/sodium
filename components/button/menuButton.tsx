import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function MenuButton() {
  return (
    <View style={styles.container}>
      <Text> img </Text>
      <Text> wallet </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '72px',
    width: '80px',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
