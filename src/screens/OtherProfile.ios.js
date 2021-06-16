import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {Avatar, Icon, Header} from 'react-native-elements';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function OtherProfile({navigation, route}) {
  const other_user_id = route.params;

  const [otherDetails, setOtherDetails] = useState({});
  //console.log(otherDetails[0]);
  const [resolved, setResolved] = useState(false);
  //console.log(resolved);

  //https://run.mocky.io/v3/880d3351-cb7c-435c-bf3a-4d6b25c31b8d

  var res = [];

  useEffect(() => {
    axios
      //.get('https://run.mocky.io/v3/44922ed3-cc90-454c-bfab-2ba4b1df4cd0')
      .get(
        'https://apisayepirates.life/api/users/profile-update/?id=&user=' +
          String(other_user_id.other_user_id),
      )

      .then(response => (res = response.data))
      .then(response => console.log(response))
      .then(() => setOtherDetails(res))
      .then(() => setResolved(true))
      .catch(err => {
        console.log(err);
      });
  }, []);

  function FirstBlockDummy(props) {
    return (
      <View style={styles.first_block_view}>
        <Avatar
          rounded
          size={windowHeight * 0.15}
          containerStyle={{backgroundColor: 'aliceblue'}}
        />
        <Text style={styles.first_view_name}>loading...</Text>
        <Text style={styles.first_view_username}>loading...</Text>
        <Text style={styles.first_view_frames_count}>00 . Level 0</Text>
      </View>
    );
  }

  function SecondBlockDummy(props) {
    return (
      <View style={styles.second_block_view}>
        <View style={styles.show_case_clubs_view}>
          <View style={styles.clubs_icon_view_wrap}>
            <Image
              source={require('/Users/san/Desktop/toastgo/assets/house_closed_color1.png')}
              style={styles.clubs_icon}
            />
          </View>
          <Text style={styles.clubs_count_text}>0</Text>
        </View>
        <View style={styles.show_case_circle_view}>
          <View style={styles.circle_icon_view_wrap}>
            <Icon type="feather" name="layers" color="#7D4DF9" size={32} />
          </View>
          <Text style={styles.circle_count_text}>0</Text>
        </View>
      </View>
    );
  }

  function FirstBlock() {
    return (
      <View style={styles.first_block_view}>
        <Avatar
          rounded
          source={{
            //uri: myprofiledetails.MyProfileReducer.myprofile.displayurl,
            uri: otherDetails[0].image,
          }}
          size={windowHeight * 0.15}
        />
        <Text style={styles.first_view_name}>
          {otherDetails[0].user.full_name}
        </Text>
        <Text style={styles.first_view_username}>
          {otherDetails[0].user.username}
        </Text>
      </View>
    );
  }

  function SecondBlock() {
    return (
      <View style={styles.second_block_view}>
        <View style={styles.show_case_clubs_view}>
          <View style={styles.clubs_icon_view_wrap}>
            <Image
              source={require('/Users/san/Desktop/toastgo/assets/house_closed_color1.png')}
              style={styles.clubs_icon}
            />
          </View>
          <Text style={styles.clubs_count_text}>
            {otherDetails[0].user.number_of_clubs_joined}
          </Text>
        </View>
        <View style={styles.show_case_circle_view}>
          <View style={styles.circle_icon_view_wrap}>
            <Icon type="feather" name="layers" color="#7D4DF9" size={32} />
          </View>
          <Text style={styles.circle_count_text}>
            {otherDetails[0].user.total_frames_participation}
          </Text>
        </View>
      </View>
    );
  }

  if (!resolved) {
    return (
      <View style={styles.containerview}>
        <FirstBlockDummy />
        <SecondBlockDummy />
      </View>
    );
  } else {
    return (
      <View style={styles.containerview}>
        <FirstBlock />
        <SecondBlock />
      </View>
    );
  }
}

export default OtherProfile;

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
    backgroundColor: '#7D4DF925',
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
    color: '#7D4DF9',
  },
});
