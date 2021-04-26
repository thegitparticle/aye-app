import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import {Button, Icon, Overlay} from 'react-native-elements';
import BackButtonIcon from '/Users/san/Desktop/toastgo/src/uibits/BackButtonIcon';
import OTPInput from 'react-native-otp';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {GetMyProfile} from '../redux/MyProfileActions';
import IconlyNextIcon from '../uibits/IconlyNextIcon';
import {SharedElement} from 'react-navigation-shared-element';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function OTPCheckRegister({navigation, dispatch, route}) {
  const [otp, setOTP] = useState('');
  const {phone} = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const [showSpinner, setShowSpinner] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  function OnSubmit() {
    var config = {
      method: 'post',
      url: 'https://apisayepirates.life/api/auth/token/',
      headers: {'content-type': 'application/json'},
      data: {
        phone: phone,
        password: otp,
      },
    };

    axios(config)
      .then(() => console.log('sign up success'))
      .then(() => dispatch(GetMyProfile(phone)))
      .then(() => console.log('get profile success'))
      .then(() =>
        navigation.navigate('PermissionsAfterRegister', {phone: phone}),
      )
      .then(() => setShowSpinner(false))
      /*
      .then(() => {
        return axios.get(
          'https://apisayepirates.life/api/users/update_otp_code/' +
            otp +
            '/' +
            phonenumber,
        );
      })
      */
      //.catch((err) => console.log(err));
      .catch(() => toggleOverlay());
  }

  return (
    <SafeAreaView style={styles.view}>
      <Pressable
        onPress={() => {
          navigation.goBack();
          console.log('fuck pressable');
        }}
        style={styles.back_button_view}>
        <BackButtonIcon />
      </Pressable>
      <LottieView
        source={require('/Users/san/Desktop/toastgo/assets/background_bubbles.json')}
        autoPlay
        loop
        style={styles.lottie_bg_view}
        resizeMode="cover"
      />
      <View style={styles.body_view}>
        <Text style={styles.text}>one time password</Text>
        <Spinner
          visible={showSpinner}
          //textContent={'Loading...'}
          //textStyle={styles.spinnerTextStyle}
          color="#50E3C2"
          indicatorStyle={styles.indicator_style}
        />
        <View>
          <OTPInput
            value={otp}
            onChange={value => {
              setOTP(value);
            }}
            tintColor="#33333350"
            offTintColor="#33333350"
            otpLength={4}
            autoFocus={true}
            cellStyle={styles.otp_input_cell}
          />
        </View>
        <Pressable
          style={styles.button_view}
          onPress={() => {
            OnSubmit();
            setShowSpinner(true);
          }}>
          <SharedElement id="next_button_1">
            <IconlyNextIcon />
          </SharedElement>
        </Pressable>
      </View>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.OverlayStyle}>
        <>
          <Text style={styles.OverlayText}>
            OTP entered is wrong. Please check.{' '}
          </Text>
        </>
      </Overlay>
    </SafeAreaView>
  );
}

OTPCheckRegister.sharedElements = route => {
  return [
    {
      id: 'next_button_1',
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default OTPCheckRegister;

const styles = StyleSheet.create({
  indicator_style: {
    marginTop: -30,
  },
  OverlayStyle: {
    backgroundColor: '#181818',
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  OverlayText: {color: '#fff', fontFamily: 'GothamRounded-Book'},
  lottie_bg_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    marginTop: windowHeight * 0.1,
  },
  body_view: {
    flex: 0.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    height: windowHeight * 0.5,
    marginTop: windowHeight * 0.05,
  },
  otp_input_cell: {
    color: '#FFF',
    borderRadius: 15,
    backgroundColor: '#33333350',
  },
  view: {
    backgroundColor: '#050505',
    flex: 1,
  },
  text: {
    fontSize: 21,
    fontFamily: 'GothamRounded-Bold',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#50E3C2',
    width: 300,
    marginVertical: 100,
    height: 50,
    borderRadius: 25,
  },
  button_text: {
    fontSize: 16,
    fontFamily: 'GothamRounded-Medium',
    color: '#050505',
  },

  next_icon_style: {
    color: '#050505',
  },
  next_icon_button_container: {
    backgroundColor: '#50e3c2',
  },
  back_button_view: {
    flex: 0.05,
  },
});