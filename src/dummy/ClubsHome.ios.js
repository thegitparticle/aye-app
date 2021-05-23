import React, {useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetMyClubs} from '../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import LiveClubs from '../components/LiveClubs';
import DormantClubBit from '../uibits/DormantClubBit';
import BannerToPushToStartClub from '../uibits/BannerToPushToStartClub';
import _ from 'lodash';
import PushSetup from './PushSetup';
//import PullToRefresh from 'react-native-pull-refresh';
import AnimatedPullToRefresh from './AnimatedPullRefreshCopy';
//import {SpringScrollView} from 'react-native-spring-scrollview';

var state_here = {};

function ClubsHomeD({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      pubnub.unsubscribeAll();
      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
    }, [dispatch, refreshing]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (my_clubs.length > 0) {
        CheckOnGoing();
      }
    }, [my_clubs, my_clubs.length]),
  );

  const [resolved, setResolved] = useState(false);

  const [dor_clubs, setDorClubs] = useState([]);

  const [live_clubs, setLiveClubs] = useState([]);

  function CheckOnGoing() {
    setDorClubs([]);
    for (var i = 0; i < my_clubs.length; i++) {
      const club_here = my_clubs[i];

      if (club_here.ongoing_frame === true) {
        setLiveClubs(state => [...state, club_here]);
      } else {
        setDorClubs(state => [...state, club_here]);
      }
    }
    setResolved(true);
  }

  function PreLoadDorClubs() {
    return (
      <View>
        {_.uniqBy(my_clubs, 'club_id').map((item, index) => (
          <View>
            <ListItem bottomDivider containerStyle={styles.list_item_container}>
              <DormantClubBit Club={item} />
            </ListItem>
          </View>
        ))}
      </View>
    );
  }

  function RenderClubsHere() {
    function RenderDor() {
      return (
        <View>
          {_.uniqBy(dor_clubs, 'club_id').map((item, index) => (
            <View>
              <ListItem
                bottomDivider
                containerStyle={styles.list_item_container}>
                <DormantClubBit Club={item} />
              </ListItem>
            </View>
          ))}
        </View>
      );
    }

    function RenderLive() {
      return (
        <View>
          <LiveClubs ClubsData={live_clubs} />
        </View>
      );
    }

    if (resolved) {
      if (dor_clubs.length === 0 && live_clubs.length === 0) {
        return <View />;
      } else {
        return (
          <View>
            <RenderLive />
            <RenderDor />
          </View>
        );
      }
    } else {
      return (
        <View>
          <PreLoadDorClubs />
        </View>
      );
    }
  }

  function SendPNNotif() {
    var new_frame_notif_payload_old = {
      text: 'new frame started',
      pn_gcm: {
        topic: 'new_frame',
        apns: {
          payload: {
            aps: {
              alert: {
                title: 'club name',
                body: 'new frame started',
              },
            },
          },
          headers: {
            'apns-push-type': 'alert',
            'apns-topic': 'org.reactjs.native.example.toastgo-go',
            'apns-priority': '10',
          },
        },
        android: {
          notification: {
            //title: {clubNameHere},
            title: 'Friends',
            body: 'new frame started',
          },
        },
      },
    };

    var new_frame_android_only_payload = {
      //pn_debug: true,
      //text: 'John invited you to chat',
      pn_gcm: {
        notification: {
          title: 'Chat Invitation',
          body: 'John invited you to chat',
        },
      },
    };

    var new_frame_notif_payload = {
      pn_gcm: {
        notification: {
          title: 'Bohemian Grove',
          body: 'new frame started',
        },
      },
    };

    var simple_notif_load = {
      pn_gcm: {notification: {body: 'this better works cuz it simple'}},
    };

    return (
      <Button
        buttonStyle={{width: 200, height: 50}}
        onPress={() =>
          pubnub.publish(
            {
              channel: '2_c_push',
              message: new_frame_notif_payload,
              //message: new_frame_android_only_payload,
              //message: simple_notif_load,
            },
            function (status, response) {
              console.log(status);
            },
          )
        }
      />
    );
  }

  const memoizedHandleRefresh = useCallback(
    () => {
      console.log('refresh happened');
      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
    },
    [], // Tells React to memoize regardless of arguments.
  );

  return (
    <AnimatedPullToRefresh
      isRefreshing={refreshing}
      animationBackgroundColor={'#FFFFFF'}
      onRefresh={memoizedHandleRefresh}
      pullHeight={180}
      contentView={
        <ScrollView
          style={styles.overall_view}
          showsVerticalScrollIndicator={false}>
          <RenderClubsHere />
          <PushSetup />
          <BannerToPushToStartClub />
        </ScrollView>
      }
      onPullAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      onStartRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      onRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
      onEndRefreshAnimationSrc={require('/Users/san/Desktop/toastgo/assets/puppy_wave.json')}
    />
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ClubsHomeD);

const styles = StyleSheet.create({
  list_item_container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: '#05050510',
  },
  overall_view: {flex: 1, overflow: 'visible', backgroundColor: '#FFF'},
});
