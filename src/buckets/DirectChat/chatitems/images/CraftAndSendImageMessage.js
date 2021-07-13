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
  ImageBackground,
} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import {usePubNub} from 'pubnub-react';
import dayjs from 'dayjs';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import ThemeContext from '../../themes/Theme';
import Iconly from '../../external/Iconly';
import {showMessage} from 'react-native-flash-message';
import PubNub from 'pubnub';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function CraftAndSendImageMessage(props) {
  const theme = useContext(ThemeContext);
  // const pubnub = usePubNub();

  const pubnub = new PubNub({
    publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
    subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
    uuid: state_here.MyProfileReducer.myprofile.user.id,
    // logVerbosity: true,
    keepAlive: true,
    heartbeatInterval: 10,
  });

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
          start_time: timeToken - 10,
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
              mimeType: 'image/png',
            },
            meta: {
              type: 'g',
              image_url: props.SelectedImage,
              user_dp: props.ProfileAvatar,
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
              mimeType: 'image/png',
            },
            meta: {
              type: 'g',
              image_url: props.SelectedImage,
              user_dp: props.ProfileAvatar,
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
            mimeType: 'image/png',
          },
          meta: {
            type: 'g',
            image_url: props.SelectedImage,
            user_dp: props.ProfileAvatar,
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
            paddingHorizontal: 10,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            maxWidth: windowWidth * 0.8,
          }}>
          <TextInput
            placeholder="type ......."
            placeholderTextColor={theme.colors.mid_light}
            style={{
              fontFamily: 'GothamRounded-Medium',
              fontSize: 15,
              color: '#050505',
            }}
            multiline
            autoline
            autoFocus={true}
            maxLength={140}
            autoCorrect={false}
            value={textMessage}
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
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        // ...(!keyboardStatus
        //   ? {height: windowHeight}
        //   : {height: windowHeight}),
        // height: windowHeight,
        flex: 0.5,
        justifyContent: 'flex-start',
      }}>
      <Header
        backgroundColor="#131313"
        containerStyle={{borderBottomWidth: 0}}
        barStyle="light-content"
        leftComponent={
          <Pressable
            style={{
              alignSelf: 'flex-start',
              height: windowHeight * 0.05,
              justifyContent: 'flex-start',
            }}
            onPress={() => HandleGoingBack()}>
            <Iconly
              name="CloseSquareBold"
              color={theme.colors.off_light}
              size={30}
            />
          </Pressable>
        }
        rightComponent={
          <Pressable
            style={{
              alignSelf: 'flex-end',
              height: windowHeight * 0.05,
              justifyContent: 'flex-start',
            }}
            onPress={() => {
              Keyboard.dismiss();
              captureRef(viewShotImagePickerRef, {
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
                  console.log('Image saved to', uri);
                });
            }}>
            <Iconly
              name="SendBold"
              color={theme.colors.success_green}
              size={30}
            />
          </Pressable>
        }
      />
      <ViewShot
        ref={viewShotImagePickerRef}
        options={{format: 'png', quality: 0.9}}>
        <ImageBackground
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
        </ImageBackground>
      </ViewShot>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(CraftAndSendImageMessage);

const styles = StyleSheet.create({
  image_selector_craft_items_view: {
    alignItems: 'center',
    minHeight: windowHeight * 0.8,
    flex: 1,
    justifyContent: 'center',
  },
  image_selector_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
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
    minWidth: windowWidth * 0.8,
    maxWidth: windowWidth * 0.8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  g_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#050505',
  },
  g_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
