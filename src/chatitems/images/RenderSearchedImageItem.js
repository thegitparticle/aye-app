/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, View} from 'react-native';
import {Image} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

//const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function RenderSearchedImageItem(props) {
  return (
    <Image
      source={{uri: props.Item.item.urls.thumb}}
      style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
      PlaceholderContent={
        <View
          style={{
            width: (windowWidth - 10) / 2,
            height: windowWidth / 2,
            borderRadius: 10,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              opacity: 0.25,
              width: (windowWidth - 10) / 2,
              height: windowWidth / 2,
            }}
            colors={['#F76B1C', '#FAD961', '#F76B1C']}
          />
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: (windowWidth - 10) / 2,
              height: windowWidth / 2,
              opacity: 0.25,
            }}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="blue"
          />
        </View>
      }
    />
  );
}

export default RenderSearchedImageItem;
