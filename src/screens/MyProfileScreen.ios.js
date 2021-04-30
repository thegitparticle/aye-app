/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {GetMyProfile} from '../redux/MyProfileActions';
import MyProfileComponent from '../components/MyProfileComponent';
import AccountToolKitButtons from '../uibits/AccountToolKitButtons';
import {usePubNub} from 'pubnub-react';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

/*

 var new_frame_notif_payload = {
      text: 'new frame started',
      pn_gcm: {
        topic: 'new_frame',
        android: {
          notification: {
            title: {clubNameHere},
            body: 'new frame started',
          },
        },
      },
    };

pubnub.publish(
            {
              channel: channelIdHere,
              message: new_frame_notif_payload,
            },
            function (status, response) {
              console.log(status);
            },
          ),

          */

var state_here = {};

function MyProfileScreen({dispatch, navigation}) {
  const pubnub = usePubNub();

  useEffect(() => {
    dispatch(GetMyProfile(state_here.MyProfileReducer.myprofile.user.phone));
  }, [dispatch]);

  useEffect(() => {
    var exact_pn_said = {
      pn_debug: true,
      pn_gcm: {
        data: {
          message: 'hello',
        },
      },
      pn_apns: {
        aps: {
          alert: 'hello',
        },
        pn_push: [
          {
            push_type: 'alert',
            auth_method: 'token',
            targets: [
              {
                environment: 'development',
                topic: 'com.PubNub.MobilePushTest',
              },
            ],
            version: 'v2',
          },
        ],
      },
    };

    var new_frame_notif_payload_apple = {
      pn_debug: true,
      pn_gcm: {
        topic: 'new_frame_apple',
        apns: {
          payload: {
            aps: {
              alert: {
                title: 'Grand Notif Club Apple',
                body: 'new frame started apple',
              },
            },
          },
          headers: {
            'apns-push-type': 'alert',
            'apns-priority': '10',
          },
        },
      },
    };

    var new_frame_notif_payload = {
      text: 'new frame started',
      pn_gcm: {
        topic: 'new_frame',
        android: {
          notification: {
            title: 'Grand Notif Club',
            body: 'new frame started',
          },
        },
      },
    };

    pubnub.publish(
      {
        channel: '2_c',
        //message: new_frame_notif_payload_apple,
        message: exact_pn_said,
      },
      function (status, response) {
        console.log(status);
      },
    );
  }, []);

  var profile_info = state_here.MyProfileReducer.myprofile;

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: '#fafafa',
      }}>
      <MyProfileComponent Profile={profile_info} />
      <AccountToolKitButtons />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MyProfileScreen);
