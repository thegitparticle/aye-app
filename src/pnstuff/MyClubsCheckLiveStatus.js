import React, {useState, useEffect} from 'react';
import {usePubNub} from 'pubnub-react';
import _ from 'lodash';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import LiveClubComponent from '../components/LiveClubComponent';
import {ListItem, Badge, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import DormantClubBit from '../uibits/DormantClubBit';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function MyClubsCheckLiveStatus(props) {
  var club = props.Club;
  var pubnub = props.PN;
  var index = props.Index;
  var channel_id_here = club.pn_channel_id;
  const [liveClub, setLiveClub] = useState(false);
  const [liveMembers, setLiveMembers] = useState();
  const navigation = useNavigation();

  function handleHereNowResponse(response) {
    if (response) {
      if (response.totalOccupancy > 0) {
        setLiveMembers(response.channels[channel_id_here].occupants);
        setLiveClub(true);
      } else {
      }
    }
  }

  pubnub.hereNow(
    {
      channels: [channel_id_here],
      includeUUIDs: true,
      includeState: true,
    },
    (status, response) => {
      handleHereNowResponse(response);
    },
  );

  if (liveClub) {
    return (
      <ListItem
        underlayColor="transparent"
        containerStyle={
          index % 2 === 0
            ? styles.ListItemContainerEven
            : styles.ListItemContainerOdd
        }
        onPress={() =>
          navigation.navigate('ClubInteractionScreens', {
            screen: 'ClubChatScreen',
            params: {
              clubNameHere: club.club_name,
              //channelIdHere: props.club_id.toString() + '_c',
              channelIdHere: club.pn_channel_id,
              channelOnGoing: club.on_going_frame,
              channelStartTime: club.start_time,
              channelEndTime: club.end_time,
              clubID: club.club_id,
              livePeople: liveMembers,
            },
          })
        }>
        <ListItem.Content style={styles.ImagesContainer}>
          <LiveClubComponent Club={club} LiveMembers={liveMembers} />
        </ListItem.Content>
        <ListItem.Content style={styles.list_item_content}>
          <ListItem.Title style={styles.LiveClubName}>
            {club.club_name.length < 15
              ? club.club_name
              : club.club_name.substring(0, 14)}
          </ListItem.Title>
          <ListItem.Subtitle>
            <View style={styles.subtitle_view}>
              <Icon
                type="feather"
                color="#7D4DF9"
                // {Platform.OS === 'ios' ? '#2dbbff' : 'rgb(109, 187, 253)'}
                name="layers"
                size={16}
              />
              <Text style={styles.subtitle_text}>new frames</Text>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  } else {
    return <View />;
  }
}
/*
      <ListItem topDivider containerStyle={styles.list_item_container}>
        <DormantClubBit Club={club} />
      </ListItem>
*/

export default MyClubsCheckLiveStatus;

const styles = StyleSheet.create({
  list_item_content: {
    marginTop: 10,
    height: windowHeight * 0.0719 * 0.75,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  subtitle_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle_icon: {},
  subtitle_text: {
    marginLeft: 5,
    //color: Platform.OS === 'ios' ? '#2dbbff' : 'rgb(109, 187, 253)',
    color: '#7D4DF9',
    fontFamily: 'GothamRounded-Book',
    fontSize: Platform.OS === 'ios' ? 13 : 12,
  },
  ListItemContainerEven: {
    flexDirection: 'column',
    marginRight: windowWidth * 0.5,
    backgroundColor: 'transparent',
  },
  ListItemContainerOdd: {
    flexDirection: 'column',
    marginLeft: windowWidth * 0.5,
    backgroundColor: 'transparent',
  },

  LiveClubName: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    color: '#06090e',
  },
});
