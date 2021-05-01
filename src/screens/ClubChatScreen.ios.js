/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
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
  SafeAreaView,
  Platform,
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
import IconlyCloseSquareIcon from '../uibits/IconlyCloseSquareIcon';
import FastImage from 'react-native-fast-image';
import IconlyDirectIcon from '../uibits/IconlyDirectIcon';
import BetterImage from 'react-native-better-image';

import {BlurView} from '@react-native-community/blur';
//import {MixpanelContext} from '../pnstuff/MixPanelStuff';
import _ from 'lodash';

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

function ClubChatScreen({navigation, dispatch, route}) {
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
  /*

  const mixpanel = useContext(MixpanelContext);
  useEffect(() => {
    mixpanel.track('Opened Club Chat');
  }, []);
  */

  const modalizeRefGifSheet = useRef(null);

  const onOpenGifSheet = () => {
    modalizeRefGifSheet.current?.open();
  };

  const modalizeRefBitmojiSheet = useRef(null);

  const onOpenBitmojiSheet = () => {
    modalizeRefBitmojiSheet.current?.open();
  };

  var trending_gifs_data_block = state_here.TrendingGifsReducer.trending_gifs;

  var trending_photos_data_block =
    state_here.TrendingPhotosReducer.trending_photos;

  function LeftHeaderComponent() {
    return (
      <Pressable
        style={{width: 75, height: 35}}
        onPress={() =>
          navigation.navigate('ClubFramesList', {
            club_id: clubID,
            live_who: liveWho,
            club_name: clubNameHere,
          })
        }>
        <Icon type="feather" color={font_color_header} name="layers" />
      </Pressable>
    );
  }

  function RightHeaderComponent() {
    return (
      <Pressable
        style={{width: 75, height: 35}}
        onPress={() => navigation.goBack()}>
        <Icon type="feather" color={font_color_header} name="chevron-down" />
      </Pressable>
    );
  }

  function CenterHeaderComponent() {
    console.log(liveWho);
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {clubNameHere.substring(0, 14)}
        </Text>
        <View style={styles.center_header_people_view}>
          {[].map(item => (
            <Image
              style={styles.center_header_people_image}
              source={{
                uri: 'https://robohash.org/aliquidmaximedolor.png',
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  const [imagePicked, setImagePicked] = useState('');
  const [imagePickedMime, setImagePickedMime] = useState('');
  const [imagePickedName, setImagePickedName] = useState('');
  const [imagePickerCraftVisible, setImagePickerCraftVisible] = useState(false);

  const imagePickerCraftOverlay = () => {
    setImagePickerCraftVisible(!imagePickerCraftVisible);
  };

  function ImagePickerOverlayInput() {
    const [textMessage, setTextMessage] = useState('');
    const sendMessageNewFrame = message => {
      console.log('sending picked image - new frames');
      if (messages.length === 0) {
        console.log('no live messsages here');
        if (message) {
          pubnub.sendFile(
            {
              channel: channelsHere[0],
              message: {
                test: message,
                //value: 42
              },
              file: {
                uri: imagePicked,
                name: imagePickedName,
                mimeType: imagePickedMime,
              },
              meta: {
                type: 'b',
                user_dp: state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              StartFrame();
              console.log(status);
            },
          );

          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
        } else {
        }
      } else {
        console.log('yes live messsages here');
        if (message) {
          pubnub.sendFile(
            {
              channel: channelsHere[0],
              message: {
                test: message,
                //value: 42
              },
              file: {
                uri: imagePicked,
                name: imagePickedName,
                mimeType: imagePickedMime,
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
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      console.log('sending picked image - old frame');
      if (message) {
        pubnub.sendFile(
          {
            channel: channelsHere[0],
            message: {
              test: message,
              //value: 42
            },
            file: {
              uri: imagePicked,
              name: imagePickedName,
              mimeType: imagePickedMime,
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
        //.catch(err => console.log(err));
      } else {
      }
    };

    return (
      <Overlay
        isVisible={imagePickerCraftVisible}
        onBackdropPress={imagePickerCraftOverlay}
        overlayStyle={styles.image_picker_craft_overlay}>
        <SafeAreaView style={styles.image_picker_craft_items_view}>
          <Pressable
            style={{alignSelf: 'flex-end', marginHorizontal: 10}}
            onPress={() => imagePickerCraftOverlay()}>
            <IconlyCloseSquareIcon />
          </Pressable>
          <FastImage
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            source={{uri: imagePicked}}>
            <View
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                flexDirection: 'column-reverse',
              }}>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
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
                  maxLength={140}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
            </View>
          </FastImage>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            <Pressable
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                Keyboard.dismiss;
                setTextMessage('');
                imagePickerCraftOverlay();
                setImagePicked('');
              }}>
              <IconlyDirectIcon Color="lightgreen" />
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Overlay>
    );
  }

  const [cameraPicked, setCameraPicked] = useState('');
  const [cameraPickedMime, setCameraPickedMime] = useState('');
  const [cameraPickedName, setCameraPickedName] = useState('');
  const [cameraPickerCraftVisible, setCameraPickerCraftVisible] = useState(
    false,
  );

  const cameraPickerCraftOverlay = () => {
    setCameraPickerCraftVisible(!cameraPickerCraftVisible);
  };

  function CameraPickerOverlayInput() {
    const [textMessage, setTextMessage] = useState('');
    const sendMessageNewFrame = message => {
      if (messages.length === 0) {
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message: {
                test: message,
                //value: 42
              },
              file: {
                uri: cameraPicked,
                name: cameraPickedName,
                mimeType: cameraPickedMime,
              },
              meta: {
                type: 'c',
                user_dp: state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(status);
              StartFrame();
            },
          );
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
        } else {
        }
      } else {
        if (message) {
          pubnub.sendFile(
            {
              channel: channelsHere[0],
              message: {
                test: message,
                //value: 42
              },
              file: {
                uri: cameraPicked,
                name: cameraPickedName,
                mimeType: cameraPickedMime,
              },
              meta: {
                type: 'c',
                user_dp: state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(status);
            },
          );
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      if (message) {
        pubnub.sendFile(
          {
            channel: channelsHere[0],
            message: {
              test: message,
              //value: 42
            },
            file: {
              uri: cameraPicked,
              name: cameraPickedName,
              mimeType: cameraPickedMime,
            },
            meta: {
              type: 'c',
              user_dp: state_here.MyProfileReducer.myprofile.image,
            },
          },
          function (status, response) {
            console.log(status);
          },
        );
        //.catch(err => console.log(err));
      } else {
      }
    };

    return (
      <Overlay
        isVisible={cameraPickerCraftVisible}
        onBackdropPress={cameraPickerCraftOverlay}
        overlayStyle={styles.camera_picker_craft_overlay}>
        <SafeAreaView style={styles.camera_picker_craft_items_view}>
          <Pressable
            style={{alignSelf: 'flex-end', marginHorizontal: 10}}
            onPress={() => cameraPickerCraftOverlay()}>
            <IconlyCloseSquareIcon />
          </Pressable>
          <FastImage
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            source={{uri: cameraPicked}}>
            <View
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                flexDirection: 'column-reverse',
              }}>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
                size={60}
                containerStyle={styles.c_avatar}
              />
              <View style={styles.c_text_view}>
                <TextInput
                  placeholder="type..."
                  placeholderTextColor="#fafafa50"
                  style={styles.c_text}
                  multiline
                  autoline
                  maxLength={140}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
            </View>
            <Pressable
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                Keyboard.dismiss;
                setTextMessage('');
                imageSelectorCraftOverlay();
                setImageSelected('');
              }}>
              <IconlyDirectIcon Color="lightgreen" />
            </Pressable>
          </FastImage>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            <Pressable
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                Keyboard.dismiss;
                setTextMessage('');
                cameraPickerCraftOverlay();
                setCameraPicked('');
              }}>
              <IconlyDirectIcon Color="lightgreen" />
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Overlay>
    );
  }

  function OtherInputBar() {
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
            }).then(image => {
              console.log(image);
              setCameraPicked(image.path);
              setCameraPickedMime(image.mime);
              setCameraPickedName('camera_photo');
              cameraPickerCraftOverlay();
            });
          }}>
          <Image
            source={require('../../assets/iconcamera.png')}
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
            source={require('../../assets/icongallery.png')}
            style={styles.OtherInputIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => {
            onOpenBitmojiSheet();
          }}>
          <Image
            source={require('../../assets/iconbitmoji.png')}
            style={styles.OtherInputIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => {
            onOpenGifSheet();
          }}>
          <Image
            source={require('../../assets/icongif.png')}
            style={styles.OtherInputIcon}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const handleMessage = event => {
    if (messages.includes(event) === false) {
      addMessage(messages => [...messages, event]);
    } else {
      addMessage(messages);
    }
  };

  const handleHereNowResponse = event => {
    function InternalHandle(res) {
      if (res) {
        var people_here = res.channels[channelIdHere].occupants;
        setLiveWho(people_here);
      }
    }
    pubnub.hereNow(
      {
        channels: [channelIdHere],
        includeUUIDs: true,
        includeState: true,
      },
      (status, response) => {
        InternalHandle(response);
      },
    );
  };

  useEffect(() => {
    handleHereNowResponse();
  }, []);

  useEffect(() => {
    pubnub.subscribe({channels: channelsHere});
    if (!channelOnGoing) {
      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: nowTimeStamp,
          count: 25, // default/max is 25 messages for multiple channels (up to 500)
        },
        function (status, response) {
          if (response) {
            changeOldMessagesResolve(true);
          }
        },
      );
    } else {
      //console.log(nowTimeStamp);
      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: nowTimeStamp + '0000',
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
    //pubnub.addListener({presence: handleHereNowResponse});
    pubnub.addListener({file: handleMessage});
  }, [pubnub, channelsHere]);

  function LiveMessagesView() {
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
            contentContainerStyle={styles.body_scroll_view_content_container}
            showsVerticalScrollIndicator={false}
            ref={scrollView}
            onContentSizeChange={() =>
              scrollView.current.scrollToEnd({animated: true})
            }>
            {_.uniqBy(messages, 'timetoken').map((message, index) => (
              <ShowMessage Message={message} />
            ))}
          </ScrollView>
        );
      } else {
        if (Object.entries(old_messages.channels).length === 0) {
          return (
            <ScrollView
              style={styles.body_scroll_view}
              contentContainerStyle={styles.body_scroll_view_content_container}
              showsVerticalScrollIndicator={false}
              ref={scrollView}
              onContentSizeChange={() =>
                scrollView.current.scrollToEnd({animated: true})
              }>
              {_.uniqBy(messages, 'timetoken').map((message, index) => (
                <ShowMessage Message={message} />
              ))}
            </ScrollView>
          );
        } else {
          var x_here = old_messages.channels[channelIdHere];

          return (
            <ScrollView
              style={styles.body_scroll_view}
              contentContainerStyle={styles.body_scroll_view_content_container}
              showsVerticalScrollIndicator={false}
              ref={scrollView}
              onContentSizeChange={() =>
                scrollView.current.scrollToEnd({animated: true})
              }>
              {old_messages.channels[channelIdHere].map((item, index) => (
                <ShowMessageOld Message={item} />
              ))}
              {_.uniqBy(messages, 'timetoken').map((message, index) => (
                <ShowMessage Message={message} />
              ))}
            </ScrollView>
          );
        }
      }
    }
  }

  function StartFrame() {
    var timeToken = dayjs().unix();

    var new_frame_notif_payload = {
      text: 'new frame started',
      pn_gcm: {
        topic: 'new_frame',
        android: {
          notification: {
            title: {clubNameHere},
            body: 'new frame started',
          },
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
        .then(
          pubnub.publish(
            {
              channel: channelIdHere,
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

  function InputXXX() {
    useEffect(() => {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

      // cleanup function
      return () => {
        Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
      };
    }, []);

    const [typevalue, changeTypevalue] = useState('');

    var chosenMedia = '';

    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const _keyboardDidShow = () => {
      setKeyboardStatus(true);
    };
    const _keyboardDidHide = () => {
      setKeyboardStatus(false);
    };

    function SetChosenMedia(image_link) {
      chosenMedia = image_link;
    }

    function SetChosenMediaEmpty() {
      chosenMedia = '';
    }

    function EachRecoItem(props) {
      const [selected, setSelected] = useState(false);

      if (selected) {
        return (
          <Pressable
            style={{
              shadowColor: '#000',
              width: 125,
              height: 72.5,
              marginHorizontal: 5,
            }}
            onPress={() => {
              SetChosenMediaEmpty();
              setSelected(false);
            }}>
            <BetterImage
              viewStyle={{
                width: 125,
                height: 72.5,
                borderRadius: 10,
                borderWidth: 3,
                borderColor: '#36B37E',
              }}
              source={{
                uri: props.Item,
              }}
              thumbnailSource={{
                uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
              }}
              fallbackSource={{
                uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
              }}
            />
          </Pressable>
        );
      } else {
        return (
          <Pressable
            style={{
              borderRadius: 3,
              width: 125,
              height: 72.5,
              marginHorizontal: 5,
              backgroundColor: '#FFFFFF80',
            }}
            onPress={() => {
              setSelected(true);
              SetChosenMedia(props.Item);
            }}>
            <BetterImage
              viewStyle={{
                width: 125,
                height: 72.5,
              }}
              source={{
                uri: props.Item,
              }}
              thumbnailSource={{
                uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
              }}
              thumbnailBlurRadius={-10}
              fallbackSource={{
                uri: 'https://i.postimg.cc/qRyS6444/thumb.jpg',
              }}
            />
          </Pressable>
        );
      }
    }

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
          axios
            .get(
              'https://apisayepirates.life/api/users/recommend_images/' +
                String(state_here.MyProfileReducer.myprofile.user.id) +
                '/' +
                typevalue,
            )
            .then(response => (res = response.data))
            .then(() => setRec(res[0]))
            .catch(err => {
              console.log(err);
            });
        }, [typevalue]);
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
            {rec.map((item, index) => (
              <EachRecoItem Item={item} />
            ))}
          </ScrollView>
        );
      } else {
        return <View />;
      }
    }

    const sendMessageNewFrame = message => {
      if (messages.length === 0) {
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message,
              meta: {
                type: 'h',
                image_url: chosenMedia,
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
                image_url: chosenMedia,
                user_dp: state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(status);
              console.log(response);
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
              image_url: chosenMedia,
              user_dp: state_here.MyProfileReducer.myprofile.image,
            },
          },
          function (status, response) {
            console.log(status);
            console.log(response);
          },
        );
      } else {
      }
    };

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          borderColor: input_border_color,
          minHeight: 55,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <RecoOverLay />

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
              onPress={() => {
                Keyboard.dismiss;
                if (!channelOnGoing) {
                  sendMessageNewFrame(typevalue);
                } else {
                  sendMessageOldFrame(typevalue);
                }

                changeTypevalue('');
              }}>
              <IconlyDirectIcon Color="#36B37E" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const [imageSelected, setImageSelected] = useState('');
  const [imageSelectorCraftVisible, setImageSelectorCraftVisible] = useState(
    false,
  );

  const imageSelectorCraftOverlay = () => {
    setImageSelectorCraftVisible(!imageSelectorCraftVisible);
  };

  function ImageSelectorOverlayInput() {
    const [textMessage, setTextMessage] = useState('');
    const sendMessageNewFrame = message => {
      if (messages.length === 0) {
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message,
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
        }
      } else {
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message,
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
      }
    };

    return (
      <Overlay
        isVisible={imageSelectorCraftVisible}
        onBackdropPress={imageSelectorCraftOverlay}
        overlayStyle={styles.image_selector_craft_overlay}>
        <SafeAreaView style={styles.image_selector_craft_items_view}>
          <Pressable
            style={{alignSelf: 'flex-end', marginHorizontal: 10}}
            onPress={() => imageSelectorCraftOverlay()}>
            <IconlyCloseSquareIcon />
          </Pressable>
          <FastImage
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            source={{uri: imageSelected}}>
            <View
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                flexDirection: 'column-reverse',
              }}>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
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
                  maxLength={140}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
            </View>
          </FastImage>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            <Pressable
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                Keyboard.dismiss;
                setTextMessage('');
                imageSelectorCraftOverlay();
                setImageSelected('');
              }}>
              <IconlyDirectIcon Color="lightgreen" />
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Overlay>
    );
  }

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
        <Image
          source={{uri: item.item.urls.thumb}}
          style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
        />
      </Pressable>
    );
  }

  const [gifSelected, setGifSelected] = useState('');
  const [gifSelectorCraftVisible, setGifSelectorCraftVisible] = useState(false);

  const gifSelectorCraftOverlay = () => {
    setGifSelectorCraftVisible(!gifSelectorCraftVisible);
  };

  function GIFSelectorOverlayInput() {
    const [textMessage, setTextMessage] = useState('');
    const sendMessageNewFrame = message => {
      if (messages.length === 0) {
        console.log('new frame, no messages gif');
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message,
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
        }
      } else {
        console.log('new frame, yes messages gif');
        if (message) {
          pubnub.publish({
            channel: channelsHere[0],
            message,
            meta: {
              type: 'f',
              image_url: gifSelected,
              user_dp: state_here.MyProfileReducer.myprofile.image,
            },
          });
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      console.log('old frame, yes messages');
      if (message) {
        pubnub
          .publish({
            channel: channelsHere[0],
            message,
            meta: {
              type: 'f',
              image_url: gifSelected,
              user_dp: state_here.MyProfileReducer.myprofile.image,
            },
          })
          .catch(err => console.log(err));
      } else {
      }
    };

    return (
      <Overlay
        isVisible={gifSelectorCraftVisible}
        onBackdropPress={gifSelectorCraftOverlay}
        overlayStyle={styles.gif_selector_craft_overlay}>
        <SafeAreaView style={styles.gif_selector_craft_items_view}>
          <Pressable
            style={{alignSelf: 'flex-end', marginHorizontal: 10}}
            onPress={() => gifSelectorCraftOverlay()}>
            <IconlyCloseSquareIcon />
          </Pressable>
          <FastImage
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            source={{uri: gifSelected}}>
            <View
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                flexDirection: 'column-reverse',
              }}>
              <Avatar
                rounded
                source={{uri: state_here.MyProfileReducer.myprofile.image}}
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
                  maxLength={140}
                  onChangeText={text => setTextMessage(text)}
                />
              </View>
            </View>
          </FastImage>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}>
            <Pressable
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                Keyboard.dismiss;
                setTextMessage('');
                gifSelectorCraftOverlay();
                setGifSelected('');
              }}>
              <IconlyDirectIcon Color="lightgreen" />
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Overlay>
    );
  }

  const [gifsSearch, changeGifSearch] = useState('love');

  useEffect(() => {
    dispatch(TrendingGifsActions(gifsSearch));
  }, [dispatch, gifsSearch]);

  function RenderTrendingGifs(item) {
    return (
      <Pressable
        style={{margin: 3}}
        onPress={() => {
          setGifSelected(item.item.images.downsized.url);
          gifSelectorCraftOverlay();
        }}>
        <Image
          source={{uri: item.item.images.preview_gif.url}}
          style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
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
      <ImageSelectorOverlayInput />
      <CameraPickerOverlayInput />
      <GIFSelectorOverlayInput />
      <Modalize
        ref={modalizeRefBitmojiSheet}
        snapPoint={1000}
        modalHeight={windowHeight * 0.6}
        modalStyle={styles.other_input_modals_style}
        HeaderComponent={
          <View style={styles.modal_search_view_wrap}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={search => {
                changeImageSearch(search);
              }}
              value={imageSearch}
              containerStyle={styles.media_modal_search_bar_container}
              inputContainerStyle={
                styles.media_modal_search_bar_input_container
              }
            />
          </View>
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
          <View style={styles.modal_search_view_wrap}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={changeGifSearch}
              value={gifsSearch}
              containerStyle={styles.media_modal_search_bar_container}
              inputContainerStyle={
                styles.media_modal_search_bar_input_container
              }
            />
          </View>
        }
        flatListProps={{
          data: trending_gifs_data_block,
          renderItem: RenderTrendingGifs,
          keyExtractor: item => item.id,
          numColumns: 2,
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ClubChatScreen);

const styles = StyleSheet.create({
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
    //color: '#050505',
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
    height: 26,
    width: 26,
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
    fontFamily: 'GothamRounded-Book',
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
    fontFamily: 'GothamRounded-Book',
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
    fontFamily: 'GothamRounded-Book',
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
    fontFamily: 'GothamRounded-Book',
    fontSize: 15,
  },
  c_type_view: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
