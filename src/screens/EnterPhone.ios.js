import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import BackButtonIcon from '/Users/san/Desktop/toastgo/src/uibits/BackButtonIcon';
import PhoneInput from 'react-native-phone-input';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import IconlyNextIcon from '../uibits/IconlyNextIcon';
import {SharedElement} from 'react-navigation-shared-element';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EnterPhone({navigation}) {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState();
  const phoneRef = useRef(undefined);
  const [showSpinner, setShowSpinner] = useState(false);

  function SendOTP() {
    axios
      .get('https://apisayepirates.life/api/users/send_otp/' + value)

      .then(response =>
        navigation.navigate(
          response.data.user_exists === 'True'
            ? 'OTPCheck'
            : 'SignUpDetailsInput',
          {phone: value, iso_code: country},
        ),
      )
      .then(() => setShowSpinner(false))
      .then(() => console.log('yes, pressed and sendiing success'))

      .catch(error => console.log(error));
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
        <Text style={styles.text}>phone number</Text>
        <Spinner
          visible={showSpinner}
          //textContent={'Loading...'}
          //textStyle={styles.spinnerTextStyle}
          indicatorStyle={styles.indicator_style}
          color="#50E3C2"
        />
        <View style={styles.phone_input}>
          <PhoneInput
            ref={phoneRef}
            //value={value}
            textProps={{autoFocus: true}}
            textStyle={styles.phone_input_text}
            buttonTextStyle={styles.phone_input_picker_button}
            onSelectCountry={item => setCountry(item)}
            initialCountry="in"
            onChangePhoneNumber={number => {
              setValue(number);
            }}
          />
        </View>
        <Pressable
          style={styles.button_view}
          onPress={() => {
            SendOTP();
            setShowSpinner(true);
            console.log('tap working');
          }}>
          <SharedElement id="next_button_1">
            <IconlyNextIcon />
          </SharedElement>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

EnterPhone.sharedElements = route => {
  return [
    {
      id: 'next_button_1',
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default EnterPhone;

const styles = StyleSheet.create({
  indicator_style: {
    marginTop: -30,
  },
  phone_input_picker_button: {
    fontSize: 16,
  },
  phone_input: {
    width: windowWidth * 0.7,
    backgroundColor: '#33333350',
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.1,
  },
  phone_input_text: {
    fontSize: 21,
    fontFamily: 'GothamRounded-Bold',
    color: '#FFFFFF',
    //marginHorizontal: ,
    //paddingVertical: 30,
    //backgroundColor: '#33333325',
  },
  view: {
    backgroundColor: '#050505',
    flex: 1,
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
  text: {
    fontSize: 21,
    fontFamily: 'GothamRounded-Bold',
    color: '#FFFFFF',
  },

  button_view: {
    flex: 0.2,
    //alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  back_button_view: {
    flex: 0.05,
  },
  lottie_bg_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    marginTop: windowHeight * 0.1,
  },
});
