/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  ListItem,
  Button,
  Avatar,
  Header,
  Icon,
  Overlay,
  Divider,
} from 'react-native-elements';
import {connect} from 'react-redux';
import OtherProfile from '../../OtherProfile/screens/OtherProfile';
import {useFocusEffect} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {BlurView} from '@react-native-community/blur';
import {usePubNub} from 'pubnub-react';
import {MixpanelContext} from '../../../external/MixPanelStuff';
import Iconly from '../../../external/Iconly';
import ThemeContext from '../../../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

const header_color = 'transparent';
const header_bar_style = 'dark-content';
const font_color_header = '#050505';
const header_back_image = '/Users/san/Desktop/toastgo/assets/3.jpeg';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var statehere = {};

function ClubHub({dispatch, navigation, route}) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();
  const {club_id, club_name} = route.params;
  const [clubDetails, setClubDetails] = useState({});
  const [resolved, setResolved] = useState(false);

  const [memberChanges, setMemberChanges] = useState(false);

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Club Hub');
  }, []);

  var res = [];

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get('https://apisayepirates.life/api/clubs/' + String(club_id) + '/')
        .then(response => (res = response.data))
        .then(() => setClubDetails(res))
        .then(() => setResolved(true))
        .catch(err => {
          console.log(err);
        });
    }, [memberChanges]),
  );

  const [optionsVisible, setOptionsVisible] = useState(false);
  const [exitclubVisible, setExitClubVisible] = useState(false);
  const [removePersonVisible, setRemovePersonVisible] = useState(false);
  const [otherprofileVisible, setOtherProfileVisible] = useState(false);

  const toggleOverlay = () => {
    setExitClubVisible(false);
  };

  const toggleRemovePersonOverlay = () => {
    setRemovePersonVisible(false);
  };

  function LeftHeaderComponent() {
    return (
      <Pressable
        style={{
          width: 75,
          height: 35,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        onPress={() => navigation.navigate('ClubFramesList')}>
        <Icon type="feather" color={theme.colors.off_dark} name="layers" />
      </Pressable>
    );
  }

  function RightHeaderComponent() {
    return (
      <Pressable
        style={{
          width: 75,
          height: 35,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        onPress={() => navigation.navigate('Here')}>
        <Iconly
          name="ChevronDownBroken"
          color={theme.colors.off_dark}
          size={30}
        />
      </Pressable>
    );
  }

  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {club_name.substring(0, 13)}
        </Text>
      </View>
    );
  }

  function OtherProfileSheet() {
    return (
      <View>
        <OtherProfile />
      </View>
    );
  }

  function MetricsOfClubDummy(props) {
    return (
      <View style={styles.metrics_of_club_view}>
        <Text style={styles.metrics_of_club_text}>0</Text>
        <Icon type="feather" name="layers" color="#7D4DF9" size={16} />
      </View>
    );
  }

  function MetricsOfClub(props) {
    return (
      <View style={styles.metrics_of_club_view}>
        <Text style={styles.metrics_of_club_text}>
          {props.FramesCount} <Text style={{fontSize: 21}}>frames</Text>
        </Text>
      </View>
    );
  }

  function MembersOfClubDummy(props) {
    return (
      <View style={styles.members_of_club_view}>
        <ContentLoader
          speed={2}
          width={400}
          height={200}
          viewBox="0 0 400 200"
          backgroundColor="#e57676"
          foregroundColor="#545cd4">
          <Circle cx="58" cy="50" r="32" />
          <Rect x="128" y="56" rx="5" ry="5" width="53" height="7" />
          <Circle cx="60" cy="168" r="32" />
          <Rect x="117" y="154" rx="5" ry="5" width="181" height="10" />
          <Rect x="114" y="32" rx="5" ry="5" width="181" height="10" />
          <Rect x="129" y="183" rx="5" ry="5" width="53" height="7" />
        </ContentLoader>
      </View>
    );
  }

  const [viewProfileId, setViewProfileId] = useState();

  function MembersOfClub(props) {
    return (
      <View style={styles.members_of_club_view}>
        {props.Details.map(member => (
          <TouchableOpacity
            onPress={() => {
              onOpenMemberOptions();
              setViewProfileId(member.user_id);
            }}>
            <ListItem containerStyle={styles.members_list_item_wrap}>
              <Avatar
                rounded
                source={{uri: member.display_pic}}
                size={windowHeight * 0.07}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.membername}>
                  {member.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.memberusername}>
                  {member.username}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function ExitClub() {
    return (
      <View style={styles.exit_club_button_view_wrap}>
        <Divider style={styles.log_out_divider} />
        <Button
          raised
          type="clear"
          titleStyle={styles.exit_club_button_title_style}
          title="exit club"
          onPress={() => setExitClubVisible(true)}
        />
      </View>
    );
  }

  function ExitClubOverlay() {
    return (
      <View style={styles.exit_club_overlay_view}>
        <Text style={styles.exit_club_confirm_question}>Are you sure?</Text>
        <View style={styles.exit_club_overlay_button_wrap}>
          <Button
            type="outline"
            title="YES"
            titleStyle={styles.re_confirm_yes_text}
            buttonStyle={styles.exit_club_yes_button}
            onPress={() => {
              axios
                .get(
                  'https://apisayepirates.life/api/users/unjoin/' +
                    String(statehere.MyProfileReducer.myprofile.user.id) +
                    '/' +
                    String(club_id) +
                    '/',
                )
                .then(() => setMemberChanges())
                .then(() => {
                  var channel_id = String(club_id) + '_c';
                  pubnub.push.removeChannels(
                    {
                      channels: [channel_id],
                      device: String(
                        statehere.MyProfileReducer.myprofile.user.id,
                      ),
                      pushGateway: 'gcm', // apns, apns2, gcm
                    },
                    function (status) {
                      if (status.error) {
                        console.log('operation failed w/ error:', status);
                      } else {
                        console.log('operation done!');
                      }
                    },
                  );
                })
                .then(() => toggleOverlay())
                .catch(err => console.log(err));
            }}
          />
          <Button
            type="outline"
            title="NO"
            titleStyle={styles.re_confirm_no_text}
            buttonStyle={styles.exit_club_no_button}
            onPress={() => toggleOverlay()}
          />
        </View>
      </View>
    );
  }

  function RemovePersonOverlay() {
    return (
      <View style={styles.exit_club_overlay_view}>
        <Text style={styles.exit_club_confirm_question}>Are you sure?</Text>
        <View style={styles.exit_club_overlay_button_wrap}>
          <Button
            type="outline"
            title="YES"
            titleStyle={styles.re_confirm_yes_text}
            buttonStyle={styles.exit_club_yes_button}
            onPress={() => {
              axios
                .get(
                  'https://apisayepirates.life/api/users/unjoin/' +
                    String(viewProfileId) +
                    '/' +
                    String(club_id) +
                    '/',
                )
                .then(() => {
                  //do pubnub stuff
                  var channel_id = String(club_id) + '_c';
                  pubnub.push.removeChannels(
                    {
                      channels: [channel_id],
                      device: String(viewProfileId),
                      pushGateway: 'gcm', // apns, apns2, gcm
                    },
                    function (status) {
                      if (status.error) {
                        console.log('operation failed w/ error:', status);
                      } else {
                        console.log('operation done!');
                      }
                    },
                  );
                })
                .then(() => setMemberChanges(true))
                .then(() => toggleRemovePersonOverlay())
                .catch(err => console.log(err));
            }}
          />
          <Button
            type="outline"
            title="NO"
            titleStyle={styles.re_confirm_no_text}
            buttonStyle={styles.exit_club_no_button}
            onPress={() => toggleRemovePersonOverlay()}
          />
        </View>
      </View>
    );
  }

  function AddPeopleToClub() {
    return (
      <View style={styles.add_people_to_club_view}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('AddPeopleToClub', {club_id: club_id})
          }>
          <SquircleView
            style={{
              height: 40,
              width: windowWidth * 0.4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 10,
              fillColor: theme.colors.friends_prime,
            }}>
            <Text
              style={{...theme.text.header, color: theme.colors.full_light}}>
              add friends
            </Text>
          </SquircleView>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('InvitePeopleToClub', {club_id: club_id})
          }>
          <SquircleView
            style={{
              height: 40,
              width: windowWidth * 0.4,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: theme.colors.friends_prime,
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 10,
              fillColor: 'transparent',
            }}>
            <Text
              style={{...theme.text.header, color: theme.colors.friends_prime}}>
              invite friends
            </Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
    );
  }

  const memberOptionsModalizeRef = useRef(null);

  const onOpenMemberOptions = () => {
    memberOptionsModalizeRef.current?.open();
  };

  function MemberOptionsModalize() {
    return (
      <View style={styles.member_options_view}>
        <TouchableOpacity
          onPress={() => {
            setOptionsVisible(false);
            navigation.navigate('OtherProfile', {
              other_user_id: viewProfileId,
            });
          }}>
          <Text style={styles.view_profile_text}>view profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRemovePersonVisible(true)}>
          <Text style={styles.cancel_bottomsheet_text}>remove from club</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function RenderMainBody() {
    if (!resolved) {
      return (
        <View>
          <MetricsOfClubDummy />
          <Divider style={styles.log_out_divider} />
          <MembersOfClubDummy />
        </View>
      );
    } else {
      return (
        <View>
          <MetricsOfClub FramesCount={clubDetails.frames_total} />
          <Divider style={styles.log_out_divider} />
          <MembersOfClub Details={clubDetails.users} />
        </View>
      );
    }
  }

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
            height: 200,
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
            height: 200,
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
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={
            {
              //flexDirection: 'column',
              //justifyContent: 'space-between',
            }
          }>
          <RenderMainBody />
          <AddPeopleToClub />

          <ExitClub />
        </ScrollView>
      </View>
      <Overlay
        isVisible={exitclubVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.exit_club_overlay_style}>
        <ExitClubOverlay />
      </Overlay>

      <Overlay
        isVisible={removePersonVisible}
        onBackdropPress={toggleRemovePersonOverlay}
        overlayStyle={styles.exit_club_overlay_style}>
        <RemovePersonOverlay />
      </Overlay>

      <Overlay
        isVisible={otherprofileVisible}
        onBackdropPress={() => setOtherProfileVisible(false)}>
        <OtherProfileSheet />
      </Overlay>
      <Modalize ref={memberOptionsModalizeRef} modalHeight={windowHeight * 0.2}>
        <MemberOptionsModalize />
      </Modalize>
    </View>
  );
}

const mapStateToProps = state => {
  statehere = state;
  return statehere;
};

export default connect(mapStateToProps)(ClubHub);

const styles = StyleSheet.create({
  log_out_divider: {
    height: 1,
    alignSelf: 'center',
    width: windowWidth * 0.8,
    backgroundColor: '#e1e8ee',
    marginVertical: 20,
  },
  members_list_item_wrap: {
    //borderRadius: 15,
    backgroundColor: '#ffffff00',
  },

  exit_club_overlay_style: {
    height: 120,
    width: windowWidth * 0.8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  exit_club_overlay_button_wrap: {
    flexDirection: 'row',
  },

  exit_club_no_button: {
    width: windowWidth * 0.4,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  exit_club_yes_button: {
    width: windowWidth * 0.4,
    height: 60,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  exit_club_overlay_view: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 120,
  },

  exit_club_confirm_question: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: '#050505',
    marginTop: 15,
  },

  members_of_club_view: {
    marginVertical: windowHeight * 0.03,
    width: windowWidth * 0.95,
    borderRadius: 15,
    //shadowColor: '#000',
    //shadowOffset: {width: 0, height: 2},
    //shadowOpacity: 0.5,
    //shadowRadius: 2,

    //elevation: 2,
    backgroundColor: 'transparent',
  },

  metrics_of_club_view: {
    marginVertical: windowHeight * 0.03,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  metrics_of_club_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 30,
    color: '#7D4DF9',
    marginHorizontal: 10,
  },
  add_people_to_club_view: {
    flexDirection: 'row',
    marginVertical: 0.1,
    width: windowWidth * 0.95,
    justifyContent: 'space-around',
  },
  add_friends_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 13,
    color: '#fafafa',
  },
  add_friends_button_style: {
    height: 40,
    width: 120,
    borderRadius: 20,
    backgroundColor: '#36b37e',
  },

  invite_friends_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 13,
    color: '#fafafa',
  },
  invite_friends_button_style: {
    height: 40,
    width: 120,
    borderRadius: 20,
    backgroundColor: '#17171D',
  },

  exit_club_button_view_wrap: {
    marginHorizontal: 20,
    marginTop: windowHeight * 0.05,
    marginBottom: windowHeight * 0.01,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exit_club_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#EC193E',
  },

  re_confirm_yes_text: {
    color: '#ec193e',
    fontFamily: 'GothamRounded-Medium',
  },
  re_confirm_no_text: {
    color: '#050505',
    fontFamily: 'GothamRounded-Medium',
  },

  member_options_view: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    height: 125,
  },
  body: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerview: {
    backgroundColor: '#050505',
    justifyContent: 'space-between',
    flex: 1,
  },

  membername: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 14,
    textAlign: 'left',
    color: '#000000',
  },
  memberusername: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 12,
    textAlign: 'left',
    color: '#00000070',
  },

  addbuttonview: {
    flexDirection: 'row-reverse',
    marginHorizontal: windowWidth * 0.066,
    marginVertical: windowHeight * 0.02,
  },
  addbuttonstyle: {
    width: windowWidth * 0.33,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#3f9ffe',
  },
  addbuttontitle: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 13,
    textAlign: 'center',
    color: '#ffffff',
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

  start_talking_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#050505',
    marginHorizontal: 10,
  },
  view_profile_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#050505',
    marginHorizontal: 10,
  },
  remove_from_club_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#050505',
    marginHorizontal: 10,
  },
  cancel_bottomsheet_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#EC193E',
    marginHorizontal: 10,
  },
});
