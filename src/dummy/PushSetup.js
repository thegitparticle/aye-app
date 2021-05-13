import React, {useEffect} from 'react';
import {View} from 'react-native';
import {GetMyClubs} from '../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import {connect} from 'react-redux';
import _ from 'lodash';

var state_here = {};

function PushSetup({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();

  var list_here = [];

  useEffect(() => {
    _.forEach(my_clubs, function (value) {
      var here = value.pn_channel_id;
      list_here.push(here + '_push');
    });
    console.log(list_here);
    pubnub.push.addChannels(
      {
        channels: list_here,
        device: 'niceDevice',
        pushGateway: 'gcm', // apns, apns2, gcm
      },
      function (status) {
        console.log(status);
      },
    );
  }, []);

  return <View />;
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(PushSetup);
