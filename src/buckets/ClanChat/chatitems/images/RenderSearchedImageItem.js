/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Pressable, Linking, Text, Image} from 'react-native';
import {ImageBackground} from 'react-native-elements';
import {DoubleBounce} from 'react-native-loader';

const windowWidth = Dimensions.get('window').width;

function RenderSearchedImageItem(props) {
  return (
    <Image
      source={{uri: props.Item.item.urls.thumb}}
      style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
      PlaceholderContent={<DoubleBounce size={10} color="#1CAFF6" />}
      placeholderStyle={{backgroundColor: '#050505'}}
    />
  );
}

export default RenderSearchedImageItem;

////https://api.unsplash.com/photos/a0TJ3hy-UD8/download/?client_id=kJLvNUiTzhjWDxf2a2plyRFdbHbjD9MT84insrzOu9Q
