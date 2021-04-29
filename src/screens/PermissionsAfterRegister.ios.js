import React from 'react';
import {Text, StyleSheet, Dimensions, SafeAreaView, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {LOGIN} from '../redux/types';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import {GetMyProfile} from '../redux/MyProfileActions';
import messaging from '@react-native-firebase/messaging';
import analytics from '@segment/analytics-react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PermissionsAfterRegister({dispatch, route}) {
  const {phone} = route.params;

  async function GrabContacts() {
    const contacts_here = await Contacts.getAllWithoutPhotos();
    const data = new FormData();

    data.append('contact_list', JSON.stringify(contacts_here));
    data.append('country_code', 'IN');
    console.log(contacts_here);

    var config = {
      method: 'put',
      url: 'https://apisayepirates.life/api/users/post_contacts_to_server/4/',
      data: data,
    };
    axios(config)
      .then(() => dispatch(GetMyProfile(phone)))
      .catch(err => console.log(err));
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function RunOnLog(phone_number) {
    await analytics.setup('vlkm1h2s27bCnL8EBDWFkFoQReJOxT7R', {
      // Record screen views automatically!
      // Record certain application events automatically!
      trackAppLifecycleEvents: true,
    });

    await analytics.identify(JSON.stringify(phone_number));

    console.log('running things on log');
  }

  return (
    <SafeAreaView style={styles.view}>
      <Button
        title="ALLOW CONTACTS"
        buttonStyle={styles.button}
        titleStyle={styles.button_text}
        onPress={() => {
          GrabContacts();
          requestUserPermission();
          RunOnLog(phone);
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

const mapDispatchToProps = dispatch => {
  return {
    onLogInClick: () => {
      dispatch({type: LOGIN});
    },
  };
};

export default connect(mapDispatchToProps)(PermissionsAfterRegister);

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
