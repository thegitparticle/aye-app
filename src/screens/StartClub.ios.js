/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import {
  Divider,
  Button,
  Avatar,
  Icon,
  Header,
  SearchBar,
} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyCircle} from '../redux/MyCircleActions';
import {GetMyProfile} from '../redux/MyProfileActions';
//import {getMyContacts} from '../redux/MyContactsActions';
import Contacts from 'react-native-contacts';
import axios from 'axios';
import _ from 'lodash';
import {showMessage, hideMessage} from 'react-native-flash-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Iconly from '../pnstuff/Iconly';
import ThemeContext from '../themes/Theme';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function StartClub({dispatch, navigation}) {
  const theme = useContext(ThemeContext);
  const [grabedContacts, setGrabedContacts] = useState();

  const [showNameScreen, setShowNameScreen] = useState('friends');

  async function GrabContacts() {
    const contacts_here = await Contacts.getAll();
    setGrabedContacts(contacts_here);

    var data2 = {};

    data2.contact_list = contacts_here;
    data2.contact_list.unshift({
      country_code:
        mystatehere.MyProfileReducer.myprofile.user.country_code_of_user,
    });

    var x1 = data2.contact_list;
    //console.log(x1);

    var dataf = {};
    dataf.contact_list = JSON.stringify(x1);

    var config = {
      method: 'put',
      url:
        'https://apisayepirates.life/api/users/post_contacts_to_server/' +
        String(mystatehere.MyProfileReducer.myprofile.user.id) +
        '/',
      data: dataf,
    };
    axios(config)
      //.then(response => console.log(response.data))
      .catch(err => console.log(err));
  }
  useEffect(() => {
    dispatch(GetMyCircle(mystatehere.MyProfileReducer.myprofile.user.id));
    dispatch(GetMyProfile(mystatehere.MyProfileReducer.myprofile.user.phone));
    GrabContacts();
  }, [dispatch]);

  //console.log(grabedContacts);

  var AddFriendsList = [];

  function SelectCircleItem(id) {
    AddFriendsList.push(id);
    //console.log(AddFriendsList);
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
    var number_here = String(props.PhoneItem);

    //if (number_list) {
    if (added) {
      var name_here = props.Name;
      return (
        <Pressable
          style={styles.contact_item_pressable_view}
          onPress={() => {
            DeSelectContactItem(number_here);
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
            title={name_here.charAt(0)}
            size={windowHeight * 0.06}
            containerStyle={{backgroundColor: '#ddd'}}
          />
          <Text style={styles.contact_item_selected_text}>{props.Name}</Text>
        </Pressable>
      );
    } else {
      var name_here = props.Name;
      return (
        <Pressable
          style={styles.contact_item_pressable_view}
          onPress={() => {
            SelectContactItem(number_here);
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
            title={name_here.charAt(0)}
            activeOpacity={0.5}
            size={windowHeight * 0.06}
            containerStyle={{backgroundColor: '#ddd'}}
          />
          <Text style={styles.contact_item_not_selected_text}>
            {props.Name}
          </Text>
        </Pressable>
      );
    }
    // } else {
    //  return <View />;
    //}
  }

  function CircleNew() {
    var the_list = mystatehere.MyCircleReducer.mycircle;
    var the_one = the_list[0];

    console.log(the_list);

    if (the_list.length > 0) {
      if (the_one.friend_user_id === 0) {
        return <View />;
      } else {
        return (
          <FlatList
            data={mystatehere.MyCircleReducer.mycircle}
            renderItem={({item}) => (
              <RenderCircleItem
                Name={item.name}
                ID={item.friend_user_id}
                Avatar={item.profile_pic}
              />
            )}
            keyExtractor={item => item.userid}
          />
        );
      }
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontFamily: 'GothamRounded-Medium'}}>
            We could not find any of your contacts on Aye
          </Text>
          <Text style={{fontFamily: 'GothamRounded-Medium'}}>
            Click next and invite friends onto Aye.
          </Text>
        </View>
      );
    }
  }

  function ContactsNew(props) {
    console.log(props.List);
    return (
      <FlatList
        //data={mystatehere.MyContactsReducer.mycontacts}
        data={props.List}
        renderItem={({item}) => (
          <RenderContactItem
            Name={item.name}
            Item={item}
            PhoneItem={item.phone}
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

  function HeaderTitleHere(props) {
    return (
      <View style={{width: windowWidth * 0.75}}>
        <Text style={styles.header_title}>{props.screen}</Text>
      </View>
    );
  }

  function FriendsChooseScreen() {
    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={<HeaderTitleHere screen="FRIENDS on AYE" />}
          rightComponent={
            <Pressable
              style={{width: 50, height: 30}}
              onPress={() => navigation.goBack()}>
              <Iconly
                name="ChevronDownBroken"
                color={theme.colors.off_dark}
                size={30}
              />
            </Pressable>
          }
          backgroundColor="#fafafa"
          containerStyle={styles.header_container}
        />
        <Divider style={{backgroundColor: '#05050510'}} />
        <CircleNew />
        <Pressable
          style={styles.button_view}
          onPress={() => HandleNextButtonCircle()}>
          <Iconly
            name="ArrowRightBold"
            color={theme.colors.friends_prime}
            size={50}
          />
        </Pressable>
      </View>
    );
  }

  function ContactsChooseScreen() {
    const contacts_string_from_server =
      mystatehere.MyProfileReducer.myprofile.user.contact_list;

    var contacts_list_from_server = [];

    if (contacts_string_from_server.length > 0) {
      function EditBefore(match, p1, p2, p3, offset, string) {
        var x_here = match.charAt(0);
        return x_here + '"';
      }

      function EditAfter(match, p1, p2, p3, offset, string) {
        // console.log(match);
        var y_here = match.charAt(1);
        return '"' + y_here;
      }

      const x_here = contacts_string_from_server.replace(/\W'/g, EditBefore);
      // console.log(x_here + 'xxx');
      const y_here = x_here.replace(/'\W/g, EditAfter);
      // console.log(y_here, 'yyyy');

      contacts_list_from_server = JSON.parse(y_here);
    }

    const [contactsSearch, changeContactsSearch] = useState('');

    const [searchedList, setSearchedList] = useState([]);

    useEffect(() => {
      let newListHere = contacts_list_from_server.filter(
        item => !item.name.toLowerCase().search(contactsSearch.toLowerCase()),
      );
      console.log(newListHere);
      setSearchedList(newListHere);
    }, [contactsSearch]);

    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={<HeaderTitleHere screen="INVITE your CONTACTS" />}
          rightComponent={
            <Pressable
              style={{width: 50, height: 30}}
              onPress={() => navigation.goBack()}>
              <Iconly
                name="ChevronDownBroken"
                color={theme.colors.off_dark}
                size={30}
              />
            </Pressable>
          }
          backgroundColor="#fafafa"
          containerStyle={styles.header_container}
        />
        <Divider style={{backgroundColor: '#05050510'}} />
        <View style={styles.searchbar_wrap_view}>
          <SearchBar
            placeholder="Search Contacts..."
            onChangeText={changeContactsSearch}
            value={contactsSearch}
            containerStyle={styles.media_modal_search_bar_container}
            inputContainerStyle={styles.media_modal_search_bar_input_container}
          />
        </View>
        <ContactsNew
          List={
            contactsSearch.length === 0
              ? contacts_list_from_server
              : searchedList
          }
        />
        <Pressable
          style={styles.button_view}
          onPress={() => HandleNextButtonContacts()}>
          <Iconly
            name="ArrowRightBold"
            color={theme.colors.friends_prime}
            size={50}
          />
        </Pressable>
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
          .then(() => console.log(value))
          .catch(err => console.log(err));
      });
    }
  }

  function AddContactsToClubServerWork(contacts_list, club_id) {
    // https://apisayepirates.life/api/users/send_invite/<str:phone>/<int:user_id>/
    // https://apisayepirates.life/api/add_invited_user/<str:phone>/<int:club_id>/

    if (contacts_list.length > 0) {
      _.forEach(contacts_list, function (value) {
        axios
          .get(
            'https://apisayepirates.life/api/users/send_invite/' +
              value +
              '/' +
              String(mystatehere.MyProfileReducer.myprofile.user.id) +
              '/',
          )
          .catch(err => console.log(err));
        axios
          .get(
            'https://apisayepirates.life/api/users/add_invited_user/' +
              value +
              '/' +
              String(mystatehere.MyProfileReducer.myprofile.user.id) +
              '/' +
              String(club_id) +
              '/',
          )
          .catch(err => console.log(err));
      });
    }
  }

  function StartClubName() {
    const [clubName, setClubName] = useState('');
    //console.log(finalAddFriends);
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
              AddFriendsToClubServerWork(finalAddFriends, response.data.id);
              AddContactsToClubServerWork(finalAddContacts, response.data.id);
            })
            .then(() =>
              ReactNativeHapticFeedback.trigger('impactHeavy', {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
              }),
            )
            .then(() => navigation.goBack())

            .catch(error => console.log(error));
        } else {
          setShowNameScreen('friends');
          showMessage({
            message: 'Choose atleast one more friend to start a clan',
            type: 'info',
            backgroundColor: 'indianred',
          });
        }
      } else {
        showMessage({
          message: 'Club name must be between 4 - 15 letters',
          type: 'info',
          backgroundColor: 'mediumseagreen',
        });
      }
    }

    return (
      <View style={styles.name_input_container}>
        <Header
          leftComponent={<HeaderTitleHere screen="NAME your CLAN" />}
          rightComponent={
            <Pressable
              style={{width: 50, height: 30}}
              onPress={() => navigation.goBack()}>
              <Iconly
                name="ChevronDownBroken"
                color={theme.colors.off_dark}
                size={30}
              />
            </Pressable>
          }
          backgroundColor="#fafafa"
          containerStyle={styles.header_container}
        />
        <Divider style={{backgroundColor: '#05050510'}} />
        <View style={styles.containerview_name_input}>
          <TextInput
            placeholder="Clan Name"
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
  header_container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  header_title: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    color: 'black',
  },

  button_view: {
    position: 'absolute',
    marginTop: windowHeight * 0.8,
    alignSelf: 'center',
  },

  media_modal_search_bar_container: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  media_modal_search_bar_input_container: {
    backgroundColor: '#CCCCCC',
    borderRadius: 15,
  },

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

  name_input_full_view: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  containerview_name_input: {
    height: windowHeight * 0.65,
    backgroundColor: '#fafafa',
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
    backgroundColor: '#fafafa',
    flex: 1,
  },
  TabBarStyles: {
    backgroundColor: '#3f9ffe',
    borderRadius: 13,
    marginHorizontal: windowWidth * 0.04,
  },
  TabBarLabel: {fontFamily: 'GothamRounded-Bold', fontSize: 15},
  containerview: {
    backgroundColor: '#fafafa',
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
