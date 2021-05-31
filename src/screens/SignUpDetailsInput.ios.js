import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import BackButtonIcon from '/Users/san/Desktop/toastgo/src/uibits/BackButtonIcon';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import IconlyNextIcon from '../uibits/IconlyNextIcon';
import {SharedElement} from 'react-navigation-shared-element';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage, hideMessage} from 'react-native-flash-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SignUpDetailsInput({route, navigation}) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const {phone, iso_code} = route.params;
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  console.log(iso_code);
  //console.log(iso_code.toUpperCase());

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  function OnSubmit() {
    var config = {
      method: 'post',
      url: 'https://apisayepirates.life/api/users/register/',
      headers: {'content-type': 'application/json'},
      data: {
        phone: phone,
        full_name: name,
        username: username,
        profile: {},
      },
    };

    axios(config)
      .then(() =>
        navigation.navigate('OTPCheckRegister', {
          name: name,
          username: username,
          phone: phone,
          iso_code: iso_code,
        }),
      )
      .then(() => setShowSpinner(false))
      //.catch(() => toggleOverlay());
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
        <Text style={styles.text}>a few details</Text>
        <Spinner
          visible={showSpinner}
          //textContent={'Loading...'}
          //textStyle={styles.spinnerTextStyle}
          color="#50E3C2"
        />
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="not your superhero alias"
          placeholderTextColor="#FFFFFF50"
          style={styles.name_input}
        />
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="username"
          placeholderTextColor="#FFFFFF50"
          style={styles.username_input}
        />

        <Pressable
          style={styles.button_view}
          onPress={() => {
            if (name.length > 3 && username.length > 3) {
              console.log('submit pressed');
              OnSubmit();
              setShowSpinner(true);
            } else {
              showMessage({
                message: 'Name and username must be between 4 and 15 letters',
                type: 'info',
                //backgroundColor: 'mediumseagreen',
                backgroundColor: 'indianred',
              });
            }
          }}>
          <SharedElement id="next_button_1">
            <IconlyNextIcon Color="#eee" />
          </SharedElement>
        </Pressable>
      </View>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.OverlayStyle}>
        <>
          <Text style={styles.OverlayText}>
            username & name have to be more than 3 letters each
          </Text>
        </>
      </Overlay>
    </SafeAreaView>
  );
}

SignUpDetailsInput.sharedElements = route => {
  return [
    {
      id: 'next_button_1',
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default SignUpDetailsInput;

const styles = StyleSheet.create({
  button_view: {
    alignItems: 'center',
  },

  name_input: {
    backgroundColor: '#33333350',
    borderRadius: 15,
    width: windowWidth * 0.8,
    height: 60,
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: '#FFFFFF',
    paddingHorizontal: windowWidth * 0.05,
  },
  username_input: {
    backgroundColor: '#33333350',
    borderRadius: 15,
    width: windowWidth * 0.8,
    height: 60,
    color: '#FFFFFF',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    paddingHorizontal: windowWidth * 0.05,
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
  lottie_bg_view: {
    height: windowHeight * 0.7,
    width: windowWidth,
    marginTop: windowHeight * 0.1,
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
});
