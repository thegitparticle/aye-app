/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

function ViewMessageModalD({route}) {
  const {imageUrl} = route.params;

  return (
    <FastImage
      style={{
        flex: 1,
      }}
      source={{uri: imageUrl}}
    />
  );
}

export default ViewMessageModalD;
