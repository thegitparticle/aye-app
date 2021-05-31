import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Badge} from 'react-native-elements';
import OnePersonLiveClub from '../uibits/OnePersonLiveClub';
import TwoPeopleLiveClub from '../uibits/TwoPeopleLiveClubs';
import ThreePeopleLiveClub from '../uibits/ThreePeopleLiveClubs';
import _ from 'lodash';

function LiveClubComponent(props) {
  var club_details = props.Club;
  var live_members = props.LiveMembers;
  var numberofpeople = live_members.length - 1;

  var all_members = club_details.display_photos;

  if (numberofpeople === 3) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return <ThreePeopleLiveClub URLList={imageslist} />;
  } else if (numberofpeople === 1) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return <OnePersonLiveClub URLList={imageslist} />;
  } else if (numberofpeople === 2) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
    });
    return <TwoPeopleLiveClub URLList={imageslist} />;
  } else if (numberofpeople > 3) {
    var imageslist = [];

    _.forEach(live_members, function (value, key) {
      if (value.user_id !== props.UserID) {
        imageslist.push(value.display_pic);
      } else {
      }
      /*
      var id_here = Number(value.uuid);
      for (var i = 0; i < 2; i++) {
        if (id_here === all_members[i].user_id) {
          imageslist.push(all_members[i].display_pic);
        }
      }
      */
    });
    var ifmore = numberofpeople - 3;
    console.log(numberofpeople);
    console.log(ifmore + 'fi more');
    return (
      <View>
        <ThreePeopleLiveClub URLList={imageslist} />
        <Badge
          value={`+${ifmore}`}
          badgeStyle={styles.extracountbadge}
          textStyle={styles.extracountbadgetext}
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
    return <OnePersonLiveClub URLList={imageslist} />;
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
  extracountbadgetext: {fontFamily: 'GothamRounded-Bold', fontSize: 18},
});
