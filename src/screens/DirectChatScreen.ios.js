/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useRef, useEffect, useMemo} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  // Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {
  Icon,
  Overlay,
  Header,
  Avatar,
  SearchBar,
  Button,
  Image,
} from 'react-native-elements';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
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
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import {BlurView} from '@react-native-community/blur';
import {MixpanelContext} from '../pnstuff/MixPanelStuff';
import ChosenRecoItem from '../chatitems/typed/ChosenRecoItem';
import Draggable from 'react-native-draggable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import ThemeContext from '../themes/Theme';
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import Iconly from '../pnstuff/Iconly';
import LinearGradient from 'react-native-linear-gradient';
import {MMKV} from 'react-native-mmkv';
import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import {SquircleView} from 'react-native-figma-squircle';

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
    otherNameHere,
    directIdHere,
    channelOnGoing,
    channelEndTime,
    channelStartTime,
  } = route.params;
  const [channelsHere] = useState([directIdHere]);

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Directs Chat Screen');
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
      images: {
        fixed_height_small: {
          url:
            'https://media0.giphy.com/media/xUPGcyi4YxcZp8dWZq184b23utx00z40sy5whv4v25bm3irbrlgqpywqejlen4dg&rid=giphy.gif',
        },
      },
    },
    {
      images: {
        fixed_height_small: {
          url:
            'https://media0.giphy.com/media/xUPGcyi4YxcZp8dWZq184b23utx00z40sy5whv4v25bm3irbrlgqpywqejlen4dg&rid=giphy.gif',
        },
      },
    },
    {
      images: {
        fixed_height_small: {
          url:
            'https://media0.giphy.com/media/xUPGcyi4YxcZp8dWZq184b23utx00z40sy5whv4v25bm3irbrlgqpywqejlen4dg&rid=giphy.gif',
        },
      },
    },
    {
      images: {
        fixed_height_small: {
          url:
            'https://media0.giphy.com/media/xUPGcyi4YxcZp8dWZq184b23utx00z40sy5whv4v25bm3irbrlgqpywqejlen4dg&rid=giphy.gif',
        },
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
          navigation.navigate('DirectFramesList', {
            direct_id: directIdHere,
            other_name: otherNameHere,
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
          MMKV.set(directIdHere, dayjs().unix());
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
          {otherNameHere.substring(0, 14)}
        </Text>
      </View>
    );
  }

  function CheckFrameLapsedOrNot() {
    if (typeof channelEndTime === 'number') {
      if (channelEndTime > dayjs().unix()) {
        console.log('time still there');
        console.log(dayjs().unix());
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

  const [imagePicked, setImagePicked] = useState('');
  const [imagePickedMime, setImagePickedMime] = useState('');
  const [imagePickedName, setImagePickedName] = useState('');
  const [imagePickerCraftVisible, setImagePickerCraftVisible] = useState(false);

  const imagePickerCraftOverlay = () => {
    setImagePickerCraftVisible(!imagePickerCraftVisible);
    CheckFrameLapsedOrNot();
  };

  const ImagePickerOverlayInput = useMemo(
    () =>
      function ImagePickerOverlayInputX() {
        const [textMessage, setTextMessage] = useState('');
        const sendMessageNewFrame = (shot, message) => {
          if (messages.length === 0) {
            console.log('no live messsages here');
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
                console.log(status);
              },
            );
          } else {
            console.log('yes live messsages here');
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
                console.log(status);
              },
            );
          }
        };
        const sendMessageOldFrame = (shot, message) => {
          console.log('sending picked image - old frame');
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
              },
            },
            function (status, response) {
              console.log(status);
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
                  value={textMessage}
                  autoCorrect={false}
                  maxLength={140}
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
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
        const [textMessage, setTextMessage] = useState('');
        const sendMessageNewFrame = (shot, message) => {
          if (messages.length === 0) {
            pubnub.sendFile(
              {
                channel: channelsHere[0],
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
                  user_dp: state_here.MyProfileReducer.myprofile.image,
                  view_shot: shot,
                },
              },
              function (status, response) {
                console.log(status.statusCode);
                StartFrame();
              },
            );
          } else {
            pubnub.sendFile(
              {
                channel: channelsHere[0],
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
                  user_dp: state_here.MyProfileReducer.myprofile.image,
                  view_shot: shot,
                },
              },
              function (status, response) {
                console.log(status.statusCode);
              },
            );
          }
        };
        const sendMessageOldFrame = (shot, message) => {
          pubnub.sendFile(
            {
              channel: channelsHere[0],
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
                user_dp: state_here.MyProfileReducer.myprofile.image,
                view_shot: shot,
              },
            },
            function (status, response) {
              console.log(status.statusCode);
            },
          );
        };

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
                  style={styles.f_text}
                  multiline
                  value={textMessage}
                  autoline
                  autoCorrect={false}
                  autoFocus={true}
                  maxLength={140}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
                size={60}
                containerStyle={styles.f_avatar}
              />
            </View>
          );
        }

        return (
          <Overlay
            isVisible={cameraPickerCraftVisible}
            onBackdropPress={cameraPickerCraftOverlay}
            overlayStyle={styles.camera_picker_craft_overlay}>
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
                    onPress={() => cameraPickerCraftOverlay()}>
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

                            captureRef(viewShotCameraPickerRef, {
                              format: 'png',
                              quality: 0.9,
                            })
                              .then(uri => {
                                if (channelOnGoing) {
                                  sendMessageOldFrame(uri, textMessage);
                                } else {
                                  sendMessageNewFrame(uri, textMessage);
                                }
                                cameraPickerCraftOverlay();
                              })
                              .then(uri => {});
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
                            if (channelOnGoing) {
                              sendMessageOldFrame(uri, textMessage);
                            } else {
                              sendMessageNewFrame(uri, textMessage);
                            }

                            cameraPickerCraftOverlay();
                          })
                          .then(uri => {});
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
                ref={viewShotCameraPickerRef}
                options={{format: 'png', quality: 0.9}}
                style={{backgroundColor: 'transparent'}}>
                <FastImage
                  style={{
                    width: '100%',
                    height: undefined,
                    aspectRatio: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  source={{uri: cameraPicked}}>
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
    [cameraPickerCraftVisible, cameraPicked],
  );

  const [pasteLinkVisible, setPasteLinkVisible] = useState(false);

  const togglePasteLinkOverlay = () => {
    setPasteLinkVisible(false);
  };

  function PasteLinkOverlay() {
    const [copiedText, setCopiedText] = useState('');

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
      if (messages.length === 0) {
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message,
              meta: {
                type: 'd',
                pasted_url: copiedText,
                pasted_dp: state_here.MyProfileReducer.myprofile.image,
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
              channel: channelsHere[0],
              message,
              meta: {
                type: 'd',
                pasted_url: copiedText,
                pasted_dp: state_here.MyProfileReducer.myprofile.image,
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
            channel: channelsHere[0],
            message,
            meta: {
              type: 'd',
              pasted_url: copiedText,
              pasted_dp: state_here.MyProfileReducer.myprofile.image,
            },
          },
          function (status, response) {
            console.log(status);
          },
        );
      } else {
      }
    };

    function ButtonHere() {
      if (copiedText.length > 0) {
        return (
          <Button
            title="Send"
            type="solid"
            onPress={() => {
              if (!channelOnGoing) {
                sendMessageNewFrame(copiedText);
              } else {
                sendMessageOldFrame(copiedText);
              }
              togglePasteLinkOverlay();
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
                  setImagePicked(images.path);
                  setImagePickedMime(images.mime);
                  setImagePickedName(images.filename);
                  imagePickerCraftOverlay();
                });
              }}>
              <Image
                source={require('../../assets/crazy_photos_apple_e_d.png')}
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
              console.log('no old messages');
              //console.log(old_messages.channels[channelIdHere].length);
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
              //console.log(old_messages.channels);
              //console.log('yes old messages');
              //console.log(old_messages.channels[channelIdHere] + 'map array');
              //console.log('old messages are there');
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
                  {old_messages.channels[directIdHere].map((item, index) => (
                    <Pressable onPress={() => Keyboard.dismiss()}>
                      <ShowMessageOld Message={item} />
                    </Pressable>
                    //<Text>{item.message}</Text>
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
    var all_ids = _.split(directIdHere, '_');
    var timeToken = dayjs().unix();

    var new_frame_notif_payload = {
      pn_gcm: {
        notification: {
          title: otherNameHere,
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
          //end_time: startTime / 10000000 + 43200,
          end_time: timeToken + 43200,
          //club_id: clubID,
          channel_id: directIdHere,
          users: all_ids[0] + ',' + all_ids[1],
        },
      };

      axios(config)
        .then(() => setDidFrameStart(true))
        .then(
          pubnub.publish(
            {
              channel: directIdHere + '_push',
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
        const _keyboardDidShow = () => {
          setKeyboardStatus(true);
          CheckFrameLapsedOrNot();
        };
        const _keyboardDidHide = () => setKeyboardStatus(false);

        function SetChosenMedia(image_link) {
          setPick(image_link);
        }

        const EachRecoItem = useMemo(
          () =>
            function EachRecoItemX(props) {
              return (
                <Pressable
                  style={{
                    shadowColor: '#000',
                    width: 125,
                    height: 72.5,
                    marginHorizontal: 5,
                  }}
                  keyboardShouldPersistTaps="always"
                  onPress={() => {
                    SetChosenMedia(props.Item);
                  }}>
                  <Image
                    style={{
                      width: 125,
                      height: 72.5,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: props.Item,
                    }}
                    PlaceholderContent={
                      <ContentLoader
                        speed={2}
                        width={125}
                        height={72.5}
                        viewBox="0 0 125 72.5"
                        backgroundColor={theme.colors.off_light}
                        foregroundColor={theme.colors.mid_light}
                        {...props}>
                        <Rect
                          x="0"
                          y="0"
                          rx="0"
                          ry="0"
                          width="125"
                          height="72.5"
                        />
                      </ContentLoader>
                    }
                  />
                </Pressable>
              );
            },
          [typevalue],
        );

        const RecoItemsList = useMemo(
          () =>
            function RecoItemsListX(props) {
              var list_here = props.Rec;

              return (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={{
                    height: windowHeight * 0.1,
                    width: windowWidth,
                    backgroundColor: reco_background_color,
                    borderRadius: 0,
                  }}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {list_here.map((item, index) => (
                    <EachRecoItem Item={item} />
                  ))}
                </ScrollView>
              );
            },
          [typevalue],
        );

        function RecoOverLay() {
          const [rec, setRec] = useState([
            'loading',
            'loading',
            'loading',
            'loading',
          ]);

          var res = [];

          if (keyboardStatus) {
            useEffect(() => {
              if (selectedValue.length > 2) {
                axios
                  .get(
                    'https://apisayepirates.life/api/users/recommend_images/' +
                      String(state_here.MyProfileReducer.myprofile.user.id) +
                      '/' +
                      selectedValue +
                      '/' +
                      'False',
                  )
                  .then(response => (res = response.data))
                  .then(() => setRec(_.concat(res[0], res[1])))
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                axios
                  .get(
                    'https://apisayepirates.life/api/users/recommend_images/' +
                      String(state_here.MyProfileReducer.myprofile.user.id) +
                      '/' +
                      typevalue +
                      '/' +
                      'True',
                  )
                  .then(response => (res = response.data))
                  .then(() => setRec(_.concat(res[0], res[1])))
                  .catch(err => {
                    console.log(err);
                  });
              }
            }, [typevalue, selectedValue]);

            return (
              <View
                keyboardShouldPersistTaps={'always'}
                style={{
                  flexDirection: 'row',
                  width: windowWidth,
                  alignItems: 'center',
                }}>
                <ChosenRecoItem Link={pick} />
                <RecoItemsList Rec={rec} />
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
                      channel: directIdHere + '_push',
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
                pubnub.publish(
                  {
                    channel: directIdHere + '_push',
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
              //flex: 0.05,
              //backgroundColor: input_background_color,
              backgroundColor: 'transparent',
              //borderTopWidth: 1.5,
              borderColor: input_border_color,
              minHeight: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RecoOverLay />
            <View style={styles.textinputview}>
              <View
                style={{
                  // flex: 1,
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
                  autoCorrect={false}
                  onChangeText={changeTypevalue}
                  onSelectionChange={({nativeEvent: {selection, text}}) => {
                    changeSelectedValue(
                      typevalue.slice(selection.start, selection.end),
                    );
                  }}
                  value={typevalue}
                  placeholder="type fun stuff..."
                  placeholderTextColor="#666"
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
                  //disabled={typevalue.length > 0 ? false : true}
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

  const [imageSelected, setImageSelected] = useState('beach');
  const [imageSelectorCraftVisible, setImageSelectorCraftVisible] = useState(
    false,
  );

  const imageSelectorCraftOverlay = () => {
    setImageSelectorCraftVisible(!imageSelectorCraftVisible);
    CheckFrameLapsedOrNot();
  };

  const ImageSelectorOverlayInputHere = useMemo(
    () =>
      function ImageSelectorOverlayInput() {
        const [textMessage, setTextMessage] = useState('');
        const sendMessageNewFrame = (shot, message) => {
          if (messages.length === 0) {
            if (message) {
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
                    type: 'g',
                    image_url: imageSelected,
                    user_dp: state_here.MyProfileReducer.myprofile.image,
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
                    type: 'g',
                    image_url: imageSelected,
                    user_dp: state_here.MyProfileReducer.myprofile.image,
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
          }
        };
        const sendMessageOldFrame = (shot, message) => {
          if (message) {
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
                  type: 'g',
                  image_url: imageSelected,
                  user_dp: state_here.MyProfileReducer.myprofile.image,
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
                  value={textMessage}
                  autoCorrect={false}
                  autoFocus={true}
                  maxLength={140}
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

        return (
          <Overlay
            isVisible={imageSelectorCraftVisible}
            onBackdropPress={imageSelectorCraftOverlay}
            overlayStyle={styles.image_selector_craft_overlay}>
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
                    onPress={() => imageSelectorCraftOverlay()}>
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
                      Keyboard.dismiss();
                      captureRef(viewShotImagePickerRef, {
                        format: 'jpg',
                        quality: 0.9,
                      })
                        .then(uri => {
                          if (channelOnGoing) {
                            sendMessageOldFrame(uri, textMessage);
                          } else {
                            sendMessageNewFrame(uri, textMessage);
                          }

                          imageSelectorCraftOverlay();
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
                  source={{uri: imageSelected}}>
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
    [imageSelected, imageSelectorCraftVisible],
  );

  const [imageSearch, changeImageSearch] = useState('mountains');

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
        <Image
          source={{uri: item.item.urls.thumb}}
          style={{
            width: (windowWidth - 10) / 2,
            height: windowWidth / 2,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          PlaceholderContent={<DoubleBounce size={10} color="#1CAFF6" />}
          placeholderStyle={{backgroundColor: '#050505'}}
        />
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
      function GIFSelectorOverlayInput() {
        const [textMessage, setTextMessage] = useState('');
        const sendMessageNewFrame = (shot, message) => {
          if (messages.length === 0) {
            console.log('new frame, no messages gif');

            pubnub.sendFile(
              {
                channel: channelsHere[0],
                message: {
                  test: '',
                },
                file: {
                  uri: shot,
                  name: 'galgalgal',
                  mimeType: 'png',
                },
                meta: {
                  type: 'f',
                  image_url: gifSelected,
                  user_dp: state_here.MyProfileReducer.myprofile.image,
                },
              },
              function (status, response) {
                console.log(response);
                StartFrame();
              },
            );
          } else {
            console.log('new frame, yes messages gif');
            pubnub.sendFile({
              channel: channelsHere[0],
              message: {
                test: '',
              },
              file: {
                uri: shot,
                name: 'galgalgal',
                mimeType: 'png',
              },
              meta: {
                type: 'f',
                image_url: gifSelected,
                user_dp: state_here.MyProfileReducer.myprofile.image,
              },
              function(status, response) {
                console.log(status);
              },
            });
          }
        };
        const sendMessageOldFrame = (shot, message) => {
          console.log('old frame, yes messages');

          pubnub.sendFile({
            channel: channelsHere[0],
            message: {
              test: '',
            },
            file: {
              uri: shot,
              name: 'galgalgal',
              mimeType: 'png',
            },
            meta: {
              type: 'f',
              image_url: gifSelected,
              user_dp: state_here.MyProfileReducer.myprofile.image,
            },
            function(status, response) {
              console.log(status);
            },
          });
        };

        const viewShotGIFPickerRef = useRef(null);

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
                  style={styles.f_text}
                  multiline
                  autoline
                  value={textMessage}
                  autoCorrect={false}
                  autoFocus={true}
                  maxLength={140}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
                size={60}
                containerStyle={styles.f_avatar}
              />
            </View>
          );
        }

        return (
          <Overlay
            isVisible={gifSelectorCraftVisible}
            onBackdropPress={gifSelectorCraftOverlay}
            overlayStyle={styles.gif_selector_craft_overlay}>
            <View style={styles.gif_selector_craft_items_view}>
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
                    onPress={() => gifSelectorCraftOverlay()}>
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

                            captureRef(viewShotGIFPickerRef, {
                              format: 'png',
                              quality: 0.9,
                            })
                              .then(uri => {
                                if (channelOnGoing) {
                                  sendMessageOldFrame(uri, textMessage);
                                } else {
                                  sendMessageNewFrame(uri, textMessage);
                                }
                                gifSelectorCraftOverlay();
                              })
                              .then(uri => {});
                          } else {
                            Keyboard.dismiss();
                          }
                        });
                      } else {
                        Keyboard.dismiss();
                        captureRef(viewShotGIFPickerRef, {
                          format: 'png',
                          quality: 0.9,
                        })
                          .then(uri => {
                            if (channelOnGoing) {
                              sendMessageOldFrame(uri, textMessage);
                            } else {
                              sendMessageNewFrame(uri, textMessage);
                            }

                            gifSelectorCraftOverlay();
                          })
                          .then(uri => {});
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
              <FastImage
                style={{
                  width: windowWidth,
                  height: undefined,
                  aspectRatio: 1,
                  marginVertical: windowHeight * 0.01,
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
                source={{uri: gifSelected}}>
                <ViewShot
                  ref={viewShotGIFPickerRef}
                  options={{format: 'png', quality: 0.9}}
                  style={{backgroundColor: 'transparent'}}>
                  <View
                    style={{
                      width: windowWidth,
                      height: undefined,
                      aspectRatio: 1,
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      backgroundColor: 'transparent',
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
                  </View>
                </ViewShot>
              </FastImage>
            </View>
          </Overlay>
        );
      },
    [gifSelected, gifSelectorCraftVisible],
  );

  const [gifsSearch, changeGifSearch] = useState('love');

  useEffect(() => {
    dispatch(TrendingGifsActions(gifsSearch));
  }, [dispatch, gifsSearch]);

  function RenderTrendingGifs(item) {
    return (
      <Pressable
        style={{margin: 3}}
        onPress={() => {
          setGifSelected(item.item.images.fixed_height.url);
          gifSelectorCraftOverlay();
        }}>
        <Image
          source={{uri: item.item.images.fixed_height_small.url}}
          style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
          PlaceholderContent={<DoubleBounce size={10} color="#1CAFF6" />}
          placeholderStyle={{backgroundColor: '#050505'}}
        />
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
          containerStyle={{
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
      <ImagePickerOverlayInput />
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
          data:
            // trending_photos_data_block.length <= 0
            // ? // trending_photos_data_block[0].width === 500
            // trending_photos_data_block_empty
            trending_photos_data_block,
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
          renderItem: RenderTrendingGifs,
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
