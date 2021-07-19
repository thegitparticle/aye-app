/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Avatar} from 'react-native-elements';
import {usePubNub} from 'pubnub-react';
import Autolink from 'react-native-autolink';
import {BlurView} from 'expo-blur';

/*

 <RNUrlPreview
        text={
          'any text to be parsed , https://www.vogue.in/fashion/content/the-model-approved-ways-to-wear-a-vintage-or-vegan-leather-jacket-now'
        }
        description={false}
        imageStyle={{width: windowWidth, height: windowWidth}}>
        <Text>kjsdkkjkf</Text>
        <Text>kjsdkkjkf</Text>
        <Text>kjsdkkjkf</Text>
      </RNUrlPreview>

      */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ShowMessageOld(props) {
  const pubnub = usePubNub();
  // console.log(props.Message);
  if (props.Message) {
    if (props.Message.meta.type === 'a') {
      return (
        <View>
          <FastImage
            source={{uri: props.Message.meta.user_dp}}
            style={styles.b_type_image}>
            <Autolink style={styles.a_text} text={props.Message.message} />
          </FastImage>
        </View>
      );
    } else if (props.Message.meta.type === 'd') {
      return (
        <View style={styles.d_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.meta.pasted_dp}}
            size={60}
            containerStyle={styles.d_avatar}
          />
          <View style={styles.d_text_view}>
            <Autolink style={styles.d_text} text={props.Message.message} />
          </View>
        </View>
      );
    } else if (props.Message.meta.type === 'b') {
      return (
        <View style={styles.b_type_view}>
          <FastImage
            source={{
              uri: pubnub.getFileUrl({
                channel: props.Message.channel,
                id: props.Message.message.file.id,
                name: props.Message.message.file.name,
              }),
            }}
            style={styles.b_type_image}
          />
        </View>
      );
    } else if (props.Message.meta.type === 'c') {
      return (
        <View style={styles.c_type_view}>
          <FastImage
            source={{
              uri: pubnub.getFileUrl({
                channel: props.Message.channel,
                id: props.Message.message.file.id,
                name: props.Message.message.file.name,
              }),
            }}
            style={styles.c_type_image}
          />
        </View>
      );
    } else if (props.Message.meta.type === 'e') {
      return (
        <View style={styles.e_type_view}>
          <FastImage
            source={{uri: props.Message.meta.image_url}}
            style={styles.e_type_image}>
            <Avatar
              rounded
              source={{uri: props.Message.meta.user_dp}}
              size={60}
              containerStyle={styles.e_avatar}
            />
          </FastImage>
        </View>
      );
    } else if (props.Message.meta.type === 'f') {
      // console.log(props.Message);

      return (
        <View style={styles.f_type_view}>
          <FastImage
            source={{
              uri: props.Message.meta.image_url,
            }}
            style={styles.f_type_image}>
            <FastImage
              source={{
                uri: pubnub.getFileUrl({
                  channel: props.Message.channel,
                  id: props.Message.message.file.id,
                  name: props.Message.message.file.name,
                }),
              }}
              style={styles.f_type_image_upper}
            />
          </FastImage>
        </View>
      );
    } else if (props.Message.meta.type === 'g') {
      function TextPartHere(props) {
        var x_here = props.Text;
        if (x_here.length > 0) {
          return (
            <View style={styles.b_text_view}>
              <Text style={styles.b_text}>{props.Text}</Text>
            </View>
          );
        } else {
          return <View />;
        }
      }

      return (
        <View style={styles.g_type_view}>
          <FastImage
            source={{
              uri: pubnub.getFileUrl({
                channel: props.Message.channel,
                id: props.Message.message.file.id,
                name: props.Message.message.file.name,
              }),
            }}
            style={styles.g_type_image}>
            {/* <Avatar
            rounded
            source={{uri: props.Message.meta.user_dp}}
            size={60}
            containerStyle={styles.g_avatar}
          />
          <TextPartHere Text={props.Message.message} /> */}
          </FastImage>
        </View>
      );
    } else if (props.Message.meta.type === 'h') {
      function TextPartHere(props) {
        var x_here = props.Text;
        if (x_here.length > 0) {
          return (
            <BlurView
              style={{
                overflow: 'hidden',
                alignSelf: 'flex-start',
                left: '15%',
                right: '15%',
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              intensity={75}
              tint="light">
              <View
                style={{
                  backgroundColor: 'transparent',
                  alignSelf: 'flex-start',
                  maxWidth: windowWidth * 0.8,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'GothamRounded-Medium',
                    fontSize: 15,
                    padding: 10,
                    color: '#050505',
                  }}>
                  {props.Text}
                </Text>
              </View>
            </BlurView>
          );
        } else {
          return <View />;
        }
      }

      return (
        <View style={styles.h_type_view}>
          <FastImage
            source={{uri: props.Message.meta.image_url}}
            style={styles.h_type_image}>
            <Avatar
              rounded
              source={{uri: props.Message.meta.user_dp}}
              size={60}
              containerStyle={styles.h_avatar}
            />
            <TextPartHere Text={props.Message.message} />
          </FastImage>
        </View>
      );
    } else {
      return <View />;
    }
  } else {
    return <View />;
  }
}

export default ShowMessageOld;

const styles = StyleSheet.create({
  a_type_image: {
    width: windowWidth,
    height: windowWidth / 2,
    flexDirection: 'column-reverse',
  },
  a_avatar: {
    left: '5%',
  },
  a_text_view: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
    maxWidth: windowWidth * 0.85,
  },
  a_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },

  d_type_image: {
    width: windowWidth,
    height: windowHeight * 0.1,

    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',

    alignItems: 'center',
  },
  d_avatar: {
    marginLeft: '5%',
  },
  d_text_view: {
    backgroundColor: '#F2F4F9',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    maxWidth: windowWidth * 0.8,
  },
  d_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },

  text: {
    fontFamily: 'GothamRounded-Medium',
  },
  text2: {
    fontFamily: 'GothamRounded-Medium',
    color: 'purple',
  },
  b_type_image: {
    width: windowWidth,
    //width: '100%',
    height: undefined,
    aspectRatio: 1,
    flexDirection: 'column-reverse',
  },
  b_avatar: {
    left: '5%',
  },
  b_text_view: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
    maxWidth: windowWidth * 0.85,
  },
  b_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  b_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  c_type_image: {
    width: windowWidth,
    //width: '100%',
    height: undefined,
    aspectRatio: 1,
    flexDirection: 'column-reverse',
  },
  c_avatar: {
    left: '5%',
  },
  c_text_view: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
    maxWidth: windowWidth * 0.85,
  },
  c_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  c_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  e_type_image: {
    width: windowWidth / 2,
    height: windowWidth / 2,
  },
  e_avatar: {
    position: 'absolute',
    bottom: 0,
    left: 0.1,
  },
  e_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  f_type_image: {
    width: windowWidth,
    height: undefined,
    aspectRatio: 1,
    marginVertical: windowHeight * 0.01,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  f_type_image_upper: {
    width: windowWidth,
    height: undefined,
    aspectRatio: 1,
    // marginVertical: windowHeight * 0.01,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  f_avatar: {
    left: '5%',
  },
  f_text_view: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
    maxWidth: windowWidth * 0.85,
  },
  f_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  f_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  g_type_image: {
    width: windowWidth,
    //width: '100%',
    height: undefined,
    aspectRatio: 1,
    flexDirection: 'column-reverse',
  },
  g_avatar: {
    left: '5%',
  },
  g_text_view: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
    maxWidth: windowWidth * 0.85,
  },
  g_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  g_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  h_type_image: {
    width: windowWidth,
    height: windowWidth / 1.5,
    flexDirection: 'column-reverse',
  },
  h_avatar: {
    left: '5%',
  },
  h_text_view: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    maxWidth: windowWidth * 0.85,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  h_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    padding: 10,
    color: '#050505',
  },
  h_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
  main_image: {
    width: windowWidth,
    height: windowWidth / 2,
    flexDirection: 'column-reverse',
  },
});
