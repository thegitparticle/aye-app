/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {MMKV} from 'react-native-mmkv';
import {usePubNub} from 'pubnub-react';
import ThemeContext from '../../../themes/Theme';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DirectBit(props) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();

  function UnreadStatus(props) {
    if (props.Status) {
      return (
        <View style={styles.subtitle_view}>
          <Icon
            type="feather"
            color={theme.colors.chat_prime}
            name="layers"
            size={12}
          />
          <Text
            style={{
              ...theme.text.smallest,
              color: theme.colors.chat_prime,
              marginLeft: 5,
            }}>
            frame going on
          </Text>
        </View>
      );
    } else {
      return (
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
            source={{uri: props.Direct.display_guys.profile_picture}}
            style={styles.avatar_of_club}
          />
        </LinearGradient>
      );
    } else {
      return (
        <FastImage
          source={{uri: props.Direct.display_guys.profile_picture}}
          style={styles.avatar_of_club}
        />
      );
    }
  }

  return (
    <View style={styles.overall_view}>
      <View style={{flexDirection: 'row'}}>
        <NewMessageOrNot />
        <View style={styles.text_block_view}>
          <Text
            style={{
              ...theme.text.subhead_medium,
              marginBottom: 10,
            }}>
            {props.Direct.display_guys.full_name}
          </Text>
          <UnreadStatus Status={props.Direct.ongoing_frame} />
        </View>
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

  avatar_of_club: {
    borderRadius: windowHeight > 770 ? 30 : 27.5,
    width: windowHeight > 770 ? 60 : 55,
    height: windowHeight > 770 ? 60 : 55,
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
});
