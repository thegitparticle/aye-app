import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Autolink from 'react-native-autolink';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ShowMessage(props) {
  console.log(props.Message);
  if (props.Message.userMetadata.type === 'a') {
    // console.log(props.Message);

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
    //console.log(props.Message.userMetadata.user_dp);

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
  } else if (props.Message.userMetadata.type === 'b') {
    return (
      <View style={styles.b_type_view}>
        <FastImage
          source={{uri: props.Message.file.url}}
          /*
          source={{
            uri:
              'https://i.pinimg.com/564x/7a/25/cb/7a25cbb485702e452f9198fed50f660e.jpg',
          }}
          */
          style={styles.b_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.userMetadata.user_dp}}
            size={60}
            containerStyle={styles.b_avatar}
          />
          <View style={styles.b_text_view}>
            <Text style={styles.b_text}>{props.Message.message.test}</Text>
          </View>
        </FastImage>
      </View>
    );
  } else if (props.Message.userMetadata.type === 'c') {
    return (
      <View style={styles.c_type_view}>
        <FastImage
          source={{uri: props.Message.file.url}}
          /* source={{
            uri:
              'https://i.ibb.co/wdwHmT0/Screen-Shot-2021-03-21-at-12-45-05-PM.png',
          }}
          */
          style={styles.c_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.userMetadata.user_dp}}
            size={60}
            containerStyle={styles.c_avatar}
          />
          <View style={styles.c_text_view}>
            <Text style={styles.c_text}>{props.Message.message.test}</Text>
          </View>
        </FastImage>
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
          <Avatar
            rounded
            source={{uri: props.Message.userMetadata.user_dp}}
            size={60}
            containerStyle={styles.f_avatar}
          />
          <View style={styles.f_text_view}>
            <Text style={styles.f_text}>{props.Message.message}</Text>
          </View>
        </FastImage>
      </View>
    );
  } else if (props.Message.userMetadata.type === 'g') {
    return (
      <View style={styles.g_type_view}>
        <FastImage
          source={{uri: props.Message.userMetadata.image_url}}
          style={styles.g_type_image}>
          <Avatar
            rounded
            source={{uri: props.Message.userMetadata.user_dp}}
            size={60}
            containerStyle={styles.g_avatar}
          />
          <View style={styles.g_text_view}>
            <Text style={styles.g_text}>{props.Message.message}</Text>
          </View>
        </FastImage>
      </View>
    );
  } else if (props.Message.userMetadata.type === 'h') {
    return (
      <View style={styles.h_type_view}>
        <FastImage
          source={{uri: props.item.meta.media_link}}
          style={styles.h_type_image}>
          <Avatar
            rounded
            source={{uri: props.item.meta.user_dp}}
            size={60}
            containerStyle={styles.h_avatar}
          />
          <View style={styles.h_text_view}>
            <Text style={styles.h_text}>
              {props.Message.message.message.test}
            </Text>
          </View>
        </FastImage>
      </View>
    );
  } else {
    return <Text style={styles.text}>{props.Message.message}</Text>;
  }
}

export default ShowMessage;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GothamRounded-Book',
  },
  text2: {
    fontFamily: 'GothamRounded-Book',
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
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
  },
  a_text: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
  },
  d_type_image: {
    width: windowWidth,
    height: windowWidth / 2,
    flexDirection: 'column-reverse',
  },
  d_avatar: {
    left: '5%',
  },
  d_text_view: {
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
  },
  d_text: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
  },

  b_type_image: {
    width: windowWidth,
    height: windowWidth / 2,
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
  },
  b_text: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
  },
  b_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },

  c_type_image: {
    width: windowWidth,
    height: windowWidth / 2,
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
  },
  c_text: {
    fontFamily: 'GothamRounded-Book',
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
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
  },
  f_text: {
    fontFamily: 'GothamRounded-Book',
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
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    padding: 10,
    borderRadius: 5,
  },
  g_text: {
    fontFamily: 'GothamRounded-Book',
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
  },
  h_text: {
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
  },
  h_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
