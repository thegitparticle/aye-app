import React from 'react';
import {Dimensions, View} from 'react-native';
import {Image} from 'react-native-elements';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

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
