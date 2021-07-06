import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import BackButtonIcon from '/Users/san/Desktop/toastgo/src/uibits/BackButtonIcon';
import OTPInput from 'react-native-otp';
import {connect} from 'react-redux';
import {LOGIN} from '../redux/types';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {GetMyProfile} from '../redux/MyProfileActions';
import IconlyNextIcon from '../uibits/IconlyNextIcon';
import {SharedElement} from 'react-navigation-shared-element';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';
import ThemeContext from '../themes/Theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function OTPCheck({route, navigation, dispatch}) {
  const theme = useContext(ThemeContext);
  const [otp, setOTP] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const {phone, iso_code} = route.params;
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
      .then(() => dispatch(GetMyProfile(phone)))
      .then(() =>
        ReactNativeHapticFeedback.trigger('impactHeavy', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        }),
      )
      .then(() => console.log('profile called'))

      .then(() => {
        return axios.get(
          'https://apisayepirates.life/api/users/update_otp_code/' +
            otp +
            '/' +
            phone +
            '/' +
            iso_code.toUpperCase() +
            '/',
        );
      })

      //.then(() => changeOTP())

      .then(() => setShowSpinner(false))
      .then(() => dispatch({type: LOGIN}))
      .then(() => console.log('login pass success'))
      .catch(() => toggleOverlay());
  }

  return (
    <SafeAreaView style={styles.view}>
      <Pressable
        onPress={() => {
          navigation.goBack();
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
        <Text style={{...theme.text.title_3, color: theme.colors.full_light}}>
          one time password
        </Text>
        <Spinner
          visible={showSpinner}
          indicatorStyle={styles.indicator_style}
          color={theme.colors.success_green}
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

        <View style={styles.button_view}>
          <Pressable
            onPress={() => {
              if (otp.length === 4) {
                setShowSpinner(true);
                OnSubmit();
              }
            }}>
            <SharedElement id="next_button_1">
              <IconlyNextIcon Color={theme.colors.off_light} />
            </SharedElement>
          </Pressable>
          <Pressable
            style={{marginTop: 20}}
            onPress={() =>
              axios
                .get('https://apisayepirates.life/api/users/send_otp/' + phone)
                .then(() =>
                  showMessage({
                    message: 'OTP sent again',
                    type: 'info',
                    backgroundColor: theme.colors.danger_red,
                  }),
                )
                .catch(err => console.log(err))
            }>
            <Text style={styles.resend_button_text}>resend OTP</Text>
          </Pressable>
        </View>
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

OTPCheck.sharedElements = route => {
  return [
    {
      id: 'next_button_1',
      animation: 'move',
      resize: 'clip',
    },
  ];
};

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(OTPCheck);

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

  resend_button_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: 'indianred',
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
  button_view: {
    alignItems: 'center',
  },
  lottie_bg_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    marginTop: windowHeight * 0.1,
  },
});
