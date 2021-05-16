import React, {useEffect} from 'react';
import {View} from 'react-native';
import {GetMyClubs} from '../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import {connect} from 'react-redux';
import _ from 'lodash';
import messaging from '@react-native-firebase/messaging';

var state_here = {};

function PushSetup({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();
  const [deviceToken, setDeviceToken] = useState('');
  console.log(deviceToken);

  var list_here = [];

  useEffect(() => {
    //messaging.getToken().then(token => setDeviceToken(token));
    async function GetFcmToken() {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setDeviceToken(fcmToken);
        console.log('Your Firebase Token is:', fcmToken);
        _.forEach(my_clubs, function (value) {
          var here = value.pn_channel_id;
          list_here.push(here + '_push');
        });
        console.log(list_here);
        pubnub.push.addChannels(
          {
            channels: list_here,
            device: fcmToken,
            pushGateway: 'gcm', // apns, apns2, gcm
          },
          function (status) {
            console.log(status);
          },
        );
        pubnub.push.listChannels(
          {
            device: fcmToken,
            pushGateway: 'gcm', // apns, apns2, gcm
          },
          function (status, response) {
            console.log(response);
          },
        );
      } else {
        console.log('Failed', 'No token received');
      }
    }
    GetFcmToken();
  }, []);

  return <View />;
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PushSetup);
