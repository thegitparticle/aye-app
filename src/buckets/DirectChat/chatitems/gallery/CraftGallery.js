import React, {useState, useRef, useContext} from 'react';
import {View, Pressable, TextInput, Dimensions, Keyboard} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import ThemeContext from '../../../../themes/Theme';
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import Iconly from '../../../../external/Iconly';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {useStyle} from 'react-native-style-utilities';
import {BlurView} from 'expo-blur';
import PubNub from 'pubnub';
import {Pulse} from 'react-native-loader';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function CraftGallery(props) {
  const theme = useContext(ThemeContext);
  const pubnub = new PubNub({
    publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
    subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
    uuid: state_here.MyProfileReducer.myprofile.user.id,
  });
  const navigation = useNavigation();

  const [textMessage, setTextMessage] = useState('');

  const viewShotCameraPickerRef = useRef(null);

  const [textOpacity, setTextOpacity] = useStateWithCallbackLazy(1);

  function StartFrame() {
    var timeToken = dayjs().unix();
    var all_ids = _.split(props.channelID, '_');

    var new_frame_notif_payload = {
      pn_gcm: {
        data: {
          channel: props.channelID,
        },
        notification: {
          title: props.nameCraftsman,
          body: 'new frame started',
          sound: 'default',
        },
      },
    };

    if (props.messages.length === 0) {
      var config = {
        method: 'post',
        url: 'https://apisayepirates.life/api/clubs/create_frames_clubs/',
        headers: {'content-type': 'application/json'},
        data: {
          start_time: timeToken,
          end_time: timeToken + 43200,
          users: all_ids[0] + ',' + all_ids[1],
          channel_id: props.channelID,
        },
      };

      axios(config)
        .then(
          pubnub.publish(
            {
              channel: props.channelID + '_push',
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

  function Children() {
    return (
      <View>
        <BlurView style={text_input_blur_view} intensity={75} tint="light">
          <View style={text_input_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={text_input}
              multiline
              autoline
              autoCorrect={false}
              autoFocus={true}
              maxLength={140}
              value={textMessage}
              onChangeText={text => setTextMessage(text)}
            />
          </View>
        </BlurView>
        <Avatar
          rounded
          source={{uri: state_here.MyProfileReducer.myprofile.image}}
          size={60}
          containerStyle={avatar_style}
        />
      </View>
    );
  }

  const avatar_style = useStyle(
    () => [
      {
        left: '5%',
      },
    ],
    [],
  );

  const overall_view_wrap = useStyle(
    () => [
      {
        flex: 1,
        backgroundColor: '#131313',
        alignItems: 'center',
      },
    ],
    [],
  );

  const image_style = useStyle(
    () => [
      {
        width: windowWidth,
        height: windowHeight * 0.8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
    ],
    [],
  );

  const close_button_style = useStyle(
    () => [
      {
        alignSelf: 'flex-start',
        height: windowHeight * 0.05,
        justifyContent: 'flex-end',
      },
    ],
    [],
  );

  const send_button_style = useStyle(
    () => [
      {
        alignSelf: 'flex-end',
        height: windowHeight * 0.05,
        justifyContent: 'flex-end',
      },
    ],
    [],
  );

  const text_input_blur_view = useStyle(
    () => [
      {
        overflow: 'hidden',
        alignSelf: 'flex-start',
        left: windowWidth * 0.05 + 30,
        right: windowWidth * 0.05,
        padding: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        opacity: textOpacity,
      },
    ],
    [textOpacity],
  );

  const text_input_view = useStyle(
    () => [
      {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        maxWidth: windowWidth * 0.8,
        flexDirection: 'row',
      },
    ],
    [],
  );

  const text_input = useStyle(
    () => [
      {
        fontFamily: 'GothamRounded-Medium',
        fontSize: 15,
        color: '#050505',
      },
    ],
    [],
  );

  function HandleGoingBack() {
    navigation.goBack();
  }

  const sendMessageNewFrame = (shot, message) => {
    var messages_here = props.messages;
    if (messages_here.length === 0) {
      console.log('new frame, no live messsages here');
      pubnub.sendFile(
        {
          channel: props.channelID,
          message: {
            test: '',
          },
          file: {
            uri: shot,
            name: 'galgalgal',
            mimeType: 'jpg',
          },
          meta: {
            type: 'b',
            user_dp: state_here.MyProfileReducer.myprofile.image,
            view_shot: shot,
          },
        },
        function (status, response) {
          if (response.timetoken > 0) {
            StartFrame();
          }
          HandleGoingBack();
          setSendingShow(false);
        },
      );
    } else {
      console.log('new frame, yes live messsages here');
      pubnub.sendFile(
        {
          channel: props.channelID,
          message: {
            test: '',
          },
          file: {
            uri: shot,
            name: 'galgalgal',
            mimeType: 'jpg',
          },
          meta: {
            type: 'b',
            user_dp: state_here.MyProfileReducer.myprofile.image,
            view_shot: shot,
          },
        },
        function (status, response) {
          HandleGoingBack();
          setSendingShow(false);
        },
      );
    }
  };
  const sendMessageOldFrame = (shot, message) => {
    console.log('old frame, yes messages');
    pubnub.sendFile(
      {
        channel: props.channelID,
        message: {
          test: '',
        },
        file: {
          uri: shot,
          name: 'galgalgal',
          mimeType: 'jpg',
        },
        meta: {
          type: 'b',
          user_dp: state_here.MyProfileReducer.myprofile.image,
          view_shot: shot,
        },
      },
      function (status, response) {
        HandleGoingBack();
        setSendingShow(false);
      },
    );
  };

  const [sendingShow, setSendingShow] = useState(false);

  function SendButton() {
    if (!sendingShow) {
      return (
        <Iconly name="SendBold" color={theme.colors.success_green} size={30} />
      );
    } else {
      return <Pulse size={10} color={theme.colors.success_green} />;
    }
  }

  return (
    <View style={overall_view_wrap}>
      <Header
        backgroundColor="#131313"
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{borderBottomWidth: 0}}
        barStyle="light-content"
        leftComponent={
          <Pressable
            style={close_button_style}
            onPress={() => navigation.goBack()}>
            <Iconly
              name="CloseSquareBold"
              color={theme.colors.off_light}
              size={30}
            />
          </Pressable>
        }
        rightComponent={
          <Pressable
            style={send_button_style}
            onPress={() => {
              setSendingShow(true);
              if (textMessage.length === 0) {
                setTextOpacity(0, textOpacity => {
                  if (textOpacity === 0) {
                    Keyboard.dismiss();
                    captureRef(viewShotCameraPickerRef, {
                      format: 'png',
                      quality: 0.9,
                    })
                      .then(uri => {
                        if (props.channelOnGoing) {
                          sendMessageOldFrame(uri, textMessage);
                        } else {
                          sendMessageNewFrame(uri, textMessage);
                        }
                      })
                      .then(uri => {
                        console.log('Image saved to', uri);
                      });
                  } else {
                    Keyboard.dismiss();
                  }
                });
              } else {
                Keyboard.dismiss();
                captureRef(viewShotCameraPickerRef, {
                  format: 'png',
                  quality: 0.9,
                })
                  .then(uri => {
                    if (props.channelOnGoing) {
                      sendMessageOldFrame(uri, textMessage);
                    } else {
                      sendMessageNewFrame(uri, textMessage);
                    }
                  })
                  .then(uri => {
                    console.log('Image saved to', uri);
                  });
              }
            }}>
            <SendButton />
          </Pressable>
        }
      />
      <ViewShot
        ref={viewShotCameraPickerRef}
        options={{format: 'png', quality: 0.9}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: 'transparent'}}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <FastImage
            style={image_style}
            source={{
              uri: props.galleryPicked,
            }}>
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
        </Pressable>
      </ViewShot>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(CraftGallery);
