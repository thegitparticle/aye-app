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
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Pressable,
  ImageBackground,
} from 'react-native';
import {
  Icon,
  Overlay,
  Header,
  Avatar,
  SearchBar,
  Button,
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
import IconlyCloseSquareIcon from '../uibits/IconlyCloseSquareIcon';
import FastImage from 'react-native-fast-image';
import IconlyDirectIcon from '../uibits/IconlyDirectIcon';
import BetterImage from 'react-native-better-image';
import {BlurView} from '@react-native-community/blur';
import {MixpanelContext} from '../pnstuff/MixPanelStuff';
import ChosenRecoItem from '../chatitems/typed/ChosenRecoItem';

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

  /*

  useEffect(() => {
    pubnub.objects.removeMemberships({
      channels: ['4_undefined_d'],
    });
  }, []);

  */

  const [messages, addMessage] = useState([]);
  const [liveMembers, setLiveMembers] = useState([]);
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

  var trending_photos_data_block =
    state_here.TrendingPhotosReducer.trending_photos;

  function LeftHeaderComponent() {
    return (
      <Pressable
        style={{width: 75, height: 35}}
        onPress={() =>
          navigation.navigate('DirectFramesList', {
            direct_id: directIdHere,
            //live_who: liveWho,
            other_name: otherNameHere,
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
        <Icon
          type="feather"
          color={font_color_header}
          name="chevron-down"
          onPress={() => navigation.goBack()}
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
        //if (message) {
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
        // } else {
        //}
      } else {
        console.log('yes live messsages here');
        // if (message) {
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
        // } else {
        //}
      }
    };
    const sendMessageOldFrame = message => {
      console.log('sending picked image - old frame');
      // if (message) {
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
      //} else {
      //}
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
                  autoFocus={true}
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
        //if (message) {
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
            console.log(status.statusCode);
            StartFrame();
          },
        );
        //.then(() => changeTypevalue(''))
        //.catch(err => console.log(err));
        //} else {
        //}
      } else {
        //if (message) {
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
            console.log(status.statusCode);
          },
        );
        //.then(() => changeTypevalue(''))
        //.catch(err => console.log(err));
        // } else {
        //}
      }
    };
    const sendMessageOldFrame = message => {
      // if (message) {
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
          console.log(status.statusCode);
        },
      );
      //.catch(err => console.log(err));
      // } else {
      //}
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
                  autoFocus={true}
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
  /*
  const handleMessage = (event) => {
    //console.log('message event: ' + event.message);
    const message = event.message;
    //console.log(event.userMetadata.type);
    if (event.userMetadata.type === 'd') {
      // if (typeof message === 'string' || message.hasOwnProperty('text')) {
      //const text = message.text || message;
      addMessage((messages) => [...messages, event]);
      console.log('messages: ' + messages);
      //}
    } else {
      //if (typeof message === 'string' || message.hasOwnProperty('text')) {
      //const text = message.text || message;
      addMessage((messages) => [...messages, event]);
      console.log('messages: ' + messages);
      //console.log(messages);
      // }
    }
  };
*/
  /*
  const handlePresenceChange = (event) => {
    console.log(event);
    console.log(event.action + ' ' + event.uuid + ' ' + 'ACTION OF PRESENCE');
    const user_id = event.uuid;
    if (event.action === 'join') {
      setLiveMembers((liveMembers) => [...liveMembers, user_id]);
    } else {
      var index = liveMembers.indexOf(user_id);
      var list_here = liveMembers.splice(index, 1);
      setLiveMembers(list_here);
    }
  };
  */

  const handleMessage = event => {
    if (messages.includes(event) === false) {
      addMessage(messages => [...messages, event]);
    } else {
      addMessage(messages);
    }
  };

  const handleHereNowResponse = event => {
    pubnub.hereNow(
      {
        channels: [directIdHere],
        includeUUIDs: true,
        includeState: true,
      },
      (status, response) => {
        internalHandle(response);
      },
    );
    function internalHandle(res) {
      if (res) {
        var people_here = res.channels[directIdHere].occupants;

        //setLiveWho(people_here);
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
          count: 25, // default/max is 25 messages for multiple channels (up to 500)
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
                  <ShowMessage Message={message} />
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
                    <ShowMessage Message={message} />
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
                    <ShowMessageOld Message={item} />
                    //<Text>{item.message}</Text>
                  ))}
                  {_.uniqBy(messages, 'timetoken').map((message, index) => (
                    <ShowMessage Message={message} />
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
    //console.log(startTime + 'start time sent here');
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

    const [pick, setPick] = useState('');

    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const _keyboardDidShow = () => setKeyboardStatus(true);
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
              <BetterImage
                viewStyle={{
                  width: 125,
                  height: 72.5,
                  borderRadius: 10,
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
          axios
            .get(
              'https://apisayepirates.life/api/users/recommend_images/' +
                String(state_here.MyProfileReducer.myprofile.user.id) +
                '/' +
                typevalue,
            )
            .then(response => (res = response.data))
            .then(() => setRec(_.concat(res[0], res[1])))
            .catch(err => {
              console.log(err);
            });
        }, [typevalue]);

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
          title: otherNameHere,
          body: 'new messages for you ;)',
        },
      },
    };

    const sendMessageNewFrame = message => {
      if (messages.length === 0) {
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
                } else {
                  showMessage({
                    message: 'Please choose an image or gif to send message!',
                    type: 'info',
                    backgroundColor: 'indianred',
                  });
                }
              }}>
              <IconlyDirectIcon Color="#36B37E" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const [imageSelected, setImageSelected] = useState('beach');
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
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
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
              StartFrame();
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
        //.then(() => changeTypevalue(''))
        //.catch(err => console.log(err));
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
                  autoFocus={true}
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
        <ImageBackground
          source={{uri: item.item.urls.thumb}}
          style={{
            width: (windowWidth - 10) / 2,
            height: windowWidth / 2,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
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
        if (message.length === 0) {
          const message = 'jibber$$$';
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
        }
      } else {
        console.log('new frame, yes messages gif');
        if (message.length === 0) {
          const message = 'jibber$$$';
          pubnub.publish({
            channel: channelsHere[0],
            message,
            meta: {
              type: 'f',
              image_url: gifSelected,
              user_dp: state_here.MyProfileReducer.myprofile.image,
            },
            function(status, response) {
              console.log(status);
            },
          });
        } else {
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
              console.log(status);
            },
          );
        }
      }
    };
    const sendMessageOldFrame = message => {
      console.log('old frame, yes messages');
      if (message.length === 0) {
        const message = 'jibber$$$';
        pubnub.publish({
          channel: channelsHere[0],
          message,
          meta: {
            type: 'f',
            image_url: gifSelected,
            user_dp: state_here.MyProfileReducer.myprofile.image,
          },
          function(status, response) {
            console.log(status);
          },
        });
      } else {
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
            console.log(status);
          },
        );
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
                  autoFocus={true}
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
                setImageSelected('');
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
          setGifSelected(item.item.images.fixed_height.url);
          gifSelectorCraftOverlay();
        }}>
        <Image
          source={{uri: item.item.images.fixed_height_small.url}}
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
          //paddingBottom: 10,
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
        FooterComponent={
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              //zIndex: 9999,
              position: 'absolute',
              bottom: 0.2,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../assets/giphy_branding.png')}
              style={{backgroundColor: 'black'}}
            />
          </View>
        }
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
