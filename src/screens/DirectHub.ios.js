import React, {useEffect} from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ListItem,
  Button,
  Avatar,
  Header,
  Icon,
  Divider,
} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetClubHubDetails} from '../redux/ClubHubActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var statehere = {};

function DirectHub({dispatch, navigation}) {
  useEffect(() => {
    dispatch(GetClubHubDetails());
  }, [dispatch]);

  function LeftHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#fff"
        name="layers"
        onPress={() => navigation.navigate('ConvFramesList')}
      />
    );
  }

  function RightHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#fff"
        name="chevron-down"
        onPress={() => navigation.navigate('Clubs')}
      />
    );
  }

  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>Evan Speigel</Text>
        <View style={styles.center_header_people_view}>
          <Image
            style={styles.center_header_people_image}
            source={{
              uri: 'https://robohash.org/aliquidmaximedolor.png',
            }}
          />
          <Image
            style={styles.center_header_people_image}
            source={{
              uri: 'https://robohash.org/itaquefacilisinventore.jpg',
            }}
          />
          <Image
            style={styles.center_header_people_image}
            source={{
              uri: 'https://robohash.org/minusquisdolor.jpg',
            }}
          />
          <Image
            style={styles.center_header_people_image}
            source={{
              uri: 'https://robohash.org/idinrepellendus.png',
            }}
          />
          <Image
            style={styles.center_header_people_image}
            source={{
              uri: 'https://robohash.org/illumoptiomolestias.jpg',
            }}
          />
        </View>
      </View>
    );
  }

  function MetricsOfConversation(props) {
    return (
      <View style={styles.metrics_of_conv_view}>
        <Text style={styles.metrics_of_conv_text}>
          {props.FramesCount} <Text style={{fontSize: 25}}>🖼</Text>
        </Text>
      </View>
    );
  }

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

  function OtherProfile(props) {
    return (
      <View style={styles.other_profile_view}>
        <FirstBlock />

        <SecondBlock />
      </View>
    );
  }

  var details = statehere.ClubHubDetailsReducer.clubhubdetails;

  return (
    <View style={styles.containerview}>
      <Header
        backgroundColor="#050505"
        containerStyle={styles.header_container}
        barStyle="light-content">
        <LeftHeaderComponent />
        <CenterHeaderComponent />
        <RightHeaderComponent />
      </Header>
      <View style={styles.body_view}>
        <MetricsOfConversation FramesCount={details.framecount} />
        <Divider style={styles.between_divider} />
        <OtherProfile />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  statehere = state;
  return statehere;
};

export default connect(mapStateToProps)(DirectHub);

const styles = StyleSheet.create({
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
  containerview: {
    backgroundColor: '#f6f6f6',
    flex: 1,
  },
  exitbutton: {
    width: windowWidth * 0.33,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#ea4359',
  },
  exitbuttoncontainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  exitbuttontitle: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 13,
    textAlign: 'center',
    color: '#ffffff',
  },
  membername: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
    textAlign: 'left',
    color: '#000000',
  },
  memberusername: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
    textAlign: 'left',
    color: '#00000070',
  },
  memberslistscrollview: {
    width: windowWidth * 0.95,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignSelf: 'center',
  },
  body_view: {
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },

  metrics_of_conv_view: {
    marginVertical: windowHeight * 0.03,
    alignItems: 'center',
  },
  metrics_of_conv_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 30,
    color: '#7D4DF9',
  },

  framethumbnail: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },

  header_container: {borderBottomWidth: 0},
  center_header_view: {flexDirection: 'column'},
  center_header_club_name: {
    color: '#fff',
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
  },
  center_header_people_view: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  center_header_people_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  between_divider: {
    height: 1,
    alignSelf: 'center',
    width: windowWidth * 0.8,
    backgroundColor: '#e1e8ee',
    marginVertical: 20,
  },
});
