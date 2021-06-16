/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  Pressable,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {
  Avatar,
  Header,
  Icon,
  Button,
  Overlay,
  CheckBox,
} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {BlurView} from '@react-native-community/blur';
import {MixpanelContext} from '../pnstuff/MixPanelStuff';

const header_color = 'transparent';
const header_bar_style = 'dark-content';
const font_color_header = '#050505';
const header_back_image = '/Users/san/Desktop/toastgo/assets/3.jpeg';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var statehere = {};

function DirectHub({dispatch, navigation, route}) {
  const {other_name, direct_id} = route.params;
  var all_ids = _.split(direct_id, '_');

  var current_user = statehere.MyProfileReducer.myprofile.user.id;
  const [otherUser, setOtherUser] = useState('0');
  const [resolved, setResolved] = useState(false);
  const [otherDetails, setOtherDetails] = useState();

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Direct Hub');
  }, []);

  useEffect(() => {
    if (all_ids[0] === String(current_user)) {
      setOtherUser(all_ids[1]);
    } else {
      setOtherUser(all_ids[0]);
    }
  }, [all_ids]);

  function LeftHeaderComponent() {
    return (
      <Pressable
        style={{width: 75, height: 35}}
        onPress={() => navigation.goBack()}>
        <Icon type="feather" color={font_color_header} name="layers" />
      </Pressable>
    );
  }

  function RightHeaderComponent() {
    return (
      <Pressable
        style={{width: 75, height: 35}}
        onPress={() => navigation.navigate('Here')}>
        <Icon type="feather" color={font_color_header} name="chevron-down" />
      </Pressable>
    );
  }

  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {other_name.substring(0, 14)}
        </Text>
        <View style={styles.center_header_people_view}>
          {[].map(item => (
            <Image
              style={styles.center_header_people_image}
              source={{
                uri: 'https://robohash.org/aliquidmaximedolor.png',
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  var res = [];

  useEffect(() => {
    axios
      .get(
        'https://apisayepirates.life/api/users/profile-update/?id=&user=' +
          otherUser,
      )

      .then(response => (res = response.data))
      .then(response => console.log(response))
      .then(() => setOtherDetails(res))
      .then(() => setResolved(true))
      .catch(err => {
        console.log(err);
      });
  }, [otherUser]);

  function FirstBlockDummy(props) {
    return (
      <View style={styles.first_block_view}>
        <ContentLoader
          speed={2}
          width={200}
          height={200}
          viewBox="0 0 200 200"
          backgroundColor="#e57676"
          foregroundColor="#545cd4"
          {...props}>
          <Circle cx="87" cy="71" r="49" />
          <Rect x="61" y="160" rx="5" ry="5" width="53" height="13" />
          <Rect x="48" y="139" rx="5" ry="5" width="85" height="11" />
        </ContentLoader>
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

  function FirstBlock(props) {
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

  const [blockOverlayVisible, setBlockOverlayVisible] = useState(false);

  const toggleBlockOverlay = () => {
    setBlockOverlayVisible(false);
  };

  const [abuse, setAbuse] = useState(false);
  const [spam, setSpam] = useState(false);
  const [bae, setBae] = useState(false);
  const [ex, setEx] = useState(false);

  function BlockOrReportOverlay() {
    return (
      <View style={styles.block_overlay_view}>
        <Text style={styles.block_confirm_question}>Why So?</Text>
        <CheckBox
          title="Abuse"
          textStyle={styles.checkbox_text}
          containerStyle={styles.checkbox_container}
          checked={abuse}
          onPress={() => setAbuse(!abuse)}
        />
        <CheckBox
          title="Spam"
          textStyle={styles.checkbox_text}
          containerStyle={styles.checkbox_container}
          checked={spam}
          onPress={() => setSpam(!spam)}
        />

        <CheckBox
          title="Angry BAE blocking"
          textStyle={styles.checkbox_text}
          containerStyle={styles.checkbox_container}
          checked={bae}
          onPress={() => setBae(!bae)}
        />
        <CheckBox
          title="Ex"
          textStyle={styles.checkbox_text}
          containerStyle={styles.checkbox_container}
          checked={ex}
          onPress={() => setEx(!ex)}
        />
        <View style={styles.block_overlay_button_wrap}>
          <Button
            type="outline"
            title="BLOCK"
            titleStyle={styles.re_confirm_yes_text}
            buttonStyle={styles.block_yes_button}
            onPress={() => {
              axios
                .get(
                  'https://apisayepirates.life/api/users/block_user/' +
                    String(current_user) +
                    '/' +
                    otherUser +
                    '/',
                )
                .then(() => navigation.navigate('Here'))

                .then(() => toggleBlockOverlay())
                .catch(err => console.log(err));
            }}
          />
          <Button
            type="outline"
            title="NO"
            titleStyle={styles.re_confirm_no_text}
            buttonStyle={styles.block_no_button}
            onPress={() => toggleBlockOverlay()}
          />
        </View>
      </View>
    );
  }

  function BlockOrReport() {
    return (
      <Pressable
        onPress={() => setBlockOverlayVisible(true)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          height: windowHeight * 0.05,
          width: windowWidth * 0.8,
          backgroundColor: '#EC193E25',
          marginVertical: windowHeight * 0.02,
        }}>
        <Text
          style={{
            fontFamily: 'GothamRounded-Bold',
            fontSize: 15,
            color: '#EC193E',
          }}>
          Block
        </Text>
      </Pressable>
    );
  }

  function RenderFinal() {
    if (!resolved) {
      return (
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            flex: 1,
          }}>
          <View>
            <FirstBlockDummy />
            <SecondBlockDummy />
          </View>
          <BlockOrReport />
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}>
          <View>
            <FirstBlock />
            <SecondBlock />
          </View>
          <BlockOrReport />
        </View>
      );
    }
  }

  function OtherProfile(props) {
    return (
      <View style={styles.other_profile_view}>
        <RenderFinal />
      </View>
    );
  }

  var details = statehere.ClubHubDetailsReducer.clubhubdetails;

  return (
    <View style={styles.containerview}>
      <View>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: windowWidth,
            height: 100,
          }}
          source={require(header_back_image)}
        />
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: windowWidth,
            height: 100,
          }}
          blurType="light"
          blurAmount={50}
          reducedTransparencyFallbackColor="blue"
        />
        <Header
          backgroundColor={header_color}
          containerStyle={styles.header_container}
          barStyle={header_bar_style}>
          <LeftHeaderComponent />
          <CenterHeaderComponent />
          <RightHeaderComponent />
        </Header>
      </View>
      <View style={styles.body_view}>
        <OtherProfile />
      </View>
      <Overlay
        isVisible={blockOverlayVisible}
        onBackdropPress={toggleBlockOverlay}
        overlayStyle={styles.block_overlay_style}>
        <BlockOrReportOverlay />
      </Overlay>
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
    backgroundColor: '#7D4DF925',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  clubs_icon: {
    width: 24,
    height: 25.6,
  },
  circle_icon: {
    height: 24,
    width: 33.6,
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
  containerview: {
    backgroundColor: '#FFFFFF',
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
    marginVertical: 20,
    //justifyContent: 'center',
    flex: 1,
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
    //color: '#050505',
    color: font_color_header,
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    textAlign: 'center',
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

  block_overlay_style: {
    height: windowHeight * 0.5,
    width: windowWidth * 0.8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  block_overlay_button_wrap: {
    flexDirection: 'row',
  },

  block_no_button: {
    width: windowWidth * 0.4,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  block_yes_button: {
    width: windowWidth * 0.4,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  block_overlay_view: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: windowHeight * 0.5,
  },

  block_confirm_question: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: '#050505',
    marginTop: 15,
  },

  re_confirm_yes_text: {
    color: '#ec193e',
    fontFamily: 'GothamRounded-Medium',
  },
  re_confirm_no_text: {
    color: '#36B37E',
    fontFamily: 'GothamRounded-Medium',
  },
  checkbox_text: {
    color: '#050505',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  checkbox_container: {
    width: windowWidth * 0.6,
    justifyContent: 'center',
  },
});
