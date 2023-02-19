import { StyleSheet, Text, View, Dimensions, LogBox, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Camera } from './Camera';
import { CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

const { height, width } = Dimensions.get('window');
const App = () => {
  const [type, setType] = useState(null);
  const [box, setBox] = useState<{ boxs: { width: any, height: any, x: any, y: any, yawAngle: any, rollAngle: any }, rightEyePosition: { x: any, y: any }, leftEyePosition: { x: any, y: any }, bottomMouthPosition: any }>({
    boxs: {
      width: null,
      height: null,
      x: null,
      y: null,
      yawAngle: null,
      rollAngle: null
    },
    rightEyePosition: { x: null, y: null },
    leftEyePosition: { x: null, y: null },
    bottomMouthPosition: null
  })
  const cameraRef = useRef(null);
  const handlerFace = ({ faces }: any) => {
    if (faces[0]) {
      console.log(faces);
      setBox({
        boxs: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle
        },
        rightEyePosition: faces[0].RIGHT_EYE,
        leftEyePosition: faces[0].LEFT_EYE,
        bottomMouthPosition: faces[0].BOTTOM_MOUTH
      })
    }
    else {
      setBox({
        boxs: {
          width: null,
          height: null,
          x: null,
          y: null,
          yawAngle: null,
          rollAngle: null
        },
        rightEyePosition: { x: null, y: null },
        leftEyePosition: { x: null, y: null },
        bottomMouthPosition: null
      });
    }
  }
  LogBox.ignoreAllLogs(true);
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.front}
        captureAudio={false}
        onFacesDetected={handlerFace}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      {
        box && (
          <>
            <View
              style={{
                position: 'absolute',
                top: box.boxs.y,
                left: box.boxs.x,
                height: box.boxs.height,
                width: box.boxs.width,
                borderWidth: 5,
                borderColor: 'red',
                zIndex: 3000
              }}
            >
            </View>
          </>
        )
      }
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
  },
})
