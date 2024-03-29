import React, {useEffect, useState, useContext, useMemo} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import {SearchBar, Button, Avatar, Icon, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import Contacts from 'react-native-contacts';
import _ from 'lodash';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import ThemeContext from '../../../themes/Theme';
import Iconly from '../../../external/Iconly';
import {SquircleView} from 'react-native-figma-squircle';
import Share from 'react-native-share';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function InvitePeopleToClub({dispatch, navigation, route}) {
  const theme = useContext(ThemeContext);
  const {club_id} = route.params;
  const [grabedContacts, setGrabedContacts] = useState();

  async function GrabContacts() {
    const contacts_here = await Contacts.getAll();
    setGrabedContacts(contacts_here);
  }

  var AddContactsList = [];

  function SelectContactItem(id) {
    AddContactsList.push(id);
  }

  function DeSelectContactItem(id) {
    AddContactsList = AddContactsList.filter(item => item !== id);
  }

  useEffect(() => {
    GrabContacts();
  }, [dispatch]);

  function RightHeaderComponent() {
    return (
      <Pressable
        style={styles.right_header_view}
        onPress={() => navigation.goBack()}>
        <Iconly
          name="ChevronDownBroken"
          color={theme.colors.off_dark}
          size={30}
        />
      </Pressable>
    );
  }

  function AddContactsToClubServerWork(contacts_list, club_id) {
    const shareAppOptions = {
      title: 'Share app via',
      message: 'Download Aye today -',
      url: 'https://downloadaye.page.link/download',
    };

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
          .then(() =>
            showMessage({
              message: 'your friend is SMS invited to this clan',
              type: 'info',
              backgroundColor: 'mediumseagreen',
            }),
          )
          .then(() =>
            Share.open(shareAppOptions)
              .then(res => console.log(res))
              .catch(err => console.log(err)),
          )
          .then(() => navigation.goBack())
          .catch(err => console.log(err));
      });
    } else {
      showMessage({
        message: 'Choose a contact to add',
        type: 'info',
        backgroundColor: 'indianred',
      });
    }
  }

  // const RenderContactItem = useMemo(
  //   () =>
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
  //   [],
  // );

  const contacts_string_from_server =
    mystatehere.MyProfileReducer.myprofile.user.contact_list;

  var contacts_list_from_server = [];

  if (contacts_string_from_server.length > 0) {
    function EditBefore(match, p1, p2, p3, offset, string) {
      var x_here = match.charAt(0);
      return x_here + '"';
    }

    function EditAfter(match, p1, p2, p3, offset, string) {
      var y_here = match.charAt(1);
      return '"' + y_here;
    }

    const x_here = contacts_string_from_server.replace(/\W'/g, EditBefore);
    const y_here = x_here.replace(/'\W/g, EditAfter);

    contacts_list_from_server = JSON.parse(y_here);
  }

  const [contactsSearch, changeContactsSearch] = useState('');

  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    let newListHere = contacts_list_from_server.filter(
      item => !item.name.toLowerCase().search(contactsSearch.toLowerCase()),
    );
    setSearchedList(newListHere);
  }, [contactsSearch]);

  return (
    <View style={styles.overall_container}>
      <Header
        rightComponent={<RightHeaderComponent />}
        backgroundColor="#FaFaFa"
        containerStyle={styles.header_container}
      />
      <View style={styles.left_header_view}>
        <Text style={styles.header_title}>invite contacts</Text>
      </View>

      <SquircleView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: windowWidth * 0.95,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginVertical: 10,
        }}
        squircleParams={{
          cornerSmoothing: 1,
          cornerRadius: 10,
          fillColor: theme.colors.mid_light,
        }}>
        <SearchBar
          placeholder="Search Contacts..."
          onChangeText={changeContactsSearch}
          value={contactsSearch}
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            borderTopWidth: 0,
            width: windowWidth * 0.95,
            height: 50,
            justifyContent: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: 'transparent',
          }}
          inputStyle={{...theme.text.header, color: theme.colors.off_dark}}
          placeholderTextColor={theme.colors.mid_dark}
          searchIcon={{color: theme.colors.mid_dark}}
        />
      </SquircleView>

      <FlatList
        data={
          contactsSearch.length === 0 ? contacts_list_from_server : searchedList
        }
        renderItem={({item}) => (
          <RenderContactItem
            Name={item.name}
            Item={item}
            PhoneItem={item.phone}
          />
        )}
        keyExtractor={item => item.phone}
        ListFooterComponent={<View style={{height: 100}} />}
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
  searchbar_wrap_view: {
    //marginBottom: 20,
  },
  list_wrap_view: {
    marginBottom: windowHeight * 0.1,
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
    fontSize: 21,
    fontFamily: 'GothamRounded-Bold',
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
