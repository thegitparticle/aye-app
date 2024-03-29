import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Badge} from 'react-native-elements';
import OnePersonLiveClub from './OnePersonLiveClub';
import TwoPeopleLiveClub from './TwoPeopleLiveClubs';
import ThreePeopleLiveClub from './ThreePeopleLiveClubs';
import _ from 'lodash';
import ThemeContext from '../../../themes/Theme';
import {MMKV} from 'react-native-mmkv';
import {usePubNub} from 'pubnub-react';

function LiveClubComponent(props) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();
  var live_members = props.LiveMembers;
  var numberofpeople = live_members.length - 1;

  const last_seen = MMKV.getNumber(props.Club.pn_channel_id);

  const [newMessages, setNewMessages] = useState(0);

  if (last_seen !== 0) {
    pubnub.messageCounts(
      {
        channels: [props.Club.pn_channel_id],
        channelTimetokens: [String(last_seen * 10000000)],
      },
      (status, results) => {
        if (results) {
          var more_messages = results.channels[props.Club.pn_channel_id];
          setNewMessages(more_messages);
        }
      },
    );
  }

  if (numberofpeople === 3) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return (
      <ThreePeopleLiveClub URLList={imageslist} NewMessages={newMessages} />
    );
  } else if (numberofpeople === 1) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return <OnePersonLiveClub URLList={imageslist} NewMessages={newMessages} />;
  } else if (numberofpeople === 2) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return <TwoPeopleLiveClub URLList={imageslist} NewMessages={newMessages} />;
  } else if (numberofpeople > 3) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    var ifmore = numberofpeople - 3;
    return (
      <View>
        <ThreePeopleLiveClub URLList={imageslist} NewMessages={newMessages} />
        <Badge
          value={`+${ifmore}`}
          badgeStyle={styles.extracountbadge}
          textStyle={{...theme.text.header}}
          containerStyle={styles.extracountbadgecontainer}
        />
      </View>
    );
  } else {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return <OnePersonLiveClub URLList={imageslist} NewMessages={newMessages} />;
  }
}

export default LiveClubComponent;

const styles = StyleSheet.create({
  extracountbadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#121c2b',
    borderWidth: 0,
  },
  extracountbadgecontainer: {
    marginTop: -30,
    marginLeft: 10,
  },
});
