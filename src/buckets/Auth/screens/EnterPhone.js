/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Iconly from '../../../external/Iconly';
import {SharedElement} from 'react-navigation-shared-element';
import Spinner from 'react-native-loading-spinner-overlay';
import ThemeContext from '../../../themes/Theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function EnterPhone({navigation}) {
  const theme = useContext(ThemeContext);
  const [value, setValue] = useState('');
  const [country, setCountry] = useState('in');
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
        <View
          style={{
            position: 'absolute',
            width: 55,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Iconly name="ChevronLeftBroken" color="#EEEEEE" size={25} />
        </View>
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
          phone number
        </Text>
        <Spinner
          visible={showSpinner}
          indicatorStyle={styles.indicator_style}
          color={theme.colors.success_green}
        />
        <View style={styles.phone_input}>
          <PhoneInput
            ref={phoneRef}
            textProps={{autoFocus: true}}
            textStyle={{...theme.text.title_3, color: theme.colors.full_light}}
            buttonTextStyle={styles.phone_input_picker_button}
            onSelectCountry={item => setCountry(item)}
            initialCountry="in"
            onChangePhoneNumber={number => {
              setValue(number);
            }}
            countriesList={[
              {
                name: 'India (भारत)',
                iso2: 'in',
                dialCode: '91',
                priority: 0,
                areaCodes: null,
              },
              {
                name: 'United States',
                iso2: 'us',
                dialCode: '1',
                priority: 0,
                areaCodes: null,
              },
              {
                name: 'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
                iso2: 'ae',
                dialCode: '971',
                priority: 0,
                areaCodes: null,
              },
              {
                name: 'United Kingdom',
                iso2: 'gb',
                dialCode: '44',
                priority: 0,
                areaCodes: null,
              },
              {
                name: 'Canada',
                iso2: 'ca',
                dialCode: '1',
                priority: 1,
                areaCodes: [
                  '204',
                  '226',
                  '236',
                  '249',
                  '250',
                  '289',
                  '306',
                  '343',
                  '365',
                  '387',
                  '403',
                  '416',
                  '418',
                  '431',
                  '437',
                  '438',
                  '450',
                  '506',
                  '514',
                  '519',
                  '548',
                  '579',
                  '581',
                  '587',
                  '604',
                  '613',
                  '639',
                  '647',
                  '672',
                  '705',
                  '709',
                  '742',
                  '778',
                  '780',
                  '782',
                  '807',
                  '819',
                  '825',
                  '867',
                  '873',
                  '902',
                  '905',
                ],
              },
              {
                name: 'Australia',
                iso2: 'au',
                dialCode: '61',
                priority: 0,
                areaCodes: null,
              },
              {
                name: 'New Zealand',
                iso2: 'nz',
                dialCode: '64',
                priority: 0,
                areaCodes: null,
              },
            ]}
          />
        </View>

        <Pressable
          style={styles.button_view}
          onPress={() => {
            if (value.length > 7) {
              SendOTP();
              setShowSpinner(true);
              console.log('tap working');
            }
          }}>
          <SharedElement id="next_button_1">
            <Iconly name="ArrowRightBold" color="#EEEEEE" size={50} />
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
    width: windowWidth * 0.75,
    backgroundColor: '#33333350',
    height: 70,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.1,
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

  button_view: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  back_button_view: {
    flex: 0.05,
    // position: 'absolute',
  },
  lottie_bg_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    marginTop: windowHeight * 0.1,
  },
});
