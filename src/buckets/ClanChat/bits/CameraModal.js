import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useStyle} from 'react-native-style-utilities';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import FastImage from 'react-native-fast-image';

function CameraModal() {
  const devices = useCameraDevices();
  const device = devices.back;

  const [photo, setPhoto] = useState('');

  const [clicked, setClicked] = useState(false);

  const camera = useRef(null);

  console.log(photo);

  useEffect(() => {
    const getPermissions = async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    };

    getPermissions();
  }, []);

  const takePhoto = useCallback(async () => {
    try {
      const photo_here = await camera.current.takePhoto();
      setPhoto(photo_here.path);
      setClicked(true);
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [Camera]);

  const style_view_wrap = useStyle(
    () => [
      {
        backgroundColor: 'aliceblue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
    [],
  );

  if (device == null) {
    return (
      <View style={style_view_wrap}>
        <Text>loading...</Text>
      </View>
    );
  }

  if (!clicked) {
    return (
      <Camera
        ref={camera}
        style={[
          StyleSheet.absoluteFill,
          {alignItems: 'center', justifyContent: 'flex-end'},
        ]}
        device={device}
        isActive={true}
        photo={true}>
        <TouchableOpacity style={{marginVertical: 40}} onPress={takePhoto}>
          <Text style={{fontSize: 45}}>📸</Text>
        </TouchableOpacity>
      </Camera>
    );
  } else {
    return (
      <FastImage
        style={{flex: 1}}
        source={{
          uri: 'file://' + photo,
        }}
      />
    );
  }
}

export default CameraModal;
