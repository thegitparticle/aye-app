import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useStyle} from 'react-native-style-utilities';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import CraftCamera from '../chatitems/camera/CraftCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CraftGallery from '../chatitems/gallery/CraftGallery';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CameraModal({navigation, route}) {
  const devices = useCameraDevices();
  const device = devices.back;
  const {channelOnGoing, clubName, clubID, channelID, messages} = route.params;

  const [photo, setPhoto] = useState('');

  const [showFrontCam, setFrontCam] = useState(false);

  const [galleryPicked, setGalleryPicked] = useState('');

  const [showWhat, setShowWhat] = useState('Camera'); //Camera, CraftCamera, Gallery, CraftGallery

  const camera = useRef(null);

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
      setPhoto(photo_here);
      setShowWhat('CraftCamera');
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera]);

  function ClickButton() {
    return (
      <TouchableOpacity style={click_button_wrap} onPress={takePhoto}>
        <Icon
          name="circle"
          type="feather"
          color="#FE2A55"
          size={windowHeight * 0.08}
        />
      </TouchableOpacity>
    );
  }

  function FlipCamera() {
    return (
      <TouchableOpacity
        style={flip_camera_button_wrap}
        onPress={() => setFrontCam(!showFrontCam)}>
        <Icon
          name="refresh-cw"
          type="feather"
          color="#CCCCCC"
          size={windowHeight * 0.03}
        />
      </TouchableOpacity>
    );
  }

  function OpenGallery() {
    return (
      <TouchableOpacity
        style={flip_camera_button_wrap}
        onPress={() => {
          ImagePicker.openPicker({
            multiple: false,
            cropping: false,
          }).then(image => {
            console.log(image);
            setGalleryPicked(image.path);
            setShowWhat('CraftGallery');
          });
        }}>
        <Icon
          name="image"
          type="feather"
          color="#CCCCCC"
          size={windowHeight * 0.03}
        />
      </TouchableOpacity>
    );
  }

  function BottomButtons() {
    return (
      <View style={bottom_buttons_wrap}>
        <OpenGallery />
        <ClickButton />
        <FlipCamera />
      </View>
    );
  }

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

  const click_button_wrap = useStyle(
    () => [
      {
        backgroundColor: '#05050550',
        width: windowHeight * 0.1,
        height: windowHeight * 0.1,
        borderRadius: windowHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
    [],
  );

  const camera_overall = useStyle(
    () => [
      {
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    ],
    [],
  );

  const show_clicked_overall = useStyle(() => [{flex: 1}], []);

  const flip_camera_button_wrap = useStyle(
    () => [
      {
        backgroundColor: '#05050550',
        width: windowHeight * 0.05,
        height: windowHeight * 0.05,
        borderRadius: windowHeight * 0.025,
        alignItems: 'center',
        justifyContent: 'center',
      },
    ],
    [],
  );

  const bottom_buttons_wrap = useStyle(
    () => [
      {
        marginVertical: windowHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth * 0.8,
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

  if (showWhat === 'Camera') {
    if (!showFrontCam) {
      return (
        <Camera
          ref={camera}
          style={[StyleSheet.absoluteFill, camera_overall]}
          device={device}
          isActive={true}
          photo={true}>
          <BottomButtons />
        </Camera>
      );
    } else {
      const device_here = devices.front;
      return (
        <Camera
          ref={camera}
          style={[StyleSheet.absoluteFill, camera_overall]}
          device={device_here}
          isActive={true}
          photo={true}>
          <BottomButtons />
        </Camera>
      );
    }
  } else if (showWhat === 'CraftCamera') {
    return (
      <CraftCamera
        channelOnGoing={channelOnGoing}
        messages={messages}
        channelID={channelID}
        clubID={clubID}
        clubName={clubName}
        photo={photo}
      />
    );
  } else if (showWhat === 'CraftGallery') {
    return (
      <CraftGallery
        channelOnGoing={channelOnGoing}
        messages={messages}
        channelID={channelID}
        clubID={clubID}
        clubName={clubName}
        galleryPicked={galleryPicked}
      />
    );
  } else {
    return (
      <FastImage
        style={show_clicked_overall}
        source={{
          uri: galleryPicked,
        }}
      />
    );
  }
}

export default CameraModal;
