import React, {useState} from 'react';
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
//import {SpringScrollView} from 'react-native-spring-scrollview';

var state_here = {};

function ClubsHomeD({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();

  useFocusEffect(
    React.useCallback(() => {
      pubnub.unsubscribeAll();
      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
    }, [dispatch]),
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
    var new_frame_notif_payload = {
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

    return (
      <Button
        buttonStyle={{width: 200, height: 50}}
        onPress={() =>
          pubnub.publish(
            {
              channel: '1_c_push',
              message: new_frame_notif_payload,
            },
            function (status, response) {
              console.log(status);
            },
          )
        }
      />
    );
  }

  return (
    <ScrollView
      style={styles.overall_view}
      showsVerticalScrollIndicator={false}>
      <RenderClubsHere />
      <PushSetup />
      <BannerToPushToStartClub />
    </ScrollView>
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
