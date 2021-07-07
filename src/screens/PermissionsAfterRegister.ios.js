/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {LOGIN} from '../redux/types';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import {GetMyProfile} from '../redux/MyProfileActions';
import messaging from '@react-native-firebase/messaging';
import ThemeContext from '../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = {};

function PermissionsAfterRegister({dispatch, route}) {
  const theme = useContext(ThemeContext);
  const {phone, iso_code} = route.params;

  useEffect(() => {
    dispatch(GetMyProfile(phone));
    GrabContacts();
  }, []);

  async function GrabContacts() {
    const contacts_here = await Contacts.getAllWithoutPhotos();
    var data2 = {};
    data2.contact_list = contacts_here;
    data2.contact_list.unshift({
      country_code: iso_code,
    });

    var x1 = data2.contact_list;
    console.log(x1);

    var dataf = {};
    dataf.contact_list = JSON.stringify(x1);

    var config = {
      method: 'put',
      url:
        'https://apisayepirates.life/api/users/post_contacts_to_server/' +
        String(state_here.MyProfileReducer.myprofile.user.id) +
        '/',
      data: dataf,
    };
    axios(config)
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    dispatch(GetMyProfile(phone));
    GrabContacts();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <SafeAreaView style={styles.view}>
      <TouchableOpacity
        style={{
          marginVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          ReactNativeHapticFeedback.trigger('impactHeavy', {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
          });
          requestUserPermission();
          GrabContacts();
          dispatch({type: LOGIN});
        }}>
        <SquircleView
          style={{
            width: windowWidth * 0.8,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 15,
            fillColor: theme.colors.success_green,
          }}>
          <Text style={{...theme.text.title_3, color: theme.colors.full_light}}>
            ALLOW CONTACTS
          </Text>
        </SquircleView>
      </TouchableOpacity>
      <Text
        style={{
          ...theme.text.header,
          textAlign: 'center',
          color: theme.colors.full_light,
          marginHorizontal: windowWidth * 0.1,
        }}>
        allowing access to your contacts helps you find your friends faster
      </Text>

      <LottieView
        source={require('/Users/san/Desktop/toastgo/assets/friends_hifi.json')}
        autoPlay
        loop
        style={{width: windowWidth * 0.8, height: windowHeight * 0.5}}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PermissionsAfterRegister);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#050505',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
    color: '#FFFFFF75',
    textAlign: 'center',
    marginHorizontal: windowWidth * 0.1,
  },
  graphic_here: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
  },
});
