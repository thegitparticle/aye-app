import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {connect} from 'react-redux';
import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';
import messaging from '@react-native-firebase/messaging';
import {MixpanelProvider} from '../external/MixPanelStuff';
import {Mixpanel} from 'mixpanel-react-native';

var state_here = {};

function RootStack() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!');
    });

    return unsubscribe;
  }, []);

  var t_or_f = state_here.AuthStateReducer.logged_in_or_not;

  if (t_or_f === true) {
    const pubnub = new PubNub({
      publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
      subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
      uuid: state_here.MyProfileReducer.myprofile.user.id,
      heartbeatInterval: 10,
      keepAlive: true,
      // logVerbosity: true,
    });

    pubnub.objects.setUUIDMetadata({
      data: {
        name: state_here.MyProfileReducer.myprofile.user.name,
        image: state_here.MyProfileReducer.myprofile.image,
      },
    });

    const [mixpanel, setMixpanel] = useState();

    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(
        '729c55a7e5799a281daa17e4a1d3f8f3',
      );
      setMixpanel(initializedMixpanel);
    };

    useEffect(() => {
      pubnub.objects.setUUIDMetadata({
        data: {
          name: state_here.MyProfileReducer.myprofile.user.full_name,
          custom: {
            display_pic: state_here.MyProfileReducer.myprofile.image,
          },
        },
      });
      initMixpanel();
    }, []);

    return (
      <MixpanelProvider value={mixpanel}>
        <PubNubProvider client={pubnub}>
          <NavigationContainer style={{backgroundColor: '#050505'}}>
            <HomeStack />
          </NavigationContainer>
        </PubNubProvider>
      </MixpanelProvider>
    );
  } else {
    const [mixpanel, setMixpanel] = useState();
    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(
        '729c55a7e5799a281daa17e4a1d3f8f3',
      );
      setMixpanel(initializedMixpanel);
      mixpanel.track('auth stack');
    };

    useEffect(() => {
      console.log('bad effect needed');
      initMixpanel();
    }, []);

    return (
      <MixpanelProvider value={mixpanel}>
        <NavigationContainer style={{backgroundColor: '#050505'}}>
          <AuthStack />
        </NavigationContainer>
      </MixpanelProvider>
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RootStack);
