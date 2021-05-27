/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BetterImage from 'react-native-better-image';

function ChosenRecoItem(props) {
  var x_here = props.Link;
  if (x_here.length > 0) {
    return (
      <Pressable
        style={{
          shadowColor: '#000',
          width: 125,
          height: 72.5,
          marginHorizontal: 5,
        }}
        keyboardShouldPersistTaps="always"
        onPress={() => {}}>
        <BetterImage
          viewStyle={{
            width: 125,
            height: 72.5,

            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#36B37E',
          }}
          source={{
            uri: props.Link,
          }}
          thumbnailSource={{
            uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
          }}
          fallbackSource={{
            uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
          }}
        />
      </Pressable>
    );
  } else {
    return <View />;
  }
}

export default ChosenRecoItem;
