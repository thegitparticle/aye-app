import React, {useEffect, useRef} from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {Badge} from 'react-native-elements';
import OnePersonLiveClub from '../uibits/OnePersonLiveClub';
import TwoPeopleLiveClub from '../uibits/TwoPeopleLiveClubs';
import ThreePeopleLiveClub from '../uibits/ThreePeopleLiveClubs';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function LiveClubComponent(props) {
  var club_details = props.Club;
  var imageslist = club_details.display_photos;
  var numberofpeople = 1;
  if (numberofpeople === 3) {
    return <ThreePeopleLiveClub URLList={imageslist} />;
  } else if (numberofpeople === 1) {
    return <OnePersonLiveClub URLList={imageslist} />;
  } else if (numberofpeople === 2) {
    return <TwoPeopleLiveClub URLList={imageslist} />;
  } else {
    return (
      <View>
        <ThreePeopleLiveClub URLList={imageslist} />
        <Badge
          value={`+${props.LiveNumber - 3}`}
          badgeStyle={styles.extracountbadge}
          textStyle={styles.extracountbadgetext}
          containerStyle={styles.extracountbadgecontainer}
        />
      </View>
    );
  }
}

export default LiveClubComponent;

const styles = StyleSheet.create({
  extracountbadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    //backgroundColor: '#333',
    backgroundColor: '#121c2b',
    borderWidth: 0,
  },
  extracountbadgecontainer: {
    marginTop: -30,
    marginLeft: 10,
  },
  extracountbadgetext: {fontFamily: 'GothamRounded-Bold', fontSize: 18},
});
