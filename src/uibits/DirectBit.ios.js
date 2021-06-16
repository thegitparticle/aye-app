import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
          <Text style={styles.subtitle_text}>frame going on</Text>
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

  if (props.Direct.direct_channel_id === '0') {
    return <View />;
  } else {
  }
  return (
    <Pressable
      style={styles.overall_view}
      onPress={() =>
        navigation.navigate('DirectInteractionScreens', {
          screen: 'DirectChatScreen',
          params: {
            otherNameHere: props.Direct.display_guys.full_name,
            //channelIdHere: props.club_id.toString() + '_c',
            directIdHere: props.Direct.direct_channel_id,
            channelOnGoing: props.Direct.ongoing_frame,
            channelStartTime: props.Direct.start_time,
            channelEndTime: props.Direct.end_time,
          },
        })
      }>
      <FastImage
        source={{uri: props.Direct.display_guys.profile_picture}}
        style={styles.avatar_of_club}
        size={68}
      />
      <View style={styles.text_block_view}>
        <Text style={styles.name_of_other_person}>
          {props.Direct.display_guys.full_name}
        </Text>

        <UnreadStatus Status={props.Direct.ongoing_frame} />
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
    width: windowWidth - 40,
    height: 60,
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
