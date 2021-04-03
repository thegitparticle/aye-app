import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {connect} from 'react-redux';

var state_here = {};

function RootStack() {
  var t_or_f = state_here.AuthStateReducer.logged_in_or_not;

  if (t_or_f === true) {
    return (
      <NavigationContainer style={{backgroundColor: '#050505'}}>
        <HomeStack />
      </NavigationContainer>
    );
  } else {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <NavigationContainer style={{backgroundColor: '#050505'}}>
        <AuthStack />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(RootStack);
