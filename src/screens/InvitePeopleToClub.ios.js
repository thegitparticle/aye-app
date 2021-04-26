import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  PermissionsAndroid,
  TextInput,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import {ListItem, Button, Avatar, Icon, Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyCircle} from '../redux/MyCircleActions';
import SelectMultiple from 'react-native-select-multiple';
import _ from 'lodash';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function InvitePeopleToClub({dispatch, navigation, route}) {
  const {club_id} = route.params;
  const [addedMemberList, setAddedMemberList] = useState([]);

  useEffect(() => {
    dispatch(GetMyCircle());
  }, [dispatch]);

  function CenterHeaderComponent() {
    return (
      <View>
        <Text style={styles.header_title}>add friends</Text>
      </View>
    );
  }

  function RightHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#050505"
        name="chevron-down"
        onPress={() => navigation.goBack()}
      />
    );
  }

  var circle_list_here = mystatehere.MyCircleReducer.mycircle;

  var AddFriendsList = [];

  function SelectCircleItem(id) {
    AddFriendsList.push(id.toString());
    console.log(AddFriendsList);
  }

  function DeSelectCircleItem(id) {
    AddFriendsList = AddFriendsList.filter(item => item !== id.toString());
    console.log(AddFriendsList);
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
            color="#517fa4"
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
            name="checkcircleo"
            type="ant-design"
            color="#517fa4"
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

  return (
    <View style={styles.overall_container}>
      <Header
        rightComponent={<RightHeaderComponent />}
        centerComponent={<CenterHeaderComponent />}
        backgroundColor="#fafafa"
        barStyle="dark-content"
      />
      <FlatList
        data={circle_list_here}
        renderItem={({item}) => (
          <RenderCircleItem
            Name={item.name}
            ID={item.userid}
            Avatar={item.displaypic}
          />
        )}
        keyExtractor={item => item.userid}
      />

      <Button
        title="Done"
        size={25}
        raised={true}
        buttonStyle={styles.NextButton}
        titleStyle={styles.NextButtonLabel}
        containerStyle={styles.NextButtonContainer}
        onPress={() => AddContactsToClubServerWork(AddFriendsList, club_id)}
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
  overall_container: {
    backgroundColor: '#fafafa',
    flex: 1,
    flexDirection: 'column',
  },

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
