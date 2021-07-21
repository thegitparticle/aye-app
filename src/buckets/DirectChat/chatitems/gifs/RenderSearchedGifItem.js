/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import {DoubleBounce} from 'react-native-loader';

//const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function RenderSearchedGifItem(props) {
  //console.log(props.Item.item.images.fixed_height_small.url);
  return (
    <Image
      source={{uri: props.Item.item.images.fixed_height_small.url}}
      style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
      PlaceholderContent={<DoubleBounce size={10} color="#1CAFF6" />}
      placeholderStyle={{backgroundColor: '#050505'}}
    />
  );
}

export default RenderSearchedGifItem;
