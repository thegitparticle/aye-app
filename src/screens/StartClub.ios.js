import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import {ListItem, Button, Avatar, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {GetMyCircle} from '../redux/MyCircleActions';
//import {getMyContacts} from '../redux/MyContactsActions';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Contacts from 'react-native-contacts';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var mystatehere = {};

function StartClub({dispatch, navigation}) {
  const [grabedContacts, setGrabedContacts] = useState();
  const [addedMemberList, setAddedMemberList] = useState([]);
  const [addedContactList, setAddedContactList] = useState([]);
  const [showNameScreen, setShowNameScreen] = useState(false);

  async function GrabContacts() {
    /*
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'find friends from your contacts to invite them onto your club!',
    });
*/
    const contacts_here = await Contacts.getAll();
    setGrabedContacts(contacts_here);
  }
  useEffect(() => {
    dispatch(GetMyCircle());
    GrabContacts();
  }, [dispatch]);

  //console.log(grabedContacts);

  function AddButton() {
    const [added, setAdded] = useState(false);
    if (!added) {
      return (
        <Button
          title="+ ADD"
          type="solid"
          containerStyle={styles.AddButtonContainer}
          titleStyle={styles.AddButtonTitle}
          buttonStyle={styles.AddButton}
          onPress={() => setAdded(true)}
        />
      );
    } else {
      return (
        <Button
          title="✓"
          type="solid"
          containerStyle={styles.AddButtonContainer}
          titleStyle={styles.AddButtonTitle}
          buttonStyle={styles.AddButton}
          onPress={() => setAdded(false)}
        />
      );
    }
  }

  const CircleHere = () => (
    <ScrollView contentContainerStyle={styles.overallcontainer}>
      {mystatehere.MyCircleReducer.mycircle.map((comp, i) => (
        <ListItem>
          <Avatar
            rounded
            source={{uri: comp.displaypic}}
            size={windowHeight * 0.0719}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.Heading2}>{comp.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.plaintext}>
              {comp.username}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem>
            <AddButton />
          </ListItem>
        </ListItem>
      ))}
    </ScrollView>
  );

  function GrabNumbers(props) {
    console.log(props.Numbers);
    return <View />;
  }

  function InviteButton() {
    const [invited, setInvited] = useState(false);
    if (!invited) {
      return (
        <Button
          title="+ INVITE"
          type="solid"
          containerStyle={styles.AddButtonContainer}
          titleStyle={styles.AddButtonTitle}
          buttonStyle={styles.AddButton}
          onPress={() => setInvited(true)}
        />
      );
    } else {
      return (
        <Button
          title="✓"
          type="solid"
          containerStyle={styles.AddButtonContainer}
          titleStyle={styles.AddButtonTitle}
          buttonStyle={styles.AddButton}
          onPress={() => setInvited(false)}
        />
      );
    }
  }

  const ContactsHere = () => (
    <ScrollView style={styles.overallcontainer}>
      {grabedContacts.map((comp, i) => (
        <ListItem>
          <Avatar rounded title="FP" size="medium" activeOpacity={0.7} />
          <ListItem.Content>
            <ListItem.Title style={styles.Heading2}>
              {comp.givenName} {comp.familyName}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem>
            <InviteButton />
          </ListItem>
        </ListItem>
      ))}
    </ScrollView>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'circle', title: 'CIRCLE'},
    {key: 'contacts', title: 'CONTACTS'},
  ]);

  const renderScene = SceneMap({
    circle: CircleHere,
    contacts: ContactsHere,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      style={styles.TabBarStyles}
      labelStyle={styles.TabBarLabel}
    />
  );

  function StartClubName() {
    return (
      <View style={styles.containerview_name_input}>
        <TextInput
          placeholder="Club Name"
          placeholderTextColor="#bdc2d9"
          style={styles.inputcontainerview_name_input}
          textAlign="center"
        />
        <Button
          title="START"
          buttonStyle={styles.startbutton_name_input}
          titleStyle={styles.buttontitle_name_input}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const TabFinalView = () => (
    <View style={{flex: 1}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        //initialLayout={initialLayout}
      />
      <Button
        icon={
          <Icon name="arrow-right" size={25} color="white" type="feather" />
        }
        size={25}
        raised={true}
        buttonStyle={styles.NextButton}
        titleStyle={styles.NextButtonLabel}
        containerStyle={styles.NextButtonContainer}
        onPress={() => setShowNameScreen(true)}
      />
    </View>
  );

  if (!showNameScreen) {
    return (
      <View style={styles.containerview}>
        <TabFinalView />
      </View>
    );
  } else {
    return (
      <View style={styles.containerview}>
        <StartClubName />
      </View>
    );
  }
}

const mapStateToProps = state => {
  mystatehere = state;
  return mystatehere;
};

export default connect(mapStateToProps)(StartClub);

const styles = StyleSheet.create({
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
