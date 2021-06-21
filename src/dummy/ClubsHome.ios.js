import React, {useState, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetMyClubs} from '../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import LiveClubs from '../components/LiveClubs';
import DormantClubBit from '../uibits/DormantClubBit';
import BannerToPushToStartClub from '../uibits/BannerToPushToStartClub';
import _ from 'lodash';
import PushSetup from './PushSetup';
import AnimatedPullToRefresh from './AnimatedPullRefreshCopy';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = {};

function ClubsHomeD({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const pubnub = usePubNub();
  const navigation = useNavigation();

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
    }, [my_clubs, my_clubs.length, refreshing]),
  );

  const [resolved, setResolved] = useState(false);

  const [dor_clubs, setDorClubs] = useState([]);

  const [live_clubs, setLiveClubs] = useState([]);

  function CheckOnGoing() {
    setDorClubs([]);
    setLiveClubs([]);
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
                underlayColor="#EEEEEE"
                containerStyle={styles.list_item_container}
                onPress={() => {
                  navigation.navigate('ClubInteractionScreens', {
                    screen: 'ClubChatScreen',
                    params: {
                      clubNameHere: item.club_name,
                      channelIdHere: item.pn_channel_id,
                      channelOnGoing: item.on_going_frame,
                      channelStartTime: item.start_time,
                      channelEndTime: item.end_time,
                      clubID: item.club_id,
                    },
                  });
                }}>
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
          <LiveClubs
            ClubsData={live_clubs}
            UserID={state_here.MyProfileReducer.myprofile.user.id}
          />
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

  const memoizedHandleRefresh = useCallback(() => {
    console.log('refresh happened');
    dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
  }, []);

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
    width: windowWidth,
  },
  overall_view: {flex: 1, overflow: 'visible', backgroundColor: '#FFF'},
});
