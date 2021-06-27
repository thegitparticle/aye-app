/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useContext} from 'react';
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
import {useStateWithCallbackLazy} from 'use-state-with-callback';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function CraftAndSendCameraMessage(props) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();

  const [textMessage, setTextMessage] = useState('');

  function StartFrame() {
    var timeToken = dayjs().unix();

    var new_frame_notif_payload = {
      pn_gcm: {
        notification: {
          title: props.ClubName,
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
      pubnub.sendFile(
        {
          channel: props.ChannelID,
          message: {
            test: '',
          },
          file: {
            uri: shot,
            name: 'galgalgal',
            mimeType: 'png',
          },
          meta: {
            type: 'c',
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
      pubnub.sendFile(
        {
          channel: props.ChannelID,
          message: {
            test: '',
          },
          file: {
            uri: shot,
            name: 'galgalgal',
            mimeType: 'png',
          },
          meta: {
            type: 'c',
            user_dp: props.ProfileAvatar,
            view_shot: shot,
          },
        },
        function (status, response) {
          console.log(status);
        },
      );
    }
  };
  const sendMessageOldFrame = (shot, message) => {
    pubnub.sendFile(
      {
        channel: props.ChannelID,
        message: {
          test: '',
        },
        file: {
          uri: shot,
          name: 'galgalgal',
          mimeType: 'png',
        },
        meta: {
          type: 'c',
          user_dp: props.ProfileAvatar,
          view_shot: shot,
        },
      },
      function (status, response) {
        console.log(status);
      },
    );
  };

  function HandleGoingBack() {
    props.ToggleOverlay();
  }

  const viewShotCameraPickerRef = useRef(null);

  const [textOpacity, setTextOpacity] = useStateWithCallbackLazy(1);

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
            opacity: textOpacity,
          }}>
          <TextInput
            placeholder="type..."
            placeholderTextColor="#fafafa50"
            style={styles.c_text}
            multiline
            autoline
            autoCorrect={false}
            autoFocus={true}
            maxLength={140}
            value={textMessage}
            onChangeText={text => setTextMessage(text)}
          />
        </View>
        <Avatar
          rounded
          source={{uri: props.ProfileAvatar}}
          size={60}
          containerStyle={styles.c_avatar}
        />
      </View>
    );
  }

  return (
    <View style={styles.camera_picker_craft_items_view}>
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
              if (textMessage.length === 0) {
                setTextOpacity(0, textOpacity => {
                  if (textOpacity === 0) {
                    Keyboard.dismiss();
                    // console.log('first' + textOpacity);

                    captureRef(viewShotCameraPickerRef, {
                      format: 'png',
                      quality: 0.9,
                    })
                      .then(uri => {
                        if (props.ChannelOnGoing) {
                          sendMessageOldFrame(uri, textMessage);
                        } else {
                          sendMessageNewFrame(uri, textMessage);
                        }
                        HandleGoingBack();
                      })
                      .then(uri => {
                        // console.log('Image saved to', uri);
                      });
                  } else {
                    Keyboard.dismiss();
                    // console.log('second' + textOpacity);
                  }
                });
              } else {
                Keyboard.dismiss();
                captureRef(viewShotCameraPickerRef, {
                  format: 'png',
                  quality: 0.9,
                })
                  .then(uri => {
                    if (props.ChannelOnGoing) {
                      sendMessageOldFrame(uri, textMessage);
                    } else {
                      sendMessageNewFrame(uri, textMessage);
                    }

                    HandleGoingBack();
                  })
                  .then(uri => {
                    // console.log('Image saved to', uri);
                  });
              }
            }}>
            <IconlyDirectIcon Color={theme.colors.success_green} />
          </Pressable>
        }
      />
      <ViewShot
        ref={viewShotCameraPickerRef}
        options={{format: 'png', quality: 0.9}}
        style={{backgroundColor: 'transparent'}}>
        <FastImage
          style={{
            width: windowWidth,
            height: undefined,
            aspectRatio: 1,
            marginVertical: windowHeight * 0.01,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
          source={{uri: props.SelectedCameraShot}}>
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

export default CraftAndSendCameraMessage;

const styles = StyleSheet.create({
  camera_picker_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  camera_picker_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    //justifyContent: 'space-around',
  },
  camera_picker_craft_keyboard_view: {
    flexDirection: 'row',
    width: windowWidth,
  },
  camera_picker_craft_text: {
    color: '#fafafa',
    width: windowWidth * 0.9,
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#fafafa25',
    paddingHorizontal: 20,
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
    maxWidth: windowWidth * 0.8,
  },
  c_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
  },
  c_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
