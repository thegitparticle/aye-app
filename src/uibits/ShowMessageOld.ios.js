import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Avatar} from 'react-native-elements';
import {usePubNub} from 'pubnub-react';
import Autolink from 'react-native-autolink';

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
  //console.log(props.Message);
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
      <View>
        <FastImage
          source={{uri: props.Message.meta.user_dp}}
          style={styles.b_type_image}>
          <Autolink style={styles.a_text} text={props.Message.message} />
        </FastImage>
      </View>
    );
  } else if (props.Message.meta.type === 'b') {
    console.log(props.Message.file);
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
          style={styles.b_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.meta.user_dp}}
            size={60}
            containerStyle={styles.b_avatar}
          />
          <View style={styles.b_text_view}>
            <Text style={styles.b_text}>
              {props.Message.message.message.test}
            </Text>
          </View>
        </FastImage>
      </View>
    );
  } else if (props.Message.meta.type === 'c') {
    return (
      <View style={styles.c_type_view}>
        <FastImage
          //source={{uri: props.Message.file.url}}
          source={{
            uri: pubnub.getFileUrl({
              channel: props.Message.channel,
              id: props.Message.message.file.id,
              name: props.Message.message.file.name,
            }),
          }}
          style={styles.c_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.meta.user_dp}}
            size={60}
            containerStyle={styles.c_avatar}
          />
          <View style={styles.c_text_view}>
            <Text style={styles.c_text}>
              {props.Message.message.message.test}
            </Text>
          </View>
        </FastImage>
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
    return (
      <View style={styles.f_type_view}>
        <FastImage
          source={{uri: props.Message.meta.image_url}}
          style={styles.f_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.meta.user_dp}}
            size={60}
            containerStyle={styles.f_avatar}
          />
          <View style={styles.f_text_view}>
            <Text style={styles.f_text}>{props.Message.message}</Text>
          </View>
        </FastImage>
      </View>
    );
  } else if (props.Message.meta.type === 'g') {
    return (
      <View style={styles.g_type_view}>
        <FastImage
          source={{uri: props.Message.meta.image_url}}
          style={styles.g_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.meta.user_dp}}
            size={60}
            containerStyle={styles.g_avatar}
          />
          <View style={styles.g_text_view}>
            <Text style={styles.g_text}>{props.Message.message}</Text>
          </View>
        </FastImage>
      </View>
    );
  } else if (props.Message.meta.type === 'h') {
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
          <View style={styles.h_text_view}>
            <Text style={styles.h_text}>{props.Message.message}</Text>
          </View>
        </FastImage>
      </View>
    );
  } else {
    return <Text style={styles.text}>{props.Message.message.test}</Text>;
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
    backgroundColor: '#fafafa',
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
    backgroundColor: '#fafafa',
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
    backgroundColor: '#fafafa',
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
    height: windowWidth / 2,
    flexDirection: 'column-reverse',
  },
  f_avatar: {
    left: '5%',
  },
  f_text_view: {
    backgroundColor: '#FAFAFA',
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
    height: windowWidth / 2,
    flexDirection: 'column-reverse',
  },
  g_avatar: {
    left: '5%',
  },
  g_text_view: {
    backgroundColor: '#FAFAFA',
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
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
    maxWidth: windowWidth * 0.85,
  },
  h_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
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
