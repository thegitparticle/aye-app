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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function CraftAndSendGalleryMessage(props) {
  const pubnub = usePubNub();

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
    console.log('sending picked image - new frames');
    var messages_here = props.Messages;
    if (messages_here.length === 0) {
      console.log('no live messsages here');
      //if (message) {
      pubnub.sendFile(
        {
          channel: props.ChannelID,
          message: {
            test: message,
            //value: 42
          },
          file: {
            uri: props.SelectedGalleryShot,
            name: props.SelectedGalleyShotName,
            mimeType: props.SelectedGalleryShotMime,
          },
          meta: {
            type: 'b',
            user_dp: props.ProfileAvatar,
          },
        },
        function (status, response) {
          StartFrame();
          console.log(status);
        },
      );

      //.then(() => changeTypevalue(''))
      //.catch(err => console.log(err));
      // } else {
      //}
    } else {
      console.log('yes live messsages here');
      //if (message) {
      pubnub.sendFile(
        {
          channel: props.ChannelID,
          message: {
            test: message,
            //value: 42
          },
          file: {
            uri: props.SelectedGalleryShot,
            name: props.SelectedGalleyShotName,
            mimeType: props.SelectedGalleryShotMime,
          },
          meta: {
            type: 'b',
            user_dp: props.ProfileAvatar,
          },
        },
        function (status, response) {
          console.log(status);
        },
      );
      //.then(() => changeTypevalue(''))
      //.catch(err => console.log(err));
      //} else {
      //}
    }
  };
  const sendMessageOldFrame = message => {
    console.log('sending picked image - old frame');
    //if (message) {
    pubnub.sendFile(
      {
        channel: props.ChannelID,
        message: {
          test: message,
          //value: 42
        },
        file: {
          uri: props.SelectedGalleryShot,
          name: props.SelectedGalleyShotName,
          mimeType: props.SelectedGalleryShotMime,
        },
        meta: {
          type: 'b',
          user_dp: props.ProfileAvatar,
        },
      },
      function (status, response) {
        console.log(status);
      },
    );
    //.catch(err => console.log(err));
    // } else {
    //}
  };

  function HandleGoingBack() {
    props.ToggleOverlay();
  }

  return (
    <SafeAreaView style={styles.image_picker_craft_items_view}>
      <FastImage
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        source={{uri: props.SelectedGalleryShot}}>
        <View
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 1,
            flexDirection: 'column-reverse',
          }}>
          <Avatar
            rounded
            source={{url: props.ProfileAvatar}}
            size={60}
            containerStyle={styles.g_avatar}
          />
          <View style={styles.g_text_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={styles.g_text}
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
            setTextMessage('');
            HandleGoingBack();
          }}>
          <IconlyDirectIcon Color="lightgreen" />
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CraftAndSendGalleryMessage;

const styles = StyleSheet.create({
  image_picker_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  image_picker_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    //justifyContent: 'space-around',
  },
  image_picker_craft_keyboard_view: {
    flexDirection: 'row',
    width: windowWidth,
  },
  image_picker_craft_text: {
    color: '#fafafa',
    width: windowWidth * 0.9,
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#fafafa25',
    paddingHorizontal: 20,
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
    maxWidth: windowWidth * 0.8,
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
});
