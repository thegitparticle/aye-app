import React from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {LOGOUT} from '../redux/types';
import {connect} from 'react-redux';
import HeaderAtHome from '../components/HeaderAtHome';

function RootStackScreen({dispatch}) {
  return (
    <View>
      <HeaderAtHome />
      <Text>Home Stack not Root</Text>
      <Pressable onPress={() => dispatch({type: LOGOUT})}>
        <Text style={{color: 'red'}}>log out</Text>
      </Pressable>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOutClick: () => {
      dispatch({type: LOGOUT});
    },
  };
};

export default connect(mapDispatchToProps)(RootStackScreen);
