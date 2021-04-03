/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import IconlyNextIcon from './IconlyNextIcon';

function ButtonView() {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#333',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <IconlyNextIcon />
    </View>
  );
}

export default function IconlyNextButton(props) {
  return (
    <Button
      raised
      containerStyle={{width: 50, height: 50, borderRadius: 25}}
      buttonStyle={{
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: {height: 1, width: 1}, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
      }}
      ViewComponent={ButtonView}
    />
  );
}
