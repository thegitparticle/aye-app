import React from 'react';
import {Image, Dimensions} from 'react-native';

//const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function RenderSearchedImageItem(props) {
  return (
    <Image
      source={{uri: props.Item.item.urls.thumb}}
      style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
    />
  );
}

export default RenderSearchedImageItem;
