import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {connect} from 'react-redux';
import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';
import analytics from '@segment/analytics-react-native';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {MixpanelProvider} from '../pnstuff/MixPanelStuff';
import {Mixpanel} from 'mixpanel-react-native';

var state_here = {};

function RootStack() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  /*
  useEffect(() => {
    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(
        '3e0fa58ece380382cd406509554aef3b',
      );
      setMixpanel(initializedMixpanel);

      //mixpanel.track('init done of mixpanel');
    };

    initMixpanel();
  }, []);
  */

  var t_or_f = state_here.AuthStateReducer.logged_in_or_not;

  if (t_or_f === true) {
    const pubnub = new PubNub({
      publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
      subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
      uuid: state_here.MyProfileReducer.myprofile.user.id,
      //logVerbosity: true,
    });

    pubnub.objects.setUUIDMetadata({
      data: {
        name: state_here.MyProfileReducer.myprofile.user.full_name,
        custom: {
          display_pic: state_here.MyProfileReducer.myprofile.image,
        },
      },
    });

    const [mixpanel, setMixpanel] = useState();
    const initMixpanel = async () => {
      const initializedMixpanel = await Mixpanel.init(
        '3e0fa58ece380382cd406509554aef3b',
      );
      setMixpanel(initializedMixpanel);
      console.log(String(state_here.MyProfileReducer.myprofile.user.id));
      mixpanel.identify(String(state_here.MyProfileReducer.myprofile.user.id));

      //mixpanel.track('init done of mixpanel');
    };

    useEffect(() => {
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
        '3e0fa58ece380382cd406509554aef3b',
      );
      setMixpanel(initializedMixpanel);
      mixpanel.track('auth stack');
      console.log('setting mixpanel');

      //mixpanel.track('init done of mixpanel');
    };

    useEffect(() => {
      initMixpanel();
    }, []);

    return (
      // eslint-disable-next-line react-native/no-inline-styles
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
