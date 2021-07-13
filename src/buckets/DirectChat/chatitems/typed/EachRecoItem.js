/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, View} from 'react-native';
import {Image} from 'react-native-elements';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';

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
        borderRadius: 10,
        backgroundColor: 'transparent',
      }}
      keyboardShouldPersistTaps="always"
      onPress={() => {
        HandleSettingChosenMedia(props.Item);
      }}>
      <Image
        style={{
          width: 125,
          height: 72.5,
          borderRadius: 10,
        }}
        source={{
          uri: props.Item,
        }}
        PlaceholderContent={
          <ContentLoader
            speed={2}
            width={125}
            height={72.5}
            viewBox="0 0 125 72.5"
            backgroundColor="#FFFFFF"
            foregroundColor="#CCCCCC"
            {...props}>
            <Rect x="0" y="0" rx="0" ry="0" width="125" height="72.5" />
          </ContentLoader>
        }
      />
    </Pressable>
  );
}

export default EachRecoItem;
