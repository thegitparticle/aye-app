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
  const [resolved, setResolved] = useState(false);

  const [dor_clubs, setDorClubs] = useState([]);

  const [live_clubs, setLiveClubs] = useState([]);

  function CheckOnGoing() {
    for (var i = 0; i < my_clubs.length; i++) {
      const club_here = my_clubs[i];

      if (club_here.on_going_frame) {
        setLiveClubs(state => [...state, club_here]);
      } else {
        setDorClubs(state => [...state, club_here]);
      }
    }

    setResolved(true);
    console.log(resolved);
  }

  useEffect(() => {
    console.log('my clubs list dispatch log');
    dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
    CheckOnGoing();
  }, [dispatch]);

  /*
  useFocusEffect(
    React.useCallback(() => {
      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
      CheckOnGoing();
    }, [dispatch]),
  );

  */

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
      return (
        <View>
          <Text style={{fontFamily: 'GothamRounded-Book', color: 'green'}}>
            Post Load
          </Text>
          <RenderLive />
          <RenderDor />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{fontFamily: 'GothamRounded-Book', color: 'red'}}>
            Pre Load
          </Text>
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
