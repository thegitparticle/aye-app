/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';
import {GetMyClubs} from '../../../redux/MyClubsActions';
import {usePubNub} from 'pubnub-react';
import LiveClubs from '../bits/LiveClubs';
import DormantClubBit from '../bits/DormantClubBit';
import BannerToPushToStartClub from './BannerToPushToStartClub';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {MixpanelContext} from '../../../external/MixPanelStuff';
import ThemeContext from '../../../themes/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import dayjs from 'dayjs';
import {SetCurrentChannel} from '../../../redux/CurrentChannelActions';
import PubNub from 'pubnub';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

var state_here = {};

function ClubsHomeD({dispatch}) {
  var my_clubs = state_here.MyClubsReducer.myclubs;
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2500);
  }

  useFocusEffect(
    React.useCallback(() => {
      const pubnubX = new PubNub({
        publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
        subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
        uuid: state_here.MyProfileReducer.myprofile.user.id,
      });

      pubnubX.unsubscribeAll();

      console.log('clubs home use effect');

      dispatch(GetMyClubs(state_here.MyProfileReducer.myprofile.user.id));
      MMKV.set(
        state_here.CurrentChannelReducer.current_channel,
        dayjs().unix(),
      );
      dispatch(SetCurrentChannel('0'));
    }, [dispatch, refreshing]),
  );

  const [sharedData, setSharedData] = useState('');
  const [isData, setIsData] = useState('false');

  useFocusEffect(
    useCallback(() => {
      ReceiveSharingIntent.getReceivedFiles(
        data => {
          console.log(data);
          setSharedData(typeof data);
          setIsData('true');
        },
        err => {
          console.log(err);
          setIsData('error');
        },
      );

      console.log('fired in app');
      // ReceiveSharingIntent.clearReceivedFiles();
    }, [refreshing]),
  );

  const mixpanel = useContext(MixpanelContext);

  useEffect(() => {
    if (mixpanel) {
      mixpanel.identify(String(state_here.MyProfileReducer.myprofile.user.id));
    } else {
    }
  }, [mixpanel]);

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
    function RenderItem(props) {
      const x_here = props.item.item;
      return (
        <ListItem
          bottomDivider
          containerStyle={{
            ...styles.list_item_container,
            borderColor: theme.colors.full_dark_10,
            backgroundColor: theme.colors.off_light,
          }}>
          <DormantClubBit Club={x_here} />
        </ListItem>
      );
    }

    var uniqueClubs = _.uniqBy(my_clubs, 'club_id');

    return (
      <FlatList
        data={uniqueClubs}
        keyExtractor={item => item.club_id}
        renderItem={item => <RenderItem item={item} />}
        ListFooterComponent={
          <View>
            <BannerToPushToStartClub />
          </View>
        }
        style={{
          backgroundColor: theme.colors.off_light,
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  }

  function RenderClubsHere() {
    function RenderLive() {
      return (
        <LiveClubs
          ClubsData={live_clubs}
          UserID={state_here.MyProfileReducer.myprofile.user.id}
        />
      );
    }

    const renderDorItem = ({item}) => (
      <TouchableOpacity
        style={{
          ...styles.list_item_container,
        }}
        underlayColor={theme.colors.mid_light}
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
        <ListItem
          bottomDivider
          underlayColor={theme.colors.mid_light}
          containerStyle={{
            ...styles.list_item_container,
            borderColor: theme.colors.full_dark_10,
            backgroundColor: theme.colors.off_light,
          }}>
          <DormantClubBit Club={item} />
        </ListItem>
      </TouchableOpacity>
    );

    if (resolved) {
      if (dor_clubs.length === 0 && live_clubs.length === 0) {
        return <View />;
      } else {
        return (
          <FlatList
            data={_.uniqBy(dor_clubs, 'club_id')}
            renderItem={renderDorItem}
            keyExtractor={item => item.club_id}
            ListHeaderComponent={<RenderLive />}
            ListFooterComponent={<BannerToPushToStartClub />}
            style={{
              backgroundColor: theme.colors.off_light,
              flex: 1,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            // refreshing={refreshing}
            // onRefresh={onRefresh}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#333333"
              />
            }
          />
        );
      }
    } else {
      return <PreLoadDorClubs />;
    }
  }

  return <RenderClubsHere />;
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
  overall_view: {flex: 1, overflow: 'visible'},
});
