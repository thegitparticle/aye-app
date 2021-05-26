import React from 'react';
import {Image, Pressable, Dimensions} from 'react-native';

//const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function RenderSearchedGifItem(props) {
  //console.log(props.Item.item.images.fixed_height_small.url);
  return (
    <Image
      source={{uri: props.Item.item.images.fixed_height_small.url}}
      style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
    />
  );
}

export default RenderSearchedGifItem;
