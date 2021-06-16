import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DormantClubBit(props) {
  const navigation = useNavigation();

  function OnGoingFrameText(props) {
    if (props.Status) {
      return (
        <View style={styles.subtitle_view}>
          <Icon type="feather" color="#7D4DF9" name="layers" size={14} />
          <Text style={styles.subtitle_text}>new frame</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.subtitle_view}>
          <Icon type="feather" color="#06090e25" name="layers" size={14} />
          <Text style={styles.subtitle_text_not_new}>
            tap to start new frame
          </Text>
        </View>
      );
    }
  }

  if (props.Club.club_id === 0) {
    return <View />;
  } else {
    return (
      <Pressable
        style={styles.overall_view}
        onPress={() =>
          navigation.navigate('ClubInteractionScreens', {
            screen: 'ClubChatScreen',
            params: {
              clubNameHere: props.Club.club_name,
              channelIdHere: props.Club.pn_channel_id,
              channelOnGoing: props.Club.on_going_frame,
              channelStartTime: props.Club.start_time,
              channelEndTime: props.Club.end_time,
              clubID: props.Club.club_id,
            },
          })
        }>
        <FastImage
          source={{uri: props.Club.club_profile_pic}}
          style={styles.avatar_of_club}
          size={68}
        />
        <View style={styles.text_block_view}>
          <Text style={styles.name_of_club}>{props.Club.club_name}</Text>

          <OnGoingFrameText Status={props.Club.on_going_frame} />
        </View>
      </Pressable>
    );
  }
}

export default DormantClubBit;

const styles = StyleSheet.create({
  subtitle_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle_icon: {},
  subtitle_text: {
    marginLeft: 5,
    color: '#7D4DF9',
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
  },
  subtitle_text_not_new: {
    marginLeft: 5,
    color: '#06090e25',
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
  },
  avatar_of_club: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  overall_view: {
    flexDirection: 'row',
    marginHorizontal: 10,
    width: windowWidth - 40,
    height: 60,
  },
  text_block_view: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  name_of_club: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    marginBottom: 10,
  },
  ongoing_frame_text: {
    fontFamily: 'GothamRounded-Book',

    fontSize: 13,
    //marginHorizontal: 20,
    color: '#06090e',
  },
});
