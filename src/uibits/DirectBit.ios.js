/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
// import {useNavigation} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
import {usePubNub} from 'pubnub-react';
import ThemeContext from '../themes/Theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DirectBit(props) {
  // const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();

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

  function NewMessageOrNot() {
    const last_seen = MMKV.getNumber(props.Direct.direct_channel_id);

    const [newMessages, setNewMessages] = useState(0);
    // console.log(last_seen);

    if (last_seen !== 0) {
      pubnub.messageCounts(
        {
          channels: [props.Direct.direct_channel_id],
          channelTimetokens: [String(last_seen * 10000000)],
        },
        (status, results) => {
          if (results) {
            var more_messages =
              results.channels[props.Direct.direct_channel_id];
            setNewMessages(more_messages);
          }
        },
      );
    }

    return (
      <Badge
        badgeStyle={{
          backgroundColor: newMessages > 0 ? theme.colors.chat_prime : '',
        }}
      />
    );
  }

  return (
    <View style={styles.overall_view}>
      <View style={{flexDirection: 'row'}}>
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
      </View>
      <View
        style={{
          width: windowWidth * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <NewMessageOrNot />
      </View>
    </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
