import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Header} from 'react-native-elements';
import BackChevronDownIcon from '../uibits/BackChevronDownIcon';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function FirstBlock(props) {
  console.log(props.DPLink);
  return (
    <View style={styles.first_block_view}>
      <Avatar
        rounded
        source={{
          //uri: myprofiledetails.MyProfileReducer.myprofile.displayurl,
          uri: props.DPLink,
        }}
        size={windowHeight * 0.15}
      />
      <Text style={styles.first_view_name}>{props.Name}</Text>
      <Text style={styles.first_view_username}>{props.UserName}</Text>
      <Text style={styles.first_view_frames_count}>
        {props.FrameCount} . Level 1
      </Text>
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
        <Text style={styles.clubs_count_text}>{props.ClubsCount}</Text>
      </View>
      <View style={styles.show_case_circle_view}>
        <View style={styles.circle_icon_view_wrap}>
          <Image
            source={require('/Users/san/Desktop/toastgo/assets/people_closed_color1.png')}
            style={styles.circle_icon}
          />
        </View>
        <Text style={styles.circle_count_text}>{props.CircleCount}</Text>
      </View>
    </View>
  );
}
function MyProfileComponent(props) {
  return (
    <View style={styles.containerview}>
      <Header
        rightComponent={<BackChevronDownIcon />}
        backgroundColor="#fafafa"
      />
      <View style={styles.body_view}>
        <View style={styles.top_blocks}>
          <FirstBlock
            DPLink={props.Profile.image}
            Name={props.Profile.user.full_name}
            UserName={props.Profile.user.username}
            FrameCount={props.Profile.framescount}
          />

          <SecondBlock
            ClubsCount={props.Profile.user.number_of_clubs_joined}
            CircleCount={props.Profile.circle}
          />
        </View>
      </View>
    </View>
  );
}

export default MyProfileComponent;

const styles = StyleSheet.create({
  top_blocks: {
    justifyContent: 'space-between',
  },
  containerview: {
    //backgroundColor: '#f1f4f8',
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'space-between',
  },

  body_view: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: windowHeight * 0.9,
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
