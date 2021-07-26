/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ThemeContext from '../../../themes/Theme';
import {MMKV} from 'react-native-mmkv';
import {usePubNub} from 'pubnub-react';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DormantClubBit(props) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();

  function NewMessageOrNot() {
    const last_seen = MMKV.getNumber(String(props.Club.club_id) + '_c');

    const [newMessages, setNewMessages] = useState(0);

    if (last_seen !== 0) {
      pubnub.messageCounts(
        {
          channels: [String(props.Club.club_id) + '_c'],
          channelTimetokens: [String(last_seen * 10000000)],
        },
        (status, results) => {
          if (results) {
            var more_messages =
              results.channels[String(props.Club.club_id) + '_c'];
            setNewMessages(more_messages);
          }
        },
      );
    }

    if (newMessages > 0) {
      return (
        <LinearGradient
          colors={['#FF512F', '#DD2476']}
          style={{
            borderRadius: windowHeight > 770 ? 33.5 : 31,
            width: windowHeight > 770 ? 67 : 62,
            height: windowHeight > 770 ? 67 : 62,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: props.Club.club_profile_pic}}
            style={styles.avatar_of_club}
          />
        </LinearGradient>
      );
    } else {
      return (
        <FastImage
          source={{uri: props.Club.club_profile_pic}}
          style={styles.avatar_of_club}
        />
      );
    }
  }

  if (props.Club.club_id === 0) {
    return <View />;
  } else {
    return (
      <View>
        <View
          style={{
            ...styles.overall_view_under,
            backgroundColor: theme.colors.off_light,
          }}>
          <NewMessageOrNot />
          <View style={styles.text_block_view}>
            <Text
              style={{
                ...theme.text.subhead_medium,
                marginBottom: 10,
                color: theme.colors.full_dark,
              }}>
              {props.Club.club_name}
            </Text>

            <View style={styles.subtitle_view}>
              <Icon
                type="feather"
                color={theme.colors.full_dark_25}
                name="layers"
                size={12}
              />
              <Text
                style={{
                  ...theme.text.smallest,
                  color: theme.colors.full_dark_25,
                  marginLeft: 5,
                }}>
                tap to start new frame
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DormantClubBit;

const styles = StyleSheet.create({
  subtitle_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar_of_club: {
    borderRadius: windowHeight > 770 ? 30 : 27.5,
    width: windowHeight > 770 ? 60 : 55,
    height: windowHeight > 770 ? 60 : 55,
  },
  overall_view_under: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    width: windowWidth - 40,
  },
  text_block_view: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
