import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Autolink from 'react-native-autolink';
import Draggable from 'react-native-draggable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ShowMessage(props) {
  // console.log(props.Message);
  if (props.Message) {
    if (props.Message.userMetadata.type === 'a') {
      return (
        <View>
          <FastImage
            source={{uri: props.Message.userMetadata.user_dp}}
            style={styles.b_type_image}>
            <Avatar
              rounded
              source={{uri: props.Message.userMetadata.user_dp}}
              size={60}
              containerStyle={styles.a_avatar}
            />
            <View style={styles.a_text_view}>
              <Autolink style={styles.a_text} text={props.Message.message} />
            </View>
          </FastImage>
        </View>
      );
    } else if (props.Message.userMetadata.type === 'd') {
      return (
        <View>
          <View style={styles.d_type_image}>
            <Avatar
              rounded
              source={{uri: props.Message.userMetadata.pasted_dp}}
              size={60}
              containerStyle={styles.d_avatar}
            />
            <View style={styles.d_text_view}>
              <Autolink style={styles.d_text} text={props.Message.message} />
            </View>
          </View>
        </View>
      );
    } else if (props.Message.userMetadata.type === 'b') {
      return (
        <View style={styles.b_type_view}>
          <FastImage
            source={{uri: props.Message.file.url}}
            style={styles.b_type_image}
          />
        </View>
      );
    } else if (props.Message.userMetadata.type === 'c') {
      return (
        <View style={styles.c_type_view}>
          <FastImage
            source={{uri: props.Message.file.url}}
            style={styles.c_type_image}
          />
        </View>
      );
    } else if (props.Message.userMetadata.type === 'e') {
      return (
        <View style={styles.e_type_view}>
          <FastImage
            source={{uri: props.Message.userMetadata.image_url}}
            style={styles.e_type_image}>
            <Avatar
              rounded
              source={{uri: props.Message.userMetadata.user_dp}}
              size={60}
              containerStyle={styles.e_avatar}
            />
          </FastImage>
        </View>
      );
    } else if (props.Message.userMetadata.type === 'f') {
      return (
        <View style={styles.f_type_view}>
          <FastImage
            source={{uri: props.Message.userMetadata.image_url}}
            style={styles.f_type_image}>
            <FastImage
              source={{uri: props.Message.file.url}}
              style={styles.f_type_image_upper}
            />
          </FastImage>
        </View>
      );
    } else if (props.Message.userMetadata.type === 'g') {
      function TextPartHere(props) {
        var x_here = props.Text;
        if (x_here.length > 0) {
          return (
            <View style={styles.g_text_view}>
              <Text style={styles.g_text}>{props.Text}</Text>
            </View>
          );
        } else {
          return <View />;
        }
      }

      return (
        <View style={styles.g_type_view}>
          <FastImage
            source={{uri: props.Message.file.url}}
            style={styles.g_type_image}>
            {/* <Avatar
              rounded
              source={{uri: props.Message.userMetadata.user_dp}}
              size={60}
              containerStyle={styles.g_avatar}
            />
            <TextPartHere Text={props.Message.message} /> */}
          </FastImage>
        </View>
      );
    } else if (props.Message.userMetadata.type === 'h') {
      function TextPartHere(props) {
        if (props.Text.length > 0) {
          return (
            <View style={styles.h_text_view}>
              <Text style={styles.h_text}>{props.Text}</Text>
            </View>
          );
        } else {
          return <View />;
        }
      }

      return (
        <View style={styles.h_type_view}>
          <FastImage
            source={{uri: props.Message.userMetadata.image_url}}
            style={styles.h_type_image}>
            <Avatar
              rounded
              source={{uri: props.Message.userMetadata.user_dp}}
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

export default ShowMessage;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GothamRounded-Medium',
  },
  text2: {
    fontFamily: 'GothamRounded-Medium',
    color: 'purple',
  },
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
    height: windowWidth / 2,
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
  },
  h_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
});