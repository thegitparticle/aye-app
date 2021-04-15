/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Pressable,
} from 'react-native';
import {Icon, Overlay, Header, Avatar, SearchBar} from 'react-native-elements';
import {useHeaderHeight} from '@react-navigation/stack';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
//import MessagesView from './MessagesView';
//import {messages1} from './Messages1';
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = {};

function ClubChatScreen({navigation, dispatch, route}) {
  const pubnub = usePubNub();
  const {
    clubID,
    clubNameHere,
    channelIdHere,
    channelOnGoing,
    channelEndTime,
    channelStartTime,
    livePeople,
  } = route.params;
  const [channelsHere] = useState([channelIdHere]);
  //console.log(livePeople + 'live people');
  const this_channel_string = channelsHere[0];
  const [messages, addMessage] = useState([]);
  //console.log(messages);
  const [liveWho, setLiveWho] = useState(livePeople);
  const [liveMembers, setLiveMembers] = useState([]);
  const [nowTimeStamp, setNowTimeStamp] = useState('');
  const [old_messages, addOldMessages] = useState();
  const [old_messages_resolve, changeOldMessagesResolve] = useState(false);
  //console.log(old_messages.channels[this_channel_string] + 'old messages');
  //var messages = [];
  const [forceAddMedia, changeForceAddMedia] = useState('');
  var input_bar_flex = 0.16;
  const [inputbarflex, changeInputBarFlex] = useState(input_bar_flex);

  /*
  useEffect(() => {
    console.log('dispatch effect working');
  }, []);
  */

  useEffect(() => {
    setNowTimeStamp(dayjs().valueOf());
  }, []);

  //console.log(nowTimeStamp);

  const [textinputheight, changeTextInputHeight] = useState(50);

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
      <Icon
        type="feather"
        color="#FAFAFA"
        name="layers"
        onPress={() =>
          navigation.navigate('ClubFramesList', {
            club_id: clubID,
            live_who: liveWho,
            club_name: clubNameHere,
          })
        }
      />
    );
  }

  function RightHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#FAFAFA"
        name="chevron-down"
        onPress={() => navigation.goBack()}
      />
    );
  }

  /*
        <View style={styles.center_header_people_view}>
          {liveWho.map(item => (
            <Image
              style={styles.center_header_people_image}
              source={{
                uri: 'https://robohash.org/aliquidmaximedolor.png',
              }}
            />
          ))}
        </View>
        */
  function CenterHeaderComponent() {
    return (
      <View style={styles.center_header_view}>
        <Text style={styles.center_header_club_name}>
          {clubNameHere.substring(0, 13)}
        </Text>
        <View style={styles.center_header_people_view}>
          {liveWho.map(item => (
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
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
              user_dp:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
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
              user_dp:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
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
          onPress={() => {
            ImagePicker.openCamera({
              cropping: true,
            }).then(image => {
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
          onPress={() => {
            ImagePicker.openPicker({
              multiple: false,
              cropping: false,
            }).then(images => {
              console.log(images);
              setImagePicked(images.sourceURL);
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
          onPress={() => {
            onOpenBitmojiSheet();
          }}>
          <Image
            source={require('../../assets/iconbitmoji.png')}
            style={styles.OtherInputIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
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
      //addMessage(messages => [...messages, event]);
      addMessage(messages.concat(event));
    } else {
      addMessage(messages);
    }
  };

  const handleHereNowResponse = event => {
    pubnub.hereNow(
      {
        channels: [channelIdHere],
        includeUUIDs: true,
        includeState: true,
      },
      (status, response) => {
        internalHandle(response);
      },
    );
    function internalHandle(res) {
      if (res) {
        var people_here = res.channels[channelIdHere].occupants;

        setLiveWho(people_here);
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
      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: channelEndTime + '0000000',
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
      console.log(old_messages);

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
            {messages.map((message, index) => (
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
              contentContainerStyle={styles.body_scroll_view_content_container}
              showsVerticalScrollIndicator={false}
              ref={scrollView}
              onContentSizeChange={() =>
                scrollView.current.scrollToEnd({animated: true})
              }>
              {messages.map((message, index) => (
                <ShowMessage Message={message} />
              ))}
            </ScrollView>
          );
        } else {
          //console.log(old_messages.channels);
          //console.log('yes old messages');
          //console.log(old_messages.channels[channelIdHere] + 'map array');
          console.log('old messages are there');
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
                //<Text>{item.message}</Text>
              ))}
              {messages.map((message, index) => (
                <ShowMessage Message={message} />
              ))}
            </ScrollView>
          );
        }
      }
    }
  }

  function StartFrame() {
    //console.log(startTime + 'start time sent here');
    var timeToken = dayjs().unix();
    if (messages.length === 0) {
      var config = {
        method: 'post',
        url: 'https://apisayepirates.life/api/clubs/create_frames_clubs/',
        headers: {'content-type': 'application/json'},
        data: {
          start_time: timeToken,
          //end_time: startTime / 10000000 + 43200,
          end_time: timeToken + 43200,
          club_name: clubID,
          channel_id: channelIdHere,
        },
      };

      axios(config).catch(error => console.log(error));
    } else {
    }
  }

  /*
  {old_messages.channels[channelIdHere].map((item, index) => (
            <Text>{item.message}</Text>
          ))}
          */

  function Input() {
    const [typevalue, changeTypevalue] = useState('');

    const type_message = 'd';
    //const type_message = 'a';

    const sendMessageNewFrame = message => {
      if (messages.length === 0) {
        if (message) {
          pubnub.publish(
            {
              channel: channelsHere[0],
              message,
              meta: {
                type: type_message,
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(status);
              console.log(response);
              StartFrame(response.timetoken);
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
                type: type_message,
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(status);
              console.log(response);
            },
          );
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
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
              type: type_message,
              user_dp:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
            },
          },
          function (status, response) {
            console.log(status);
            console.log(response);
          },
        );
        //.then(() => changeTypevalue(''))
        //.catch(err => console.log(err));
      } else {
      }
    };

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: input_bar_flex,
          backgroundColor: '#121313',
          sshadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <View style={styles.textinputview}>
          <AutoGrowingTextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 16,
              fontFamily: 'GothamRounded-Book',
              color: '#050505',
              marginRight: 20,
              flex: 1,
              height: textinputheight,
              width: windowWidth * 0.85,
            }}
            onChangeText={changeTypevalue}
            value={typevalue}
            placeholder="fun stuff only"
            placeholderTextColor="#666"
            multiline={true}
          />

          <Pressable
            onPress={() => {
              Keyboard.dismiss;
              if (!channelOnGoing) {
                sendMessageNewFrame(typevalue);
              } else {
                sendMessageOldFrame(typevalue);
              }

              //sendMessage(typevalue);
              changeTypevalue('');
              changeTextInputHeight(80);
              changeInputBarFlex(0.14);
            }}>
            <IconlyDirectIcon Color="lightgreen" />
          </Pressable>
        </View>
        <View style={styles.otherinputview}>
          <OtherInputBar />
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(status);
              //StartFrame();
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
              user_dp:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
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
    const [timeToken, setTimeToken] = useState();
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
                user_dp:
                  'https://apisayepirates.life' +
                  state_here.MyProfileReducer.myprofile.image,
              },
            },
            function (status, response) {
              console.log(response);
              StartFrame();
            },
          );
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
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
              user_dp:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
            },
          });
          //.then(() => changeTypevalue(''))
          //.catch(err => console.log(err));
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
              user_dp:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
            },
          })
          //.then(() => changeTypevalue(''))
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

  const [gifsSearch, changeGifSearch] = useState('love');

  useEffect(() => {
    dispatch(TrendingGifsActions(gifsSearch));
  }, [dispatch, gifsSearch]);

  function RenderTrendingGifs(item) {
    console.log(item.item.images);
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
      <Header
        backgroundColor="#121313"
        containerStyle={styles.header_container}
        barStyle="light-content">
        <LeftHeaderComponent />
        <CenterHeaderComponent />
        <RightHeaderComponent />
      </Header>
      <KeyboardAvoidingView
        style={styles.body_and_input_wrap}
        behavior="padding">
        <LiveMessagesView />
        <Input />
      </KeyboardAvoidingView>
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

//      <ExternalMediaImageInput />
//    <ExternalMediaGIFInput />

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(ClubChatScreen);

const styles = StyleSheet.create({
  modal_search_view_wrap: {
    width: windowWidth,
    height: 65,
  },
  otherinputview: {
    //flex: 0.35,
    height: 30,
  },
  body_and_input_wrap: {
    flex: 1,
  },
  body_scroll_view: {
    flex: 0.84,
    backgroundColor: '#FAFAFA',
    width: windowWidth,
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    borderRadius: 10,
  },
  body_scroll_view_content_container: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#121313',
    alignItems: 'center',
  },
  header_container: {borderBottomWidth: 0},
  center_header_view: {flexDirection: 'column'},
  center_header_club_name: {
    color: '#FAFAFA',
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
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
    backgroundColor: '#141414',
  },
  sticker_packs_view_wrap: {
    flexDirection: 'row',
    backgroundColor: '#141414',
  },
  image_picker_craft_overlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#050505',
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
    backgroundColor: '#050505',
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
    backgroundColor: '#050505',
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
    backgroundColor: '#050505',
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
    backgroundColor: '#050505',
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
