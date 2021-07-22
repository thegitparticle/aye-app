/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SectionList,
  FlatList,
} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import axios from 'axios';
import {connect} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import dayjs from 'dayjs';
import ShowMessage from '../bits/ShowMessage';
import ShowMessageOld from '../bits/ShowMessageOld';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {BlurView} from '@react-native-community/blur';
import {MixpanelContext} from '../../../external/MixPanelStuff';
import _ from 'lodash';
import RecosOverlay from '../chatitems/typed/RecosOverlay';
import ChosenRecoItem from '../chatitems/typed/ChosenRecoItem';
import ThemeContext from '../../../themes/Theme';
import Iconly from '../../../external/Iconly';
import {SquircleView} from 'react-native-figma-squircle';
import PubNub from 'pubnub';
import {SetCurrentChannel} from '../../../redux/CurrentChannelActions';
import {Bubbles, Pulse} from 'react-native-loader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = {};

const background_color = '#FAFAFA';
const header_color = 'transparent';
const input_border_color = '#EEEEEE';
const header_bar_style = 'dark-content';
const input_background_color = '#EEEEEE';
const other_input_background_color = '#FAFAFA';
const reco_background_color = 'transparent';
const font_color_input = '#050505';
const font_color_header = '#050505';
const header_back_image = '/Users/san/Desktop/toastgo/assets/3.jpeg';

function DirectChatScreen({navigation, dispatch, route}) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();
  const {
    clubNameHere,
    channelIdHere,
    channelOnGoing,
    channelEndTime,
    channelStartTime,
  } = route.params;
  const [channelsHere] = useState([channelIdHere]);

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Directs Chat Screen');
    dispatch(SetCurrentChannel(channelIdHere));
  }, []);

  const name_of_craftsman =
    state_here.MyProfileReducer.myprofile.user.full_name;

  const [messages, addMessage] = useState([]);
  const [nowTimeStamp, setNowTimeStamp] = useState('');
  const [old_messages, addOldMessages] = useState();
  const [old_messages_resolve, changeOldMessagesResolve] = useState(false);

  useEffect(() => {
    setNowTimeStamp(dayjs().valueOf());
  }, []);

  function LeftHeaderComponent() {
    return (
      <Pressable
        style={{
          width: 75,
          height: 35,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        onPress={() =>
          navigation.navigate('DirectFramesList', {
            direct_id: channelIdHere,
            other_name: clubNameHere,
          })
        }>
        <Icon type="feather" color={theme.colors.off_dark} name="layers" />
      </Pressable>
    );
  }

  function RightHeaderComponent() {
    return (
      <Pressable
        style={{
          width: 75,
          height: 35,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Iconly
          name="ChevronDownBroken"
          color={theme.colors.off_dark}
          size={30}
        />
      </Pressable>
    );
  }

  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {clubNameHere.substring(0, 15)}
        </Text>
      </View>
    );
  }

  function CheckFrameLapsedOrNot() {
    if (typeof channelEndTime === 'number') {
      if (channelEndTime > dayjs().unix()) {
      } else {
        console.log(channelEndTime);
        showMessage({
          message: 'Oops! frame expired.',
          type: 'info',
          backgroundColor: 'indianred',
        });
        navigation.goBack();
      }
    } else {
    }
  }

  const OtherInputBar = useMemo(
    () =>
      function OtherInputBarY() {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: windowWidth * 0.95,
              height: '100%',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CameraModalD', {
                  channelOnGoing: channelOnGoing,
                  channelID: channelsHere[0],
                  clubName: clubNameHere,
                  messages: messages,
                  nameCraftman: name_of_craftsman,
                })
              }>
              <SquircleView
                style={{
                  width: windowWidth * 0.45,
                  height: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 10,
                  fillColor: 'transparent',
                  strokeColor: theme.colors.off_light,
                  strokeWidth: 1,
                }}>
                <FastImage
                  style={{width: 40, height: 40}}
                  source={require('../assets/camera.png')}
                />
              </SquircleView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MediaModalD', {
                  channelOnGoing: channelOnGoing,
                  channelID: channelsHere[0],
                  clubName: clubNameHere,
                  messages: messages,
                  nameCraftman: name_of_craftsman,
                })
              }>
              <SquircleView
                style={{
                  width: windowWidth * 0.45,
                  height: '60%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 10,
                  fillColor: 'transparent',
                  strokeColor: theme.colors.off_light,
                  strokeWidth: 1,
                }}>
                <FastImage
                  style={{width: 40, height: 40}}
                  source={require('../assets/media.png')}
                />
              </SquircleView>
            </TouchableOpacity>
          </View>
        );
      },
    [messages],
  );

  const [didFrameStart, setDidFrameStart] = useState(false);

  const handleMessage = event => {
    if (messages.length === 0) {
      setDidFrameStart(true);

      if (messages.includes(event) === false) {
        addMessage(messages => [...messages, event]);
      } else {
        addMessage(messages);
      }
    } else {
      if (messages.includes(event) === false) {
        addMessage(messages => [...messages, event]);
      } else {
        addMessage(messages);
      }
    }
  };

  useEffect(() => {
    pubnub.subscribe({channels: channelsHere});
    if (!channelOnGoing) {
      console.log(nowTimeStamp + 'on going subcrube time stamp');

      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: nowTimeStamp,
          count: 100, // default/max is 25 messages for multiple channels (up to 500)
        },
        function (status, response) {
          if (response) {
            changeOldMessagesResolve(true);
            addOldMessages(response);
          }
        },
      );
    } else {
      var now_here = dayjs().valueOf();
      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: channelStartTime + '0000000',
          start: now_here + '0000',
          count: 100, // default/max is 25 messages for multiple channels (up to 500)
        },
        function (status, response) {
          if (response) {
            addOldMessages(response);
            changeOldMessagesResolve(true);
          }
        },
      );
    }
    pubnub.addListener({message: handleMessage});
    pubnub.addListener({file: handleMessage});
  }, [pubnub, channelsHere]);

  const LiveMessagesView = useMemo(
    () =>
      function LiveMessagesViewX() {
        if (!old_messages_resolve) {
          return (
            <View
              style={{
                flexGrow: 1,
                width: windowWidth,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 0,
                margin: 0,
                backgroundColor: background_color,
              }}>
              <Bubbles size={10} color={theme.colors.you_prime} />
            </View>
          );
        } else {
          if (!channelOnGoing) {
            var a_here = _.uniqBy(messages, 'timetoken').reverse();

            function RenderOldOrNew(props) {
              var y_here = props.Message.item;

              if (y_here.meta) {
                return (
                  <Pressable onPress={() => Keyboard.dismiss()}>
                    <ShowMessageOld Message={y_here} />
                  </Pressable>
                );
              } else {
                return (
                  <Pressable onPress={() => Keyboard.dismiss()}>
                    <ShowMessage Message={y_here} />
                  </Pressable>
                );
              }
            }

            if (a_here.length > 0) {
              return (
                <FlatList
                  data={a_here}
                  keyExtractor={(item, index) => item + index}
                  renderItem={item => <RenderOldOrNew Message={item} />}
                  inverted={true}
                  showsVerticalScrollIndicator={false}
                />
              );
            } else {
              return (
                <View
                  style={{
                    flexGrow: 1,
                    width: windowWidth,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 0,
                    margin: 0,
                    backgroundColor: background_color,
                  }}>
                  <Text
                    style={{
                      ...theme.text.callout,
                      color: theme.colors.mid_dark_25,
                    }}>
                    talk to start new frame!
                  </Text>
                </View>
              );
            }
          } else {
            if (Object.entries(old_messages.channels).length === 0) {
              console.log('no old messages');

              var b_here = _.uniqBy(messages, 'timetoken').reverse();

              function RenderOldOrNew(props) {
                var y_here = props.Message.item;

                if (y_here.meta) {
                  return (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessageOld Message={y_here} />
                    </Pressable>
                  );
                } else {
                  return (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessage Message={y_here} />
                    </Pressable>
                  );
                }
              }

              return (
                <FlatList
                  data={b_here}
                  keyExtractor={(item, index) => item + index}
                  renderItem={item => <RenderOldOrNew Message={item} />}
                  inverted={true}
                  showsVerticalScrollIndicator={false}
                />
              );
            } else {
              const [moreOldMessages, setMoreOldMessages] = useState([]);

              if (moreOldMessages) {
                var s_here = [
                  {
                    data: _.uniqBy(messages, 'timetoken').reverse(),
                  },
                  {
                    data: _.concat(
                      old_messages.channels[channelIdHere].reverse(),
                      moreOldMessages.reverse(),
                    ),
                  },
                ];
              } else {
                var s_here = [
                  {
                    data: _.uniqBy(messages, 'timetoken').reverse(),
                  },
                  {
                    data: _.concat(
                      old_messages.channels[channelIdHere].reverse(),
                    ),
                  },
                ];
              }

              function GetMoreMessages() {
                var old_here = old_messages.channels[channelIdHere].reverse();

                var last_time_token = old_here[0].timetoken;

                pubnub.fetchMessages(
                  {
                    channels: [channelsHere],
                    includeMeta: true,
                    end: channelStartTime + '0000000',
                    start: last_time_token,
                    count: 100, // default/max is 25 messages for multiple channels (up to 500)
                  },
                  function (status, response) {
                    if (response) {
                      setMoreOldMessages(response.channels[channelIdHere]);
                    }
                  },
                );
              }

              function RenderOldOrNew(props) {
                var y_here = props.Message.item;

                if (y_here.meta) {
                  return (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessageOld Message={y_here} />
                    </Pressable>
                  );
                } else {
                  return (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessage Message={y_here} />
                    </Pressable>
                  );
                }
              }

              return (
                <SectionList
                  sections={s_here}
                  keyExtractor={(item, index) => item + index}
                  renderItem={item => <RenderOldOrNew Message={item} />}
                  inverted={true}
                  showsVerticalScrollIndicator={false}
                  onEndReached={GetMoreMessages}
                  extraData={moreOldMessages}
                />
              );
            }
          }
        }
      },
    [messages, old_messages],
  );

  function StartFrame() {
    var all_ids = _.split(channelIdHere, '_');
    var timeToken = dayjs().unix();

    var new_frame_notif_payload = {
      pn_gcm: {
        notification: {
          title: name_of_craftsman,
          body: 'new frame started',
        },
      },
    };

    if (messages.length === 0) {
      var config = {
        method: 'post',
        //url: 'https://apisayepirates.life/api/clubs/create_frames_clubs/',

        url: 'https://apisayepirates.life/api/clubs/create_frames_one_on_one/',
        headers: {'content-type': 'application/json'},
        data: {
          start_time: timeToken,
          end_time: timeToken + 43200,
          channel_id: channelIdHere,
          users: all_ids[0] + ',' + all_ids[1],
        },
      };

      axios(config)
        .then(() => setDidFrameStart(true))
        .then(
          pubnub.publish(
            {
              channel: channelIdHere + '_push',
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

  const InputXXX = useMemo(
    () =>
      function InputXXXx() {
        const [didFrameStartInside, setDidFrameStartInside] = useState(false);
        useEffect(() => {
          Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
          Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
          if (didFrameStart) {
            setDidFrameStartInside(true);
          }
          // cleanup function
          return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
          };
        }, []);

        const [typevalue, changeTypevalue] = useState('');
        const [selectedValue, changeSelectedValue] = useState('');

        const [pick, setPick] = useState('');

        const [keyboardStatus, setKeyboardStatus] = useState(false);

        const [sendingShow, setSendingShow] = useState(false);

        const _keyboardDidShow = () => {
          setKeyboardStatus(true);
          CheckFrameLapsedOrNot();
        };
        const _keyboardDidHide = () => setKeyboardStatus(false);

        function SetChosenMedia(image_link) {
          setPick(image_link);
        }

        function SetChosenMediaEmpty() {}

        function RecoOverLayHereShow() {
          if (keyboardStatus) {
            return (
              <View
                keyboardShouldPersistTaps={'always'}
                style={{
                  flexDirection: 'row',
                  width: windowWidth,
                  alignItems: 'center',
                }}>
                <ChosenRecoItem Link={pick} />
                <RecosOverlay
                  UserID={state_here.MyProfileReducer.myprofile.user.id}
                  TypeValue={typevalue}
                  SelectedValue={selectedValue}
                  SetChosenMediaEmpty={SetChosenMediaEmpty}
                  SetChosenMedia={SetChosenMedia}
                />
              </View>
            );
          } else {
            return <View />;
          }
        }

        var new_message_notif_payload = {
          pn_gcm: {
            notification: {
              title: name_of_craftsman,
              body: `new messages for you from ${name_of_craftsman} :)`,
            },
          },
        };

        const sendMessageNewFrame = message => {
          const pubnubX = new PubNub({
            publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
            subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
            uuid: state_here.MyProfileReducer.myprofile.user.id,
          });

          if (!didFrameStartInside) {
            if (message) {
              pubnubX.publish(
                {
                  channel: channelsHere[0],
                  message,
                  meta: {
                    type: 'h',
                    image_url: pick,
                    user_dp: state_here.MyProfileReducer.myprofile.image,
                  },
                },
                function (status, response) {
                  setSendingShow(false);
                  if (response.timetoken > 0) {
                    StartFrame(response.timetoken);
                  }
                },
              );
            } else {
            }
          } else {
            if (message) {
              pubnubX.publish(
                {
                  channel: channelsHere[0],
                  message,
                  meta: {
                    type: 'h',
                    image_url: pick,
                    user_dp: state_here.MyProfileReducer.myprofile.image,
                  },
                },
                function (status, response) {
                  console.log(status);
                  console.log(response);
                  setSendingShow(false);
                  pubnubX.publish(
                    {
                      channel: channelIdHere + '_push',
                      message: new_message_notif_payload,
                    },
                    function (status, response) {
                      console.log(status);
                    },
                  );
                },
              );
            } else {
            }
          }
        };
        const sendMessageOldFrame = message => {
          console.log('sending message in old frame');
          const pubnubY = new PubNub({
            publishKey: 'pub-c-a65bb691-5b8a-4c4b-aef5-e2a26677122d',
            subscribeKey: 'sub-c-d099e214-9bcf-11eb-9adf-f2e9c1644994',
            uuid: state_here.MyProfileReducer.myprofile.user.id,
          });

          if (message) {
            pubnubY.publish(
              {
                channel: channelsHere[0],
                message,
                meta: {
                  type: 'h',
                  image_url: pick,
                  user_dp: state_here.MyProfileReducer.myprofile.image,
                },
              },
              function (status, response) {
                setSendingShow(false);
                console.log(status);
                pubnubY.publish(
                  {
                    channel: channelIdHere + '_push',
                    message: new_message_notif_payload,
                  },
                  function (status, response) {
                    console.log(status);
                  },
                );
              },
            );
          } else {
          }
        };

        function SendButton() {
          if (!sendingShow) {
            return (
              <Iconly
                name="SendBold"
                color={theme.colors.success_green}
                size={30}
              />
            );
          } else {
            return <Pulse size={10} color={theme.colors.success_green} />;
          }
        }

        return (
          <View
            keyboardShouldPersistTaps="always"
            style={{
              backgroundColor: 'transparent',
              borderColor: input_border_color,
              minHeight: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RecoOverLayHereShow />
            <View style={styles.textinputview}>
              <SquircleView
                squircleParams={{
                  cornerSmoothing: 1,
                  cornerRadius: 15,
                  fillColor: theme.colors.off_light,
                }}
                style={{
                  borderWidth: 0,
                  borderColor: input_border_color,
                  height: 55,
                  width: windowWidth * 0.95,
                  flexDirection: 'row',
                  alignItems: 'center',
                  minHeight: 45,
                }}>
                <AutoGrowingTextInput
                  style={{
                    fontSize: 16,
                    fontFamily: 'GothamRounded-Medium',
                    color: font_color_input,
                    paddingHorizontal: 10,
                    marginLeft: 10,
                    width: windowWidth * 0.8,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                  onChangeText={changeTypevalue}
                  value={typevalue}
                  autoCorrect={false}
                  placeholder="type fun stuff..."
                  placeholderTextColor="#666"
                  onSelectionChange={({nativeEvent: {selection, text}}) => {
                    changeSelectedValue(
                      typevalue.slice(selection.start, selection.end),
                    );
                  }}
                  multiline={true}
                  maxLength={140}
                />

                <TouchableOpacity
                  style={{
                    height: 30,
                    width: windowWidth * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSendingShow(true);
                    Keyboard.dismiss;
                    if (pick.length > 0) {
                      if (!channelOnGoing) {
                        sendMessageNewFrame(typevalue);
                      } else {
                        sendMessageOldFrame(typevalue);
                      }
                      changeTypevalue('');
                      changeSelectedValue('');
                      setPick('');
                    } else {
                      showMessage({
                        message:
                          'Please choose an image or gif to send message!',
                        type: 'info',
                        backgroundColor: 'indianred',
                      });
                    }
                  }}>
                  <SendButton />
                </TouchableOpacity>
              </SquircleView>
            </View>
          </View>
        );
      },
    [didFrameStart],
  );

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: windowWidth,
            height: 200,
          }}
          source={require(header_back_image)}
        />
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: windowWidth,
            height: 200,
          }}
          blurType="light"
          blurAmount={50}
          reducedTransparencyFallbackColor="blue"
        />
        <Header
          backgroundColor={header_color}
          containerStyle={styles.header_container}
          barStyle={header_bar_style}>
          <LeftHeaderComponent />
          <CenterHeaderComponent />
          <RightHeaderComponent />
        </Header>
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 0.92,
          width: windowWidth,
          backgroundColor: background_color,
          borderRadius: 20,
          margin: 0,
        }}
        behavior="padding"
        keyboardVerticalOffset={30}>
        <LiveMessagesView />
        <InputXXX />
      </KeyboardAvoidingView>
      <View
        style={{
          flex: 0.09,
          width: windowWidth,
          backgroundColor: other_input_background_color,
          alignItems: 'center',
        }}>
        <OtherInputBar />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(DirectChatScreen);

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

  header_container: {
    borderBottomWidth: 2,
  },
  modal_search_view_wrap: {
    width: windowWidth,
    height: 65,
  },
  otherinputview: {
    flex: 0.1,
    height: 40,
  },

  body_scroll_view: {
    flex: 0.92,
    //backgroundColor: '#F1F4F9',
    backgroundColor: background_color,
    width: windowWidth,
    //borderRadius: 20,

    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  body_scroll_view_content_container: {
    flexGrow: 1,
    width: windowWidth,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: background_color,
    alignItems: 'center',
  },

  center_header_view: {flexDirection: 'column'},
  center_header_club_name: {
    color: font_color_input,
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    textAlign: 'center',
  },
  center_header_people_view: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  center_header_people_image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  input_overall_view: {},
  textinputview: {
    //flex: 0.65,
    //height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  otherinputscrollview: {
    justifyContent: 'center',
  },

  OtherInputIcon: {
    marginHorizontal: 20,
    height: 32.5,
    width: 32.5,
  },
  otherinputicon: {
    marginHorizontal: 40,
    //marginTop: 10, //has to be fixed to be made as per the flex
  },
  other_input_modals_style: {
    backgroundColor: '#131313',
  },
  sticker_packs_view_wrap: {
    flexDirection: 'row',
    backgroundColor: '#131313',
  },
  image_picker_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  image_picker_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    justifyContent: 'space-around',
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
  camera_picker_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  camera_picker_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    justifyContent: 'space-around',
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
  image_selector_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  image_selector_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    justifyContent: 'space-around',
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
  gif_selector_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#131313',
    alignItems: 'center',
  },
  gif_selector_craft_items_view: {
    alignItems: 'center',
    height: windowHeight * 0.6,
    justifyContent: 'space-around',
  },
  gif_selector_craft_keyboard_view: {
    flexDirection: 'row',
    width: windowWidth,
  },
  gif_selector_craft_text: {
    color: '#fafafa',
    width: windowWidth * 0.9,
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#fafafa25',
    paddingHorizontal: 20,
  },
  media_modal_search_bar_container: {
    backgroundColor: '#131313',
  },
  media_modal_search_bar_input_container: {
    backgroundColor: '#44444475',
    borderRadius: 15,
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
    maxWidth: windowWidth * 0.8,
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
    maxWidth: windowWidth * 0.8,
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
