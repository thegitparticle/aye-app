/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import BetterImage from 'react-native-better-image';

function EachRecoItem(props) {
  const [selected, setSelected] = useState(false);

  function HandleSettingChosenMedia(link) {
    props.SetChosenMedia(link);
  }

  function HandleSettingChosenMediaEmpty() {
    props.SetChosenMediaEmpty();
  }

  if (selected) {
    return (
      <Pressable
        style={{
          shadowColor: '#000',
          width: 125,
          height: 72.5,
          marginHorizontal: 5,
        }}
        onPress={() => {
          HandleSettingChosenMediaEmpty();
          setSelected(false);
        }}>
        <BetterImage
          viewStyle={{
            width: 125,
            height: 72.5,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: '#36B37E',
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
  } else {
    return (
      <Pressable
        style={{
          borderRadius: 3,
          width: 125,
          height: 72.5,
          marginHorizontal: 5,
          backgroundColor: '#FFFFFF80',
        }}
        onPress={() => {
          setSelected(true);

          HandleSettingChosenMedia(props.Item);
        }}>
        <BetterImage
          viewStyle={{
            width: 125,
            height: 72.5,
          }}
          source={{
            uri: props.Item,
          }}
          thumbnailSource={{
            uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
          }}
          thumbnailBlurRadius={-10}
          fallbackSource={{
            uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
          }}
        />
      </Pressable>
    );
  }
}

export default EachRecoItem;
