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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetMyClubs} from '../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import LiveClubs from '../components/LiveClubs';
import DormantClubBit from '../uibits/DormantClubBit';
import BannerToPushToStartClub from '../uibits/BannerToPushToStartClub';
import _ from 'lodash';

var state_here = {};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ClubsHomeD({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();

  useFocusEffect(
    React.useCallback(() => {
      pubnub.unsubscribeAll();
      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
      if (my_clubs.length > 0) {
        CheckOnGoing();
        console.log('checking on going');
      }
    }, [dispatch]),
  );

  const [resolved, setResolved] = useState(false);

  const [dor_clubs, setDorClubs] = useState([]);

  const [live_clubs, setLiveClubs] = useState([]);

  function CheckOnGoing() {
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
        {my_clubs.map((item, index) => (
          <View>
            <ListItem bottomDivider containerStyle={styles.list_item_container}>
              <DormantClubBit Club={item} />
            </ListItem>
          </View>
        ))}
      </View>
    );
  }

  function RenderLiveClubsHere() {
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
          <View style={{marginTop: 10}}>
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

  return (
    <ScrollView
      style={styles.overall_view}
      showsVerticalScrollIndicator={false}>
      <RenderLiveClubsHere />
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