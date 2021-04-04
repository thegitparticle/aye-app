/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import IconlyBackChevronDown from './IconlyBackChevronDown';
import {useNavigation} from '@react-navigation/native';

function ButtonView() {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <IconlyBackChevronDown />
    </View>
  );
}

export default function BackChevronDownIcon(props) {
  const navigation = useNavigation();

  return (
    <Button
      containerStyle={{width: 50, height: 50, borderRadius: 25}}
      onPress={() => navigation.goBack()}
      ViewComponent={ButtonView}
    />
  );
}
