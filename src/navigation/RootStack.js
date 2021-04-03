import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {connect} from 'react-redux';
import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';

var state_here = {};

function RootStack() {
  var t_or_f = state_here.AuthStateReducer.logged_in_or_not;

  if (t_or_f === true) {
    const pubnub = new PubNub({
      publishKey: 'pub-c-51313319-e3e9-4667-b0c6-e5b9651aad84',
      subscribeKey: 'sub-c-3fd0d670-873e-11eb-88a7-4a59fc122af9',
      uuid: state_here.MyProfileReducer.myprofile.user.id,
      //logVerbosity: true,
    });

    pubnub.objects.setUUIDMetadata({
      data: {
        name: state_here.MyProfileReducer.myprofile.user.full_name,
        custom: {
          display_pic:
            'http://apisayepirates.life/' +
            state_here.MyProfileReducer.myprofile.image,
        },
      },
    });

    return (
      <PubNubProvider client={pubnub}>
        <NavigationContainer style={{backgroundColor: '#050505'}}>
          <HomeStack />
        </NavigationContainer>
      </PubNubProvider>
    );
  } else {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <NavigationContainer style={{backgroundColor: '#050505'}}>
        <AuthStack />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RootStack);
