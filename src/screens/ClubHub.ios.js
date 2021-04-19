import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ListItem,
  Button,
  Avatar,
  Header,
  Icon,
  BottomSheet,
  Overlay,
  Divider,
  ButtonGroup,
} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetClubHubDetails} from '../redux/ClubHubActions';
import OtherProfile from './OtherProfile';
//import BottomSheet from 'reanimated-bottom-sheet';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var statehere = {};

function ClubHub({dispatch, navigation, route}) {
  const {club_id, live_who, club_name} = route.params;
  const [clubDetails, setClubDetails] = useState({});
  console.log(clubDetails);
  const [resolved, setResolved] = useState(false);
  console.log(resolved);

  const [memberChanges, setMemberChanges] = useState(false);

  /*
  useEffect(() => {
    dispatch(GetClubHubDetails(club_id));
  }, [dispatch]);
*/
  var res = [];

  console.log('https://apisayepirates.life/api/clubs/' + String(club_id));

  useEffect(() => {
    axios
      .get('https://apisayepirates.life/api/clubs/' + String(club_id))

      .then(response => (res = response.data))
      .then(response => console.log(response))
      .then(() => setClubDetails(res))
      .then(() => setResolved(true))
      .catch(err => {
        console.log(err);
      });
  }, [memberChanges]);

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
      <Icon
        type="feather"
        color="#fff"
        name="layers"
        onPress={() => navigation.navigate('ClubFramesList')}
      />
    );
  }

  function RightHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#fff"
        name="chevron-down"
        onPress={() => navigation.navigate('Here')}
      />
    );
  }

  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {club_name.substring(0, 13)}
        </Text>
        <View style={styles.center_header_people_view}>
          {live_who.map(item => (
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
        <Text style={styles.metrics_of_club_text}>
          91 <Text style={{fontSize: 25}}>🖼</Text>
        </Text>
      </View>
    );
  }

  function MetricsOfClub(props) {
    return (
      <View style={styles.metrics_of_club_view}>
        <Text style={styles.metrics_of_club_text}>
          {props.FramesCount} <Text style={{fontSize: 25}}>🖼</Text>
        </Text>
      </View>
    );
  }

  function MembersOfClubDummy(props) {
    return (
      <View style={styles.members_of_club_view}>
        {[1, 2].map(members => (
          <TouchableOpacity onPress={() => onOpenMemberOptions()}>
            <ListItem containerStyle={styles.members_list_item_wrap}>
              <Avatar
                rounded
                source={{
                  uri:
                    'https://robohash.org/veliteaquehic.png?size=50x50&set=set1',
                }}
                size={windowHeight * 0.055}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.membername}>
                  loading...
                </ListItem.Title>
                <ListItem.Subtitle style={styles.memberusername}>
                  loading...
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const [viewProfileId, setViewProfileId] = useState();

  function MembersOfClub(props) {
    //console.log(props.Details);
    return (
      <View style={styles.members_of_club_view}>
        {props.Details.map(members => (
          <TouchableOpacity
            onPress={() => {
              onOpenMemberOptions();
              setViewProfileId(members.user_id);
            }}>
            <ListItem containerStyle={styles.members_list_item_wrap}>
              <Avatar
                rounded
                source={{uri: members.displaypic}}
                size={windowHeight * 0.055}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.membername}>
                  {members.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.memberusername}>
                  {members.username}
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
                .then(() => {
                  //do pubnub stuff
                })
                .then(() => setMemberChanges())
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
    console.log(typeof viewProfileId);
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
                })
                .then(() => setMemberChanges())
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
        <Button
          //raised
          buttonStyle={styles.add_friends_button_style}
          titleStyle={styles.add_friends_title_style}
          title="add friends"
          onPress={() =>
            navigation.navigate('AddPeopleToClub', {club_id: club_id})
          }
        />
        <Button
          // raised
          buttonStyle={styles.invite_friends_button_style}
          titleStyle={styles.invite_friends_title_style}
          title="invite friends"
          onPress={() =>
            navigation.navigate('InvitePeopleToClub', {club_id: club_id})
          }
        />
      </View>
    );
  }

  const memberOptionsModalizeRef = useRef(null);

  const onOpenMemberOptions = () => {
    memberOptionsModalizeRef.current?.open();
  };

  function MemberOptionsModalize() {
    console.log(viewProfileId + 'view profile id');
    return (
      <View style={styles.member_options_view}>
        <TouchableOpacity>
          <Text style={styles.start_talking_text}>start talking</Text>
        </TouchableOpacity>
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

  var details = statehere.ClubHubDetailsReducer.clubhubdetails;
  //console.log(details);

  /*

      <MetricsOfClub FramesCount={clubDetails.frame_total} />
          <Divider style={styles.log_out_divider} />
          <MembersOfClub Details={clubDetails.users} />

          */

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
          <MetricsOfClub FramesCount={clubDetails.frame_total} />
          <Divider style={styles.log_out_divider} />
          <MembersOfClub Details={clubDetails.users} />
        </View>
      );
    }
  }

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
      <Modalize ref={memberOptionsModalizeRef} modalHeight={windowHeight * 0.5}>
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
  },
  metrics_of_club_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 30,
    color: '#7D4DF9',
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
    height: 250,
  },
  body: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#Fafafa',
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
