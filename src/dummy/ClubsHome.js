import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, ListItem, Badge, Icon} from 'react-native-elements';
import {ClubDummyData} from '../dummy/ClubDummyData';
import LiveClubs from '../components/LiveClubs';
import DormantClubs from '../components/DormantClubs';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetMyClubs} from '../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import _ from 'lodash';
import MyClubsCheckLiveStatus from '../pnstuff/MyClubsCheckLiveStatus';
import DormantClubBit from '../uibits/DormantClubBit';

var state_here = {};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ClubsHomeD({dispatch}) {
  const navigation = useNavigation();

  var my_clubs = ClubDummyData;
  //var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();
  const [resolved, setResolved] = useState(false);

  const [dor_clubs, setDorClubs] = useState([]);

  const [live_clubs, setLiveClubs] = useState([]);

  //console.log(live_clubs.length);

  function PreLoadDorClubs() {
    return (
      <View>
        {my_clubs.map((item, index) => (
          <View>
            <ListItem topDivider containerStyle={styles.list_item_container}>
              <DormantClubBit Club={item} />
            </ListItem>
          </View>
        ))}
      </View>
    );
  }

  function CheckLive() {
    for (var i = 0; i < my_clubs.length; i++) {
      //console.log(dor_clubs.length + 'dor');
      //console.log(live_clubs.length + 'live');

      const club_here = my_clubs[i];
      //      console.log(club_here);

      pubnub.hereNow(
        {
          channels: [club_here.pn_channel_id],
          includeUUIDs: true,
          includeState: true,
        },
        (status, response) => {
          //console.log(club_here.pn_channel_id);
          if (response) {
            //console.log('yes, response');
            if (response.totalOccupancy > 0) {
              console.log('this seems live' + club_here.pn_channel_id);
              if (live_clubs.includes(club_here) === false) {
                // setLiveClubs(live_clubs => [...live_clubs, club_here]);
                setLiveClubs(live_clubs.concat(club_here));
              } else {
                setLiveClubs(live_clubs);
              }
            } else if (response.totalOccupancy === 0) {
              console.log('this seems ded bro' + club_here.pn_channel_id);
              if (dor_clubs.includes(club_here) === false) {
                setDorClubs(dor_clubs.concat(club_here));
                //setDorClubs(new Set(dor_clubs).add(club_here));
              }
            } else {
              setDorClubs(dor_clubs);
            }
          }
        },
      );
    }
    setResolved(true);
    console.log('how often am I called?');
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
      pubnub.unsubscribeAll();
      CheckLive();
    }, [dispatch]),
  );

  function RenderLiveClubsHere() {
    function RenderDor() {
      //console.log(dor_clubs);
      return (
        <View>
          {dor_clubs.map((item, index) => (
            <View>
              <ListItem
                topDivider
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
      //console.log('render live called');
      return (
        <View>
          {live_clubs.map((item, index) => (
            <View>
              <MyClubsCheckLiveStatus Club={item} PN={pubnub} Index={index} />
            </View>
          ))}
        </View>
      );
    }
    if (resolved) {
      return (
        <View>
          <RenderLive />
          <RenderDor />
        </View>
      );
    } else {
      return (
        <View>
          <PreLoadDorClubs />
        </View>
      );
    }
  }

  return (
    <ScrollView
      style={styles.overall_view}
      showsVerticalScrollIndicator={false}>
      <RenderLiveClubsHere />

      <Button
        buttonStyle={styles.start_club_button_style}
        containerStyle={styles.start_club_button_container_style}
        titleStyle={styles.start_club_button_title_style}
        title="start club"
        onPress={() => navigation.navigate('StartClub')}
      />
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
  overall_view: {flex: 1, overflow: 'visible'},
  start_club_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#F1f4f9',
  },
  start_club_button_container_style: {
    alignSelf: 'center',
    marginVertical: 30,
    backgroundColor: 'transparent',
  },
  start_club_button_style: {
    height: 60,
    width: 160,
    borderRadius: 30,
    backgroundColor: '#36b37e',
  },
});

/*

/*
  useEffect(() => {
    {
      ClubDummyData.map(item => {
        if (item.pn_live === true) {
          LiveClubsDataHere.push(item);
        } else {
          DorClubsDataHere.push(item);
        }
      });
    }
  }, [ClubDummyData]);
*/
//<LiveClubs ClubsData={ClubDummyData} />
