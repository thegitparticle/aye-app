/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import IconlyDirectIcon from '/Users/san/Desktop/toastgo/src/uibits/IconlyDirectIcon';
import {usePubNub} from 'pubnub-react';
import dayjs from 'dayjs';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function CraftAndSendGifMessage(props) {
  const pubnub = usePubNub();
  const navigation = useNavigation();
  const [textMessage, setTextMessage] = useState('');

  function StartFrame() {
    var timeToken = dayjs().unix();

    var new_frame_notif_payload = {
      pn_gcm: {
        notification: {
          title: props.ChannelID,
          body: 'new frame started',
        },
      },
    };

    if (props.Messages.length === 0) {
      var config = {
        method: 'post',
        url: 'https://apisayepirates.life/api/clubs/create_frames_clubs/',
        headers: {'content-type': 'application/json'},
        data: {
          start_time: timeToken,
          end_time: timeToken + 43200,
          club_name: props.ClubID,
          channel_id: props.ChannelID,
        },
      };

      axios(config)
        .then(
          pubnub.publish(
            {
              channel: props.ChannelID + '_push',
              message: new_frame_notif_payload,
            },
            function (status, response) {
              console.log(status);
            },
          ),
        )
        .catch(error => console.log(error));
    } else {
    }
  }

  const sendMessageNewFrame = message => {
    if (props.Messages.length === 0) {
      console.log('new frame, no messages gif');
      if (message.length === 0) {
        const message = 'jibber$$$';
        pubnub.publish(
          {
            channel: props.ChannelID,
            message,
            meta: {
              type: 'f',
              image_url: props.SelectedGIF,
              user_dp: props.ProfileAvatar,
            },
          },
          function (status, response) {
            console.log(response);
            StartFrame();
          },
        );
      } else {
        pubnub.publish(
          {
            channel: props.ChannelID,
            message,
            meta: {
              type: 'f',
              image_url: props.SelectedGIF,
              user_dp: props.ProfileAvatar,
            },
          },
          function (status, response) {
            console.log(response);
            StartFrame();
          },
        );
      }
    } else {
      console.log('new frame, yes messages gif');
      if (message.length === 0) {
        const message = 'jibber$$$';
        pubnub.publish(
          {
            channel: props.ChannelID,
            message,
            meta: {
              type: 'f',
              image_url: props.SelectedGIF,
              user_dp: props.ProfileAvatar,
            },
          },
          function (status, response) {
            console.log(status);
          },
        );
      } else {
        pubnub.publish(
          {
            channel: props.ChannelID,
            message,
            meta: {
              type: 'f',
              image_url: props.SelectedGIF,
              user_dp: props.ProfileAvatar,
            },
          },
          function (status, response) {
            console.log(status);
          },
        );
      }
    }
  };
  const sendMessageOldFrame = message => {
    console.log('old frame, yes messages');

    if (message.length === 0) {
      const message = 'jibber$$$';
      pubnub.publish(
        {
          channel: props.ChannelID,
          message,
          meta: {
            type: 'f',
            image_url: props.SelectedGIF,
            user_dp: props.ProfileAvatar,
          },
        },
        function (status, response) {
          console.log(status);
        },
      );
    } else {
      pubnub.publish(
        {
          channel: props.ChannelID,
          message,
          meta: {
            type: 'f',
            image_url: props.SelectedGIF,
            user_dp: props.ProfileAvatar,
          },
        },
        function (status, response) {
          console.log(status);
        },
      );
    }
  };

  function HandleGoingBack() {
    props.ToggleOverlay();
  }

  return (
    <SafeAreaView style={styles.gif_selector_craft_items_view}>
      <FastImage
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        source={{uri: props.SelectedGIF}}>
        <View
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 1,
            flexDirection: 'column-reverse',
          }}>
          <Avatar
            rounded
            source={{uri: props.ProfileAvatar}}
            size={60}
            containerStyle={styles.f_avatar}
          />
          <View style={styles.f_text_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={styles.f_text}
              multiline
              autoline
              autoFocus={true}
              maxLength={140}
              onChangeText={text => setTextMessage(text)}
            />
          </View>
        </View>
      </FastImage>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          width: '100%',
        }}>
        <Pressable
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          onPress={() => {
            if (props.ChannelOnGoing) {
              sendMessageOldFrame(textMessage);
            } else {
              sendMessageNewFrame(textMessage);
            }

            Keyboard.dismiss;
            HandleGoingBack();
            //setTextMessage('');
            //props.ToggleOverlay();
          }}>
          <IconlyDirectIcon Color="lightgreen" />
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CraftAndSendGifMessage;

const styles = StyleSheet.create({
  gif_selector_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  gif_selector_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    //justifyContent: 'space-around',
  },
  gif_selector_craft_keyboard_view: {
    flexDirection: 'row',
    width: windowWidth,
  },
  gif_selector_craft_text: {
    color: '#FFFFFF',
    width: windowWidth * 0.9,
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#fafafa25',
    paddingHorizontal: 20,
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
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    left: '15%',
    right: '15%',
    maxWidth: windowWidth * 0.8,
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
});
