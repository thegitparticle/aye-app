import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {Avatar, Icon, Header} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function FirstBlock(props) {
  return (
    <View style={styles.first_block_view}>
      <Avatar
        rounded
        source={{
          //uri: myprofiledetails.MyProfileReducer.myprofile.displayurl,
          uri:
            'https://www.hawtcelebs.com/wp-content/uploads/2019/12/camila-cabello-in-reve-magazine-december-2019-january-2020-0.jpg',
        }}
        size={windowHeight * 0.15}
      />
      <Text style={styles.first_view_name}>Jessie Lee</Text>
      <Text style={styles.first_view_username}>nothatlee</Text>
      <Text style={styles.first_view_frames_count}>901 . Level 1</Text>
    </View>
  );
}

function SecondBlock(props) {
  return (
    <View style={styles.second_block_view}>
      <View style={styles.show_case_clubs_view}>
        <View style={styles.clubs_icon_view_wrap}>
          <Image
            source={require('/Users/san/Desktop/toastgo/assets/house_closed_color1.png')}
            style={styles.clubs_icon}
          />
        </View>
        <Text style={styles.clubs_count_text}>5</Text>
      </View>
      <View style={styles.show_case_circle_view}>
        <View style={styles.circle_icon_view_wrap}>
          <Image
            source={require('/Users/san/Desktop/toastgo/assets/people_closed_color1.png')}
            style={styles.circle_icon}
          />
        </View>
        <Text style={styles.circle_count_text}>53</Text>
      </View>
    </View>
  );
}

const OtherProfile = () => {
  return (
    <View style={styles.containerview}>
      <FirstBlock />

      <SecondBlock />
    </View>
  );
};

const styles = StyleSheet.create({
  top_blocks: {
    justifyContent: 'space-between',
  },
  containerview: {
    flex: 0.5,
    flexDirection: 'column',
    marginVertical: windowHeight * 0.1,

    // justifyContent: 'space-around',
  },
  icon_view: {
    flexDirection: 'row-reverse',
    alignContent: 'center',
  },

  first_block_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: windowHeight * 0.25,
  },
  first_view_name: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 25,
    color: '#121c2b',
  },
  first_view_username: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#121c2b80',
  },
  first_view_frames_count: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 15,
    color: '#7D4DF9',
  },
  second_block_view: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.05,
    marginHorizontal: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: windowWidth * 0.9,
  },
  show_case_clubs_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.11,
  },
  show_case_circle_view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.11,
  },
  clubs_icon_view_wrap: {
    backgroundColor: '#F9DDE3',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  circle_icon_view_wrap: {
    backgroundColor: '#D8ECFC',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  clubs_icon: {
    width: 30,
    height: 32,
  },
  circle_icon: {
    height: 30,
    width: 42,
  },
  clubs_count_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 25,
    color: '#FF4E4D',
  },
  circle_count_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 25,
    color: '#008DFF',
  },
});

export default OtherProfile;
