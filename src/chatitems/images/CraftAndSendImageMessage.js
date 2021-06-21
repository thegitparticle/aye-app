/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useContext} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import IconlyDirectIcon from '/Users/san/Desktop/toastgo/src/uibits/IconlyDirectIcon';
import {usePubNub} from 'pubnub-react';
import dayjs from 'dayjs';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import ThemeContext from '../../themes/Theme';
import IconlyCloseSquareIcon from '../../uibits/IconlyCloseSquareIcon';
import {showMessage} from 'react-native-flash-message';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function CraftAndSendImageMessage(props) {
  const theme = useContext(ThemeContext);
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

  const sendMessageNewFrame = (shot, message) => {
    var messages_here = props.Messages;
    if (messages_here.length === 0) {
      if (message) {
        pubnub.sendFile(
          {
            channel: props.ChannelID,
            message: {
              test: '',
            },
            file: {
              uri: shot,
              name: 'galgalgal',
              mimeType: 'jpg',
            },
            meta: {
              type: 'g',
              image_url: props.SelectedImage,
              user_dp: props.ProfileAvatar,
              view_shot: shot,
            },
          },
          function (status, response) {
            console.log(status);
            StartFrame();
          },
        );
      } else {
        showMessage({
          message: 'write a message to send',
          type: 'info',
          backgroundColor: theme.colors.danger_red,
        });
      }
    } else {
      if (message) {
        pubnub.sendFile(
          {
            channel: props.ChannelID,
            message: {
              test: '',
            },
            file: {
              uri: shot,
              name: 'galgalgal',
              mimeType: 'jpg',
            },
            meta: {
              type: 'g',
              image_url: props.SelectedImage,
              user_dp: props.ProfileAvatar,
              view_shot: shot,
            },
          },
          function (status, response) {
            console.log(status);
          },
        );
      } else {
        showMessage({
          message: 'write a message to send',
          type: 'info',
          backgroundColor: theme.colors.danger_red,
        });
      }
    }
  };
  const sendMessageOldFrame = (shot, message) => {
    if (message) {
      pubnub.sendFile(
        {
          channel: props.ChannelID,
          message: {
            test: '',
          },
          file: {
            uri: shot,
            name: 'galgalgal',
            mimeType: 'jpg',
          },
          meta: {
            type: 'g',
            image_url: props.SelectedImage,
            user_dp: props.ProfileAvatar,
            view_shot: shot,
          },
        },
        function (status, response) {
          console.log(status);
        },
      );
    } else {
      showMessage({
        message: 'write a message to send',
        type: 'info',
        backgroundColor: theme.colors.danger_red,
      });
    }
  };

  function HandleGoingBack() {
    props.ToggleOverlay();
  }

  const viewShotImagePickerRef = useRef(null);

  function Children() {
    return (
      <View>
        <View
          style={{
            backgroundColor: theme.colors.full_light,
            alignSelf: 'flex-start',
            left: windowWidth * 0.05 + 30,
            right: windowWidth * 0.05,
            padding: 10,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            maxWidth: windowWidth * 0.8,
          }}>
          <TextInput
            placeholder="type..."
            placeholderTextColor={theme.colors.mid_light}
            style={styles.g_text}
            multiline
            autoline
            autoFocus={true}
            maxLength={140}
            onChangeText={text => setTextMessage(text)}
          />
        </View>
        <Avatar
          rounded
          source={{uri: props.ProfileAvatar}}
          size={60}
          containerStyle={styles.g_avatar}
        />
      </View>
    );
  }

  return (
    <View style={styles.image_selector_craft_items_view}>
      <Header
        backgroundColor="#131313"
        containerStyle={{borderBottomWidth: 0}}
        barStyle="light-content"
        leftComponent={
          <Pressable
            style={{
              alignSelf: 'flex-start',
              height: windowHeight * 0.05,
              justifyContent: 'flex-end',
            }}
            onPress={() => HandleGoingBack()}>
            <IconlyCloseSquareIcon />
          </Pressable>
        }
        rightComponent={
          <Pressable
            style={{
              alignSelf: 'flex-end',
              height: windowHeight * 0.05,
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              Keyboard.dismiss();
              captureRef(viewShotImagePickerRef, {
                format: 'jpg',
                quality: 0.9,
              })
                .then(uri => {
                  if (props.channelOnGoing) {
                    sendMessageOldFrame(uri, textMessage);
                  } else {
                    sendMessageNewFrame(uri, textMessage);
                  }

                  HandleGoingBack();
                })
                .then(uri => {
                  console.log('Image saved to', uri);
                });
            }}>
            <IconlyDirectIcon Color={theme.colors.success_green} />
          </Pressable>
        }
      />
      <ViewShot
        ref={viewShotImagePickerRef}
        options={{format: 'jpg', quality: 0.9}}>
        <FastImage
          style={{
            width: windowWidth,
            height: undefined,
            aspectRatio: 1,
            marginVertical: windowHeight * 0.01,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
          source={{uri: props.SelectedImage}}>
          <Draggable
            children={Children()}
            x={0}
            y={windowWidth * 0.7}
            minX={windowWidth * 0.0}
            minY={windowHeight * 0.01}
            maxX={windowWidth * 0.8}
            maxY={windowWidth}
          />
        </FastImage>
      </ViewShot>
    </View>
  );
}

export default CraftAndSendImageMessage;

const styles = StyleSheet.create({
  image_selector_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  image_selector_craft_items_view: {},
  image_selector_craft_keyboard_view: {
    flexDirection: 'row',
    width: windowWidth,
  },
  image_selector_craft_text: {
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
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  g_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
