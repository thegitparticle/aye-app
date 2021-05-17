import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

function DirectBit(props) {
  const navigation = useNavigation();
  //console.log(props.Direct);

  function UnreadStatus(props) {
    if (props.Status) {
      return (
        <View style={styles.subtitle_view}>
          <Icon
            type="feather"
            color="#7D4DF9"
            //{Platform.OS === 'ios' ? '#2dbbff' : 'rgb(109, 187, 253)'}
            name="layers"
            size={14}
          />
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

  //console.log(props.Direct);

  return (
    <Pressable
      style={styles.overall_view}
      onPress={() =>
        navigation.navigate('DirectInteractionScreens', {
          screen: 'DirectChatScreen',
          params: {
            otherNameHere: props.Direct.custom.other_user_name,
            //channelIdHere: props.club_id.toString() + '_c',
            directIdHere: props.Direct.channel.id,
            channelOnGoing: false,
            channelStartTime: null,
            channelEndTime: null,
          },
        })
      }>
      <FastImage
        source={{uri: props.Direct.custom.other_user_image}}
        style={styles.avatar_of_club}
        size={68}
      />
      <View style={styles.text_block_view}>
        <Text style={styles.name_of_other_person}>
          {props.Direct.custom.other_user_name}
        </Text>

        <UnreadStatus Status={props.Direct.on_going_frame} />
      </View>
    </Pressable>
  );
}

export default DirectBit;

const styles = StyleSheet.create({
  subtitle_view: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle_icon: {},
  subtitle_text: {
    marginLeft: 5,
    //color: Platform.OS === 'ios' ? '#2dbbff' : 'rgb(109, 187, 253)',
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
  },
  text_block_view: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  name_of_other_person: {
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
