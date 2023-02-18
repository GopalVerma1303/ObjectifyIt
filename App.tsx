import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
// import { Camera, CameraType } from 'expo-camera';
import { Camera } from './Camera';
import { CameraType } from 'expo-camera';

const { height, width } = Dimensions.get('window');
const screenRatio = height / width;


const App = () => {

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.front} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    height: '100%',
    width: '100%'
  }
})
