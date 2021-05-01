import React, {useEffect} from 'react';
import {Text, StyleSheet, Dimensions, SafeAreaView, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {LOGIN} from '../redux/types';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import {GetMyProfile} from '../redux/MyProfileActions';
import messaging from '@react-native-firebase/messaging';
import {upperCase} from 'lodash';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = {};

function PermissionsAfterRegister({dispatch, route}) {
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
      <Button
        title="ALLOW CONTACTS"
        buttonStyle={styles.button}
        titleStyle={styles.button_text}
        onPress={() => {
          requestUserPermission();
          GrabContacts();
          dispatch({type: LOGIN});
        }}
      />
      <Text style={styles.text}>
        allowing your contacts helps you find your friends faster
      </Text>
      <Image
        source={require('/Users/san/Desktop/toastgo/assets/clip-141.png')}
        style={styles.graphic_here}
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
  button: {
    backgroundColor: '#50E3C2',
    width: 300,
    height: 50,
    borderRadius: 25,
  },
  button_text: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
    color: '#050505',
  },
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
