import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import {ListItem, Button, Avatar, Icon, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import Contacts from 'react-native-contacts';
import _ from 'lodash';
import axios from 'axios';
import IconlyBackChevronDown from '../uibits/IconlyBackChevronDown';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function InvitePeopleToClub({dispatch, navigation, route}) {
  const {club_id} = route.params;
  const [addedMemberList, setAddedMemberList] = useState([]);
  const [grabedContacts, setGrabedContacts] = useState();

  async function GrabContacts() {
    const contacts_here = await Contacts.getAll();
    setGrabedContacts(contacts_here);
  }

  useEffect(() => {
    GrabContacts();
  }, [dispatch]);

  function RightHeaderComponent() {
    return (
      <Pressable
        style={styles.right_header_view}
        onPress={() => navigation.goBack()}>
        <IconlyBackChevronDown />
      </Pressable>
    );
  }

  var AddFriendsList = [];

  function AddContactsToClubServerWork(contacts_list, club_id) {
    // https://apisayepirates.life/api/users/send_invite_via_sms/<str:phone>/<int:user_id>/
    // https://apisayepirates.life/api/add_invited_user/<str:phone>/<int:club_id>/

    console.log(contacts_list);
    console.log(club_id);

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
    var name_here = props.Name;

    if (added) {
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
            size={windowHeight * 0.06}
            containerStyle={{backgroundColor: '#ddd'}}
          />
          <Text style={styles.contact_item_not_selected_text}>
            {props.Name}
          </Text>
        </Pressable>
      );
    }
  }

  const contacts_string_from_server =
    mystatehere.MyProfileReducer.myprofile.user.contact_list;

  const x_here = contacts_string_from_server.replace(/'/g, '"');

  const contacts_list_from_server = JSON.parse(x_here);

  return (
    <View style={styles.overall_container}>
      <Header
        rightComponent={<RightHeaderComponent />}
        backgroundColor="#FaFaFa"
        containerStyle={styles.header_container}
        //barStyle="dark-content"
      />
      <View style={styles.left_header_view}>
        <Text style={styles.header_title}>invite contacts</Text>
      </View>

      <FlatList
        data={contacts_list_from_server}
        renderItem={({item}) => (
          <RenderContactItem
            Name={item.name}
            Item={item}
            PhoneItem={item.phone}
          />
        )}
        keyExtractor={item => item.phoneNumbers}
      />

      <Button
        title="Done"
        size={25}
        buttonStyle={styles.NextButton}
        titleStyle={styles.NextButtonLabel}
        containerStyle={styles.NextButtonContainer}
        onPress={() => AddContactsToClubServerWork(AddContactsList, club_id)}
      />
    </View>
  );
}

const mapStateToProps = state => {
  mystatehere = state;
  return mystatehere;
};

export default connect(mapStateToProps)(InvitePeopleToClub);

const styles = StyleSheet.create({
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

  overall_container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column',
  },

  header_container: {
    height: windowHeight * 0.05,
    borderBottomWidth: 0,
  },

  left_header_view: {
    width: windowWidth * 0.5,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 40,
  },

  right_header_view: {width: 50, height: 35},

  header_title: {
    fontSize: 17,
    fontFamily: 'GothamRounded-Medium',
  },

  friend_name: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#151515',
  },

  AddButton: {
    backgroundColor: '#3f9ffe',
    borderRadius: 10,
  },
  AddButtonContainer: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonTitle: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 13,
    color: '#fff',
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

  NextButtonContainer: {
    position: 'absolute',
    bottom: '5%',
    //marginBottom: windowHeight * 0.8,
    alignSelf: 'center',
  },

  NextButton: {
    width: 150,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#36b37e',
  },

  NextButtonLabel: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
});
