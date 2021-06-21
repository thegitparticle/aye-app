/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, View} from 'react-native';
import {Image} from 'react-native-elements';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

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
          <View
            style={{
              width: 125,
              height: 72.5,
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
                borderRadius: 10,
                width: 125,
                height: 72.5,
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
                borderRadius: 10,
                width: 125,
                height: 72.5,
                opacity: 0.25,
              }}
              blurType="dark"
              blurAmount={1}
              reducedTransparencyFallbackColor="blue"
            />
          </View>
        }
      />
    </Pressable>
  );
}

export default EachRecoItem;
