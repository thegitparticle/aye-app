/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, View} from 'react-native';
import {Image} from 'react-native-elements';

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
          borderRadius: 10,
        }}
        keyboardShouldPersistTaps="always"
        onPress={() => {}}>
        <Image
          style={{
            width: 125,
            height: 72.5,

            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#36B37E',
          }}
          source={{
            uri: props.Link,
          }}
        />
      </Pressable>
    );
  } else {
    return <View />;
  }
}

export default ChosenRecoItem;
