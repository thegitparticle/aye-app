import React, {useEffect, useState, useContext} from 'react';
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
import {GetMyCircle} from '../redux/MyCircleActions';
import _ from 'lodash';
import {showMessage, hideMessage} from 'react-native-flash-message';
import axios from 'axios';
import ThemeContext from '../themes/Theme';
import Iconly from '../pnstuff/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function AddPeopleToClub({dispatch, navigation, route}) {
  const theme = useContext(ThemeContext);
  const {club_id} = route.params;

  useEffect(() => {
    dispatch(GetMyCircle(mystatehere.MyProfileReducer.myprofile.user.id));
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

  var circle_list_here = mystatehere.MyCircleReducer.mycircle;

  var AddFriendsList = [];

  function SelectCircleItem(id) {
    AddFriendsList.push(id);
  }

  function DeSelectCircleItem(id) {
    AddFriendsList = AddFriendsList.filter(item => item !== id);
  }

  function RenderCircleItem(props) {
    const [added, setAdded] = useState(false);
    console.log(props.ID);
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

  function SubmitChanges() {
    console.log(AddFriendsList);
    if (AddFriendsList.length > 0) {
      _.forEach(AddFriendsList, function (value) {
        axios
          .get(
            'https://apisayepirates.life/api/users/add_users_to_club/' +
              String(value) +
              '/' +
              String(club_id) +
              '/',
          )
          .then(() =>
            showMessage({
              message: 'your friend is added to this clan',
              type: 'info',
              backgroundColor: 'mediumseagreen',
              //backgroundColor: 'indianred',
            }),
          )
          .then(() => navigation.goBack())
          .catch(err => {
            console.log(err);
          });
      });
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.overall_container}>
      <Header
        rightComponent={<RightHeaderComponent />}
        backgroundColor="#FFFFFF"
        containerStyle={styles.header_container}
        //barStyle="dark-content"
      />
      <View style={styles.left_header_view}>
        <Text style={styles.header_title}>add friends</Text>
      </View>
      <FlatList
        data={circle_list_here}
        renderItem={({item}) => (
          <RenderCircleItem
            Name={item.name}
            ID={item.friend_user_id}
            Avatar={item.profile_pic}
          />
        )}
        keyExtractor={item => item.userid}
      />

      <Button
        title="Done"
        size={25}
        buttonStyle={styles.NextButton}
        titleStyle={styles.NextButtonLabel}
        containerStyle={styles.NextButtonContainer}
        onPress={() => SubmitChanges()}
      />
    </View>
  );
}

const mapStateToProps = state => {
  mystatehere = state;
  return mystatehere;
};

export default connect(mapStateToProps)(AddPeopleToClub);

const styles = StyleSheet.create({
  overall_container: {
    backgroundColor: '#FFFFFF',
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
    shadowColor: '#36B37E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  NextButton: {
    width: 150,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#36B37E',
  },

  NextButtonLabel: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
});
