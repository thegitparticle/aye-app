/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {GetMyProfile} from '../redux/MyProfileActions';
import MyProfileComponent from '../components/MyProfileComponent';
import AccountToolKitButtons from '../uibits/AccountToolKitButtons';
import ThemeContext from '../themes/Theme';
import Iconly from '../pnstuff/Iconly';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function MyProfileScreen({dispatch, navigation}) {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    dispatch(GetMyProfile(state_here.MyProfileReducer.myprofile.user.phone));
  }, [dispatch]);

  var profile_info = state_here.MyProfileReducer.myprofile;

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: '#fafafa',
      }}>
      <MyProfileComponent Profile={profile_info} />
      <AccountToolKitButtons />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(MyProfileScreen);
