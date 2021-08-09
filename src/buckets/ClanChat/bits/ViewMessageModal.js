/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, View} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ViewMessageModal({route}) {
  const {imageUrl} = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#050505',
      }}>
      <FastImage
        style={{
          width: windowWidth,
          height: windowHeight * 0.8,
        }}
        source={{uri: imageUrl}}
      />
    </View>
  );
}

export default ViewMessageModal;
