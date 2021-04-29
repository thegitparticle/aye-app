import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  PermissionsAndroid,
  TextInput,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import {ListItem, Button, Avatar, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyCircle} from '../redux/MyCircleActions';
//import {getMyContacts} from '../redux/MyContactsActions';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view-tgp';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function StartClub({dispatch, navigation}) {
  const [grabedContacts, setGrabedContacts] = useState();

  const [showNameScreen, setShowNameScreen] = useState('friends');

  async function GrabContacts() {
    const contacts_here = await Contacts.getAll();
    setGrabedContacts(contacts_here);

    //const data = new FormData();

    var data2 = {};
    //data2.country_code = 'IN';
    //data2.contacts_list = JSON.stringify(contacts_here);
    data2.contact_list = contacts_here;
    data2.contact_list.push({country_code: 'IN'});

    //data.append('contact_list', contacts_here);
    //data.append('country_code', 'IN');

    var config = {
      method: 'put',
      url:
        'https://apisayepirates.life/api/users/post_contacts_to_server/' +
        String(mystatehere.MyProfileReducer.myprofile.user.id) +
        '/',
      data: data2,
    };
    axios(config)
      //.then(() => dispatch(GetMyProfile(phone)))
      .catch(err => console.log(err));
  }
  useEffect(() => {
    dispatch(GetMyCircle(mystatehere.MyProfileReducer.myprofile.user.id));
    GrabContacts();
  }, [dispatch]);

  //console.log(grabedContacts);

  var AddFriendsList = [];

  function SelectCircleItem(id) {
    AddFriendsList.push(id);
    console.log(AddFriendsList);
  }

  function DeSelectCircleItem(id) {
    AddFriendsList = AddFriendsList.filter(item => item !== id);
  }

  function RenderCircleItem(props) {
    const [added, setAdded] = useState(false);
    if (added) {
      return (
        <Pressable
          style={styles.circle_item_pressable_view}
          onPress={() => {
            DeSelectCircleItem(props.ID);
            setAdded(false);
          }}>
          <Icon
            name="checkcircle"
            type="ant-design"
            color="#36B37E"
            style={styles.circle_item_icon}
          />
          <Avatar
            rounded
            source={{uri: props.Avatar}}
            size={windowHeight * 0.06}
          />
          <Text style={styles.circle_item_selected_text}>{props.Name}</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          style={styles.circle_item_pressable_view}
          onPress={() => {
            SelectCircleItem(props.ID);
            setAdded(true);
          }}>
          <Icon
            name="circle"
            type="entypo"
            color="#131313"
            style={styles.circle_item_icon}
          />
          <Avatar
            rounded
            source={{uri: props.Avatar}}
            size={windowHeight * 0.06}
          />
          <Text style={styles.circle_item_not_selected_text}>{props.Name}</Text>
        </Pressable>
      );
    }
  }

  var AddContactsList = [];

  function SelectContactItem(id) {
    AddContactsList.push(id);
  }

  function DeSelectContactItem(id) {
    AddContactsList = AddContactsList.filter(item => item !== id);
  }

  function RenderContactItem(props) {
    const [added, setAdded] = useState(false);

    if (added) {
      return (
        <Pressable
          style={styles.contact_item_pressable_view}
          onPress={() => {
            DeSelectContactItem(props.ID);
            setAdded(false);
          }}>
          <Icon
            name="checkcircle"
            type="ant-design"
            color="#36B37E"
            style={styles.contact_item_icon}
          />
          <Avatar
            rounded
            source={{uri: props.Avatar}}
            size={windowHeight * 0.06}
          />
          <Text style={styles.contact_item_selected_text}>{props.Name}</Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          style={styles.contact_item_pressable_view}
          onPress={() => {
            SelectContactItem(props.ID);
            setAdded(true);
          }}>
          <Icon
            name="circle"
            type="entypo"
            color="#131313"
            style={styles.contact_item_icon}
          />
          <Avatar
            rounded
            source={{uri: props.Avatar}}
            size={windowHeight * 0.06}
          />
          <Text style={styles.contact_item_not_selected_text}>
            {props.Name}
          </Text>
        </Pressable>
      );
    }
  }

  function CircleNew() {
    return (
      <FlatList
        data={mystatehere.MyCircleReducer.mycircle}
        renderItem={({item}) => (
          <RenderCircleItem
            Name={item.name}
            ID={item.userid}
            Avatar={item.displaypic}
          />
        )}
        keyExtractor={item => item.userid}
      />
    );
  }

  function ContactsNew() {
    return (
      <FlatList
        //data={mystatehere.MyContactsReducer.mycontacts}
        data={grabedContacts}
        renderItem={({item}) => (
          <RenderContactItem
            Name={item.givenName + item.familyName}
            ID={item.userid}
            //Avatar={item.displaypic}
          />
        )}
        keyExtractor={item => item.phoneNumbers}
      />
    );
  }

  const [finalAddFriends, setFinalAddFriends] = useState([]);

  const [finalAddContacts, setFinalAddContacts] = useState([]);

  function HandleNextButtonCircle() {
    setFinalAddFriends(AddFriendsList);
    setShowNameScreen('contacts');
  }

  function HandleNextButtonContacts() {
    setFinalAddContacts(AddContactsList);
    setShowNameScreen('name');
  }

  function FriendsChooseScreen() {
    return (
      <View style={{flex: 1, marginVertical: 10}}>
        <CircleNew />
        <Button
          icon={
            <Icon name="arrow-right" size={25} color="white" type="feather" />
          }
          size={25}
          buttonStyle={styles.NextButton}
          titleStyle={styles.NextButtonLabel}
          containerStyle={styles.NextButtonContainer}
          onPress={() => HandleNextButtonCircle()}
        />
      </View>
    );
  }

  function ContactsChooseScreen() {
    return (
      <View style={{flex: 1, marginVertical: 10}}>
        <ContactsNew />
        <Button
          icon={
            <Icon name="arrow-right" size={25} color="white" type="feather" />
          }
          size={25}
          buttonStyle={styles.NextButton}
          titleStyle={styles.NextButtonLabel}
          containerStyle={styles.NextButtonContainer}
          onPress={() => HandleNextButtonContacts()}
        />
      </View>
    );
  }

  function AddFriendsToClubServerWork(friends_list, club_id) {
    // https://apisayepirates.life/api/users/add_users_to_club/<int:user_id>/<int:club_id>/

    if (friends_list.length > 0) {
      _.forEach(friends_list, function (value) {
        axios
          .get(
            'https://apisayepirates.life/api/users/add_users_to_club/' +
              String(value) +
              '/' +
              String(club_id) +
              '/',
          )
          .catch(err => console.log(err));
      });
    }
  }

  function AddContactsToClubServerWork(contacts_list, club_id) {
    // https://apisayepirates.life/api/users/send_invite_via_sms/<str:phone>/<int:user_id>/
    // https://apisayepirates.life/api/add_invited_user/<str:phone>/<int:club_id>/

    if (contacts_list.length > 0) {
      _.forEach(contacts_list, function (value) {
        axios
          .get(
            'https://apisayepirates.life/api/add_invited_user/' +
              value +
              '/' +
              String(club_id) +
              '/',
          )
          .catch(err => console.log(err));
        axios
          .get(
            'https://apisayepirates.life/api/users/send_invite_via_sms' +
              value +
              '/' +
              String(mystatehere.MyProfileReducer.myprofile.user.id) +
              '/',
          )
          .catch(err => console.log(err));
      });
    }
  }

  function StartClubName() {
    const [clubName, setClubName] = useState('');
    console.log(finalAddFriends);
    console.log(finalAddContacts);

    function HandleStartClubButtonPress() {
      if (clubName.length > 3) {
        if (finalAddFriends.length > 0 || finalAddContacts.length > 0) {
          var config = {
            method: 'post',
            url: 'https://apisayepirates.life/api/clubs/create_club/',
            headers: {'content-type': 'application/json'},
            data: {
              name: clubName,
              members: mystatehere.MyProfileReducer.myprofile.user.id,
              admin_leader: mystatehere.MyProfileReducer.myprofile.user.id,
            },
          };

          axios(config)
            .then(response => {
              AddFriendsToClubServerWork(finalAddFriends, response.club_id);
              AddContactsToClubServerWork(finalAddContacts, response.club_id);
            })
            .then(() => navigation.goBack())

            .catch(error => console.log(error));
        } else {
          setShowNameScreen('friends');
        }
      }
    }

    return (
      <View style={styles.containerview_name_input}>
        <TextInput
          placeholder="Club Name"
          placeholderTextColor="#bdc2d9"
          style={styles.inputcontainerview_name_input}
          textAlign="center"
          maxLength={15}
          onChangeText={text => setClubName(text)}
        />
        <Button
          title="START"
          buttonStyle={styles.startbutton_name_input}
          titleStyle={styles.buttontitle_name_input}
          onPress={() => HandleStartClubButtonPress()}
        />
      </View>
    );
  }

  if (showNameScreen === 'friends') {
    return (
      <SafeAreaView style={styles.containerview}>
        <FriendsChooseScreen />
      </SafeAreaView>
    );
  } else if (showNameScreen === 'contacts') {
    return (
      <SafeAreaView style={styles.containerview}>
        <ContactsChooseScreen />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.containerview}>
        <StartClubName />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  mystatehere = state;
  return mystatehere;
};

export default connect(mapStateToProps)(StartClub);

const styles = StyleSheet.create({
  circle_item_pressable_view: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    width: windowWidth * 0.8,
    marginVertical: 10,
  },

  circle_item_selected_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#05050525',
    marginHorizontal: windowWidth * 0.05,
  },

  circle_item_not_selected_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#050505',
    marginHorizontal: windowWidth * 0.05,
  },
  circle_item_icon: {
    marginRight: windowWidth * 0.05,
  },

  contact_item_pressable_view: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    width: windowWidth * 0.8,
    marginVertical: 10,
  },

  contact_item_selected_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#05050525',
    marginHorizontal: windowWidth * 0.05,
  },

  contact_item_not_selected_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#050505',
    marginHorizontal: windowWidth * 0.05,
  },
  contact_item_icon: {
    marginRight: windowWidth * 0.05,
  },

  containerview_name_input: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputcontainerview_name_input: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f8',
    marginBottom: windowHeight * 0.03,
    fontSize: 21,
    fontFamily: 'GothamRounded-Medium',
  },

  startbutton_name_input: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.05,
    borderRadius: 10,
    backgroundColor: '#3f9ffe',
  },

  buttontitle_name_input: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
  },
  overallContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  TabBarStyles: {
    backgroundColor: '#3f9ffe',
    borderRadius: 13,
    marginHorizontal: windowWidth * 0.04,
  },
  TabBarLabel: {fontFamily: 'GothamRounded-Bold', fontSize: 15},
  containerview: {
    backgroundColor: '#fff',
    flex: 1,
  },
  ListItemContainer: {
    marginVertical: 0,
  },

  NextButtonContainer: {
    position: 'absolute',
    marginTop: windowHeight * 0.8,
    alignSelf: 'center',
  },

  NextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3f9ffe',
  },

  NextButtonLabel: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 35,
  },

  Heading2: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    marginBottom: 5,
    color: '#151515',
  },
  plaintext: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
    marginTop: 5,
    color: '#151515',
  },

  AddButton: {
    backgroundColor: '#3f9ffe',
    borderRadius: 10,
  },
  AddButtonContainer: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.033,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonTitle: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 13,
    color: '#fff',
  },
});
