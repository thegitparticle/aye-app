import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {usePubNub} from 'pubnub-react';
import dayjs from 'dayjs';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CraftAndSendLinkMessage(props) {
  const pubnub = usePubNub();
  const [copiedText, setCopiedText] = useState('');

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

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    if (await Clipboard.hasURL()) {
      console.log(await Clipboard.hasURL());
      setCopiedText(text);
    } else {
      showMessage({
        message: 'Please paste only links here',
        type: 'info',
        backgroundColor: 'indianred',
      });
    }
  };

  const sendMessageNewFrame = message => {
    var messages_here = props.Messages;
    if (messages_here.length === 0) {
      if (message) {
        pubnub.publish(
          {
            channel: props.ChannelID,
            message,
            meta: {
              type: 'd',
              pasted_url: copiedText,
              pasted_dp: props.ProfileAvatar,
            },
          },
          function (status, response) {
            console.log(status);
            StartFrame();
          },
        );
      } else {
      }
    } else {
      if (message) {
        pubnub.publish(
          {
            channel: props.ChannelID,
            message,
            meta: {
              type: 'd',
              pasted_url: copiedText,
              pasted_dp: props.ProfileAvatar,
            },
          },
          function (status, response) {
            console.log(status);
          },
        );
      } else {
      }
    }
  };
  const sendMessageOldFrame = message => {
    if (message) {
      pubnub.publish(
        {
          channel: props.ChannelID,
          message,
          meta: {
            type: 'd',
            pasted_url: copiedText,
            pasted_dp: props.ProfileAvatar,
          },
        },
        function (status, response) {
          console.log(status);
        },
      );
    } else {
    }
  };

  function HandleGoingBack() {
    props.ToggleOverlay();
  }

  function ButtonHere() {
    if (copiedText.length > 0) {
      return (
        <Button
          title="Send"
          type="solid"
          onPress={() => {
            if (props.ChannelOnGoing) {
              sendMessageOldFrame(copiedText);
            } else {
              sendMessageNewFrame(copiedText);
            }
            HandleGoingBack();
          }}
          titleStyle={styles.send_pasted_link_button_title_style}
          buttonStyle={styles.send_pasted_link_button_style}
          containerStyle={styles.send_pasted_link_button_container}
        />
      );
    } else {
      return (
        <Button
          title="Paste"
          type="solid"
          onPress={() => fetchCopiedText()}
          titleStyle={styles.paste_button_title_style}
          buttonStyle={styles.paste_button_style}
          containerStyle={styles.paste_button_container}
        />
      );
    }
  }

  return (
    <View style={styles.paste_link_overlay_view}>
      <Text style={styles.paste_link_heading}>only links can be sent</Text>
      <Text style={styles.paste_link_copied_string}>{copiedText}</Text>
      <ButtonHere />
    </View>
  );
}

export default CraftAndSendLinkMessage;

const styles = StyleSheet.create({
  paste_link_overlay_style: {
    height: 180,
    width: windowWidth * 0.8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paste_link_overlay_view: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 180,
    width: windowWidth * 0.8,
  },

  paste_link_heading: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#050505',
    marginTop: 15,
  },

  paste_link_copied_string: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: 'dodgerblue',
    marginTop: 15,
  },

  paste_button_container: {
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'dodgerblue',
  },

  paste_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: 'white',
  },

  paste_button_style: {
    backgroundColor: 'dodgerblue',
  },

  send_pasted_link_button_container: {
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'lightgreen',
  },

  send_pasted_link_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: 'white',
  },

  send_pasted_link_button_style: {
    backgroundColor: '#36B37E',
  },
});
