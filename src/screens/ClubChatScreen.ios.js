/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect, useContext, useMemo} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {Overlay, Icon, Header, Avatar, SearchBar} from 'react-native-elements';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import ImagePicker from 'react-native-image-crop-picker';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import {connect} from 'react-redux';
import {TrendingGifsActions} from '../redux/TrendingGifsActions';
import {TrendingPhotosActions} from '../redux/TrendingPhotosActions';
import {usePubNub} from 'pubnub-react';
import dayjs from 'dayjs';
import ShowMessage from '../uibits/ShowMessage';
import ShowMessageOld from '../uibits/ShowMessageOld';
import FastImage from 'react-native-fast-image';
import {showMessage} from 'react-native-flash-message';
import {BlurView} from '@react-native-community/blur';
import {MixpanelContext} from '../pnstuff/MixPanelStuff';
import _ from 'lodash';
import RenderSearchedGifItem from '../chatitems/gifs/RenderSearchedGifItem';
import CraftAndSendGifMessage from '../chatitems/gifs/CraftAndSendGifMessage';
import RenderSearchedImageItem from '../chatitems/images/RenderSearchedImageItem';
import CraftAndSendImageMessage from '../chatitems/images/CraftAndSendImageMessage';
import CraftAndSendCameraMessage from '../chatitems/camera/CraftAndSendCameraMessage';
import CraftAndSendLinkMessage from '../chatitems/links/CraftAndSendLinkMessage';
import RecosOverlay from '../chatitems/typed/RecosOverlay';
import ChosenRecoItem from '../chatitems/typed/ChosenRecoItem';
import Draggable from 'react-native-draggable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import ThemeContext from '../themes/Theme';
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import Iconly from '../pnstuff/Iconly';
import {MMKV} from 'react-native-mmkv';
import {SquircleView} from 'react-native-figma-squircle';
// import {SelectableText} from '@astrocoders/react-native-selectable-text';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = {};

const background_color = '#FAFAFA';
const header_color = 'transparent';
const input_border_color = '#EEEEEE';
const header_bar_style = 'dark-content';
const input_background_color = '#EAEAEA';
const other_input_background_color = '#FAFAFA';
const reco_background_color = 'transparent';
const font_color_input = '#050505';
const font_color_header = '#050505';
const header_back_image = '/Users/san/Desktop/toastgo/assets/3.jpeg';

function ClubChatScreen({navigation, dispatch, route}) {
  const theme = useContext(ThemeContext);
  const pubnub = usePubNub();
  const {
    clubID,
    clubNameHere,
    channelIdHere,
    channelOnGoing,
    channelEndTime,
    channelStartTime,
  } = route.params;
  const [channelsHere] = useState([channelIdHere]);

  const [messages, addMessage] = useState([]);
  const [liveWho, setLiveWho] = useState();

  const [nowTimeStamp, setNowTimeStamp] = useState('');

  const [old_messages, addOldMessages] = useState();
  const [old_messages_resolve, changeOldMessagesResolve] = useState(false);

  useEffect(() => {
    setNowTimeStamp(dayjs().valueOf());
  }, []);

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Club Chat');
  }, []);

  const modalizeRefGifSheet = useRef(null);

  const onOpenGifSheet = () => {
    modalizeRefGifSheet.current?.open();
  };

  const modalizeRefBitmojiSheet = useRef(null);

  const onOpenBitmojiSheet = () => {
    modalizeRefBitmojiSheet.current?.open();
  };

  var trending_gifs_data_block = state_here.TrendingGifsReducer.trending_gifs;

  var trending_gifs_data_block_empty = [
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/fit=max&fm=jpg&ixid=MXwyMTEyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/phyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/fit=max&fm=jpg&ixid=MXwyMTEyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/phyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
  ];

  var trending_photos_data_block =
    state_here.TrendingPhotosReducer.trending_photos;

  var trending_photos_data_block_empty = [
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/fit=max&fm=jpg&ixid=MXwyMTEyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/phyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/fit=max&fm=jpg&ixid=MXwyMTEyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
    {
      width: 1000,
      height: 500,
      urls: {
        thumb:
          'https://images.unsplash.com/phyMTR8MXwxfGFsbHwxfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=200',
      },
    },
  ];

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
          navigation.navigate('ClubFramesList', {
            club_id: clubID,
            live_who: liveWho,
            club_name: clubNameHere,
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
          MMKV.set(channelIdHere, dayjs().unix());
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
          {clubNameHere.substring(0, 14)}
        </Text>
      </View>
    );
  }

  const [imagePicked, setImagePicked] = useState('');
  const [imagePickedMime, setImagePickedMime] = useState('');
  const [imagePickedName, setImagePickedName] = useState('');
  const [imagePickerCraftVisible, setImagePickerCraftVisible] = useState(false);

  const imagePickerCraftOverlay = () => {
    setImagePickerCraftVisible(!imagePickerCraftVisible);
    CheckFrameLapsedOrNot();
  };

  const ImagePickerOverlayInputX = useMemo(
    () =>
      function ImagePickerOverlayInput() {
        const [textMessage, setTextMessage] = useState('');
        const sendMessageNewFrame = (shot, message) => {
          if (messages.length === 0) {
            console.log('new frame, no live messsages here');
            pubnub.sendFile(
              {
                channel: channelsHere[0],
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
                StartFrame();
                console.log(status + response);
              },
            );
          } else {
            console.log('new frame, yes live messsages here');
            pubnub.sendFile(
              {
                channel: channelsHere[0],
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
                console.log(status + response);
              },
            );
          }
        };
        const sendMessageOldFrame = (shot, message) => {
          console.log('old frame, yes messages');
          pubnub.sendFile(
            {
              channel: channelsHere[0],
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
              console.log(status + response);
            },
          );
        };

        function Children() {
          return (
            <View>
              <View
                style={{
                  backgroundColor: '#ffffff',
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
                  style={styles.g_text}
                  multiline
                  autoline
                  maxLength={140}
                  autoCorrect={false}
                  value={textMessage}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
                size={60}
                containerStyle={styles.g_avatar}
              />
            </View>
          );
        }

        const viewShotGalleryRef = useRef(null);

        const [textOpacity, setTextOpacity] = useStateWithCallbackLazy(1);

        return (
          <Overlay
            isVisible={imagePickerCraftVisible}
            onBackdropPress={imagePickerCraftOverlay}
            overlayStyle={styles.image_picker_craft_overlay}>
            <View style={styles.image_picker_craft_items_view}>
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
                    onPress={() => imagePickerCraftOverlay()}>
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
                      justifyContent: 'flex-end',
                    }}
                    onPress={() => {
                      if (textMessage.length === 0) {
                        setTextOpacity(0, textOpacity => {
                          if (textOpacity === 0) {
                            Keyboard.dismiss();
                            // console.log('first' + textOpacity);

                            captureRef(viewShotGalleryRef, {
                              format: 'jpg',
                              quality: 0.9,
                            })
                              .then(uri => {
                                if (!channelOnGoing) {
                                  sendMessageNewFrame(uri);
                                } else {
                                  sendMessageOldFrame(uri);
                                }
                                Keyboard.dismiss;
                                imagePickerCraftOverlay();
                                setImagePicked('');
                              })
                              .then(uri => {
                                console.log('Image saved to', uri);
                              });
                          } else {
                            Keyboard.dismiss();
                            // console.log('second' + textOpacity);
                          }
                        });
                      } else {
                        Keyboard.dismiss();
                        captureRef(viewShotGalleryRef, {
                          format: 'jpg',
                          quality: 0.9,
                        })
                          .then(uri => {
                            if (!channelOnGoing) {
                              sendMessageNewFrame(uri);
                            } else {
                              sendMessageOldFrame(uri);
                            }
                            Keyboard.dismiss;
                            imagePickerCraftOverlay();
                            setImagePicked('');
                          })
                          .then(uri => {
                            console.log('Image saved to', uri);
                          });
                      }
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
                ref={viewShotGalleryRef}
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
                  source={{uri: imagePicked}}>
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
          </Overlay>
        );
      },
    [imagePickerCraftVisible, imagePicked],
  );

  const [cameraPicked, setCameraPicked] = useState('');
  const [cameraPickedMime, setCameraPickedMime] = useState('');
  const [cameraPickedName, setCameraPickedName] = useState('');
  const [cameraPickerCraftVisible, setCameraPickerCraftVisible] = useState(
    false,
  );

  const cameraPickerCraftOverlay = () => {
    setCameraPickerCraftVisible(!cameraPickerCraftVisible);
    CheckFrameLapsedOrNot();
  };

  const CameraPickerOverlayInput = useMemo(
    () =>
      function CameraPickerOverlayInputX() {
        return (
          <Overlay
            isVisible={cameraPickerCraftVisible}
            onBackdropPress={cameraPickerCraftOverlay}
            overlayStyle={styles.camera_picker_craft_overlay}>
            <CraftAndSendCameraMessage
              ProfileAvatar={state_here.MyProfileReducer.myprofile.image}
              SelectedCameraShot={cameraPicked}
              SelectedCameraShotName={cameraPickedName}
              SelectedCameraShotMime={cameraPickedMime}
              ChannelOnGoing={channelOnGoing}
              Messages={messages}
              ChannelID={channelsHere[0]}
              ClubName={clubNameHere}
              ClubID={clubID}
              ToggleOverlay={cameraPickerCraftOverlay}
            />
          </Overlay>
        );
      },
    [cameraPickerCraftVisible, cameraPicked],
  );

  const [pasteLinkVisible, setPasteLinkVisible] = useState(false);

  const togglePasteLinkOverlay = () => {
    setPasteLinkVisible(false);
  };

  function PasteLinkOverlay() {
    return (
      <View style={styles.paste_link_overlay_view}>
        <CraftAndSendLinkMessage
          ProfileAvatar={state_here.MyProfileReducer.myprofile.image}
          ChannelOnGoing={channelOnGoing}
          Messages={messages}
          ChannelID={channelsHere[0]}
          ClubID={clubID}
          ClubName={clubNameHere}
          ToggleOverlay={togglePasteLinkOverlay}
        />
      </View>
    );
  }

  const OtherInputBar = useMemo(
    () =>
      function OtherInputBarX() {
        return (
          <ScrollView
            horizontal={true}
            centerContent={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.otherinputscrollview}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                ImagePicker.openCamera({
                  cropping: true,
                  compressImageQuality: 1,
                  width: 1200, // Add this
                  height: 1500, // Add this
                }).then(image => {
                  console.log(image);
                  setCameraPicked(image.path);
                  setCameraPickedMime(image.mime);
                  setCameraPickedName('camera_photo');
                  cameraPickerCraftOverlay();
                });
              }}>
              <Image
                source={require('../../assets/crazy_camera_e_d.png')}
                style={styles.OtherInputIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                ImagePicker.openPicker({
                  multiple: false,
                  cropping: false,
                }).then(images => {
                  console.log(images);
                  //setImagePicked(images.sourceURL);
                  setImagePicked(images.path);
                  setImagePickedMime(images.mime);
                  setImagePickedName(images.filename);
                  imagePickerCraftOverlay();
                });
              }}>
              <Image
                source={require('../../assets/crazy_photos_apple_e_d_big.png')}
                style={styles.OtherInputIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                onOpenBitmojiSheet();
              }}>
              <Image
                source={require('../../assets/crazy_unsplash_e_d.png')}
                style={styles.OtherInputIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                onOpenGifSheet();
              }}>
              <Image
                source={require('../../assets/crazy_gif_e_d.png')}
                style={styles.OtherInputIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                setPasteLinkVisible(true);
              }}>
              <Image
                source={require('../../assets/crazy_link_apple_e_d_big.png')}
                style={styles.OtherInputIcon}
              />
            </TouchableOpacity>
          </ScrollView>
        );
      },
    [],
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
      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: dayjs().valueOf(),
          count: 25, // default/max is 25 messages for multiple channels (up to 500)
        },
        function (status, response) {
          if (response) {
            console.log(response);
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
          end: now_here + '0000',
          start: channelStartTime + '0000000',
          count: 25, // default/max is 25 messages for multiple channels (up to 500)
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
        // console.log(old_messages);
        const scrollView = useRef();

        if (!old_messages_resolve) {
          return (
            <ScrollView
              style={styles.body_scroll_view}
              contentContainerStyle={styles.body_scroll_view_content_container}
              showsVerticalScrollIndicator={false}
            />
          );
        } else {
          if (!channelOnGoing) {
            return (
              <ScrollView
                style={styles.body_scroll_view}
                contentContainerStyle={
                  styles.body_scroll_view_content_container
                }
                showsVerticalScrollIndicator={false}
                ref={scrollView}
                onContentSizeChange={() =>
                  scrollView.current.scrollToEnd({animated: true})
                }>
                {_.uniqBy(messages, 'timetoken').map((message, index) => (
                  <Pressable onPress={() => Keyboard.dismiss()}>
                    <ShowMessage Message={message} />
                  </Pressable>
                ))}
              </ScrollView>
            );
          } else {
            if (Object.entries(old_messages.channels).length === 0) {
              return (
                <ScrollView
                  style={styles.body_scroll_view}
                  contentContainerStyle={
                    styles.body_scroll_view_content_container
                  }
                  showsVerticalScrollIndicator={false}
                  ref={scrollView}
                  onContentSizeChange={() =>
                    scrollView.current.scrollToEnd({animated: true})
                  }>
                  {_.uniqBy(messages, 'timetoken').map((message, index) => (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessage Message={message} />
                    </Pressable>
                  ))}
                </ScrollView>
              );
            } else {
              var x_here = old_messages.channels[channelIdHere];

              return (
                <ScrollView
                  style={styles.body_scroll_view}
                  contentContainerStyle={
                    styles.body_scroll_view_content_container
                  }
                  showsVerticalScrollIndicator={false}
                  ref={scrollView}
                  onContentSizeChange={() =>
                    scrollView.current.scrollToEnd({animated: true})
                  }>
                  {old_messages.channels[channelIdHere].map((item, index) => (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessageOld Message={item} />
                    </Pressable>
                  ))}
                  {_.uniqBy(messages, 'timetoken').map((message, index) => (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessage Message={message} />
                    </Pressable>
                  ))}
                </ScrollView>
              );
            }
          }
        }
      },
    [messages, old_messages],
  );

  function StartFrame() {
    var timeToken = dayjs().unix();

    var new_frame_notif_payload = {
      pn_gcm: {
        notification: {
          title: clubNameHere,
          body: 'new frame started',
        },
      },
    };

    if (messages.length === 0) {
      var config = {
        method: 'post',
        url: 'https://apisayepirates.life/api/clubs/create_frames_clubs/',
        headers: {'content-type': 'application/json'},
        data: {
          start_time: timeToken,
          end_time: timeToken + 43200,
          club_name: clubID,
          channel_id: channelIdHere,
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

  function CheckFrameLapsedOrNot() {
    if (typeof channelEndTime === 'number') {
      if (channelEndTime > dayjs().unix()) {
      } else {
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

        const _keyboardDidShow = () => {
          setKeyboardStatus(true);
          CheckFrameLapsedOrNot();
        };
        const _keyboardDidHide = () => {
          setKeyboardStatus(false);
        };

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
              title: clubNameHere,
              body: 'new messages for you...',
            },
          },
        };

        const sendMessageNewFrame = message => {
          console.log('sending message in new frame');
          if (!didFrameStartInside) {
            if (message) {
              pubnub.publish(
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
                  StartFrame(response.timetoken);
                },
              );
            } else {
            }
          } else {
            if (message) {
              pubnub.publish(
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
                  pubnub.publish(
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
          if (message) {
            pubnub.publish(
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
                pubnub.publish(
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
              <View
                style={{
                  backgroundColor: input_background_color,
                  borderWidth: 1,
                  borderColor: input_border_color,

                  height: 55,
                  width: windowWidth * 0.95,

                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 15,
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

                <Pressable
                  style={{
                    height: 30,
                    width: windowWidth * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  //disabled={ ? false : true}
                  onPress={() => {
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
                  <Iconly
                    name="SendBold"
                    color={theme.colors.success_green}
                    size={30}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        );
      },
    [didFrameStart],
  );

  const [imageSelected, setImageSelected] = useState('');
  const [imageSelectorCraftVisible, setImageSelectorCraftVisible] = useState(
    false,
  );

  const imageSelectorCraftOverlay = () => {
    setImageSelectorCraftVisible(!imageSelectorCraftVisible);
    CheckFrameLapsedOrNot();
  };

  const ImageSelectorOverlayInputHere = useMemo(
    () =>
      function ImageSelectorOverlayInputHereX() {
        return (
          <Overlay
            isVisible={imageSelectorCraftVisible}
            onBackdropPress={imageSelectorCraftOverlay}
            overlayStyle={styles.image_selector_craft_overlay}>
            <CraftAndSendImageMessage
              ProfileAvatar={state_here.MyProfileReducer.myprofile.image}
              SelectedImage={imageSelected}
              ChannelOnGoing={channelOnGoing}
              Messages={messages}
              ChannelID={channelsHere[0]}
              ClubID={clubID}
              ClubName={clubNameHere}
              ToggleOverlay={imageSelectorCraftOverlay}
            />
          </Overlay>
        );
      },
    [imageSelected, imageSelectorCraftVisible],
  );

  const [imageSearch, changeImageSearch] = useState('beach');

  useEffect(() => {
    dispatch(TrendingPhotosActions(imageSearch));
  }, [dispatch, imageSearch]);

  function RenderTrendingPhotos(item) {
    return (
      <Pressable
        style={{margin: 3}}
        onPress={() => {
          setImageSelected(item.item.urls.regular);
          imageSelectorCraftOverlay();
        }}>
        <RenderSearchedImageItem Item={item} />
      </Pressable>
    );
  }

  const [gifSelected, setGifSelected] = useState('');
  const [gifSelectorCraftVisible, setGifSelectorCraftVisible] = useState(false);

  const gifSelectorCraftOverlay = () => {
    setGifSelectorCraftVisible(!gifSelectorCraftVisible);
    CheckFrameLapsedOrNot();
  };

  const GIFSelectorOverlayInputHere = useMemo(
    () =>
      function GIFSelectorOverlayInputHereX() {
        return (
          <Overlay
            isVisible={gifSelectorCraftVisible}
            onBackdropPress={gifSelectorCraftOverlay}
            overlayStyle={styles.gif_selector_craft_overlay}>
            <CraftAndSendGifMessage
              ProfileAvatar={state_here.MyProfileReducer.myprofile.image}
              SelectedGIF={gifSelected}
              ChannelOnGoing={channelOnGoing}
              Messages={messages}
              ChannelID={channelsHere[0]}
              ClubID={clubID}
              ClubName={clubNameHere}
              ToggleOverlay={gifSelectorCraftOverlay}
            />
          </Overlay>
        );
      },
    [gifSelected, gifSelectorCraftVisible],
  );

  const [gifsSearch, changeGifSearch] = useState('love');

  useEffect(() => {
    dispatch(TrendingGifsActions(gifsSearch));
  }, [dispatch, gifsSearch]);

  function RenderTrendingGifsHere(item) {
    return (
      <Pressable
        style={{margin: 3}}
        onPress={() => {
          setGifSelected(item.item.images.fixed_height.url);
          gifSelectorCraftOverlay();
        }}>
        <RenderSearchedGifItem Item={item} />
      </Pressable>
    );
  }

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
        }}>
        <OtherInputBar />
      </View>
      <ImagePickerOverlayInputX />
      <ImageSelectorOverlayInputHere />
      <CameraPickerOverlayInput />
      <GIFSelectorOverlayInputHere />
      <Modalize
        ref={modalizeRefBitmojiSheet}
        snapPoint={1000}
        modalHeight={windowHeight * 0.6}
        modalStyle={styles.other_input_modals_style}
        HeaderComponent={
          <SquircleView
            style={{
              width: windowWidth * 0.95,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 10,
              fillColor: theme.colors.mid_dark,
            }}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={search => {
                changeImageSearch(search);
              }}
              value={imageSearch}
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                borderTopWidth: 0,
                width: windowWidth * 0.95,
                height: 50,
                justifyContent: 'center',
              }}
              inputContainerStyle={{
                backgroundColor: 'transparent',
              }}
              inputStyle={{...theme.text.header, color: theme.colors.off_light}}
              placeholderTextColor={theme.colors.mid_light}
              searchIcon={{color: theme.colors.mid_light}}
            />
          </SquircleView>
        }
        flatListProps={{
          data: trending_photos_data_block,
          renderItem: RenderTrendingPhotos,
          keyExtractor: item => item.id,
          numColumns: 2,
        }}
      />
      <Modalize
        ref={modalizeRefGifSheet}
        snapPoint={1000}
        modalHeight={windowHeight * 0.6}
        modalStyle={styles.other_input_modals_style}
        HeaderComponent={
          <SquircleView
            style={{
              width: windowWidth * 0.95,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 10,
              fillColor: theme.colors.mid_dark,
            }}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={changeGifSearch}
              value={gifsSearch}
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                borderTopWidth: 0,
                width: windowWidth * 0.95,
                height: 50,
                justifyContent: 'center',
              }}
              inputContainerStyle={{
                backgroundColor: 'transparent',
              }}
              inputStyle={{...theme.text.header, color: theme.colors.off_light}}
              placeholderTextColor={theme.colors.mid_light}
              searchIcon={{color: theme.colors.mid_light}}
            />
          </SquircleView>
        }
        flatListProps={{
          data: trending_gifs_data_block,
          renderItem: RenderTrendingGifsHere,
          keyExtractor: item => item.id,
          numColumns: 2,
        }}
      />
      <Overlay
        isVisible={pasteLinkVisible}
        onBackdropPress={togglePasteLinkOverlay}
        overlayStyle={styles.paste_link_overlay_style}>
        <PasteLinkOverlay />
      </Overlay>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ClubChatScreen);

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
    borderBottomWidth: 0,
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
    color: font_color_header,
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
