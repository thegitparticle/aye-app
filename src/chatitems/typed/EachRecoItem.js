/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BetterImage from 'react-native-better-image';

function EachRecoItem(props) {
  function HandleSettingChosenMedia(link) {
    props.SetChosenMedia(link);
  }

  return (
    <Pressable
      style={{
        shadowColor: '#000',
        width: 125,
        height: 72.5,
        marginHorizontal: 5,
      }}
      keyboardShouldPersistTaps="always"
      onPress={() => {
        HandleSettingChosenMedia(props.Item);
      }}>
      <BetterImage
        viewStyle={{
          width: 125,
          height: 72.5,
          borderRadius: 10,
        }}
        source={{
          uri: props.Item,
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
}

export default EachRecoItem;
