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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var state_here = [];

function DirectChatScreen({navigation, dispatch, route}) {
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
  const [old_messages, addOldMessages] = useState({});
  const [old_messages_resolve, changeOldMessagesResolve] = useState(false);
  //console.log(old_messages.channels[this_channel_string] + 'old messages');
  //var messages = [];
  const [forceAddMedia, changeForceAddMedia] = useState('');
  var input_bar_flex = 0.16;
  const [inputbarflex, changeInputBarFlex] = useState(input_bar_flex);

  useEffect(() => {
    setNowTimeStamp(dayjs().valueOf() + '0000');
  }, []);

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
        color="#fff"
        name="layers"
        onPress={() => navigation.navigate('ClubFramesList')}
      />
    );
  }

  function RightHeaderComponent() {
    return (
      <Icon
        type="feather"
        color="#fff"
        name="chevron-down"
        onPress={() => navigation.goBack()}
      />
    );
  }

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
      if (messages.length === 0) {
        if (message) {
          pubnub
            .publish(
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
                meta: {type: 'b'},
              },
              function (status, response) {
                StartFrame(response.timetoken);
              },
            )
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      } else {
        if (message) {
          pubnub
            .sendFile({
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
              meta: {type: 'b'},
            })
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      if (message) {
        pubnub
          .sendFile({
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
            meta: {type: 'b'},
          })
          .catch(err => console.log(err));
      } else {
      }
    };

    return (
      <Overlay
        isVisible={imagePickerCraftVisible}
        onBackdropPress={imagePickerCraftOverlay}
        overlayStyle={styles.image_picker_craft_overlay}>
        <SafeAreaView style={styles.image_picker_craft_items_view}>
          <Image
            style={{width: windowWidth, height: windowWidth}}
            source={{uri: imagePicked}}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.image_picker_craft_keyboard_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={styles.image_picker_craft_text}
              multiline
              onChangeText={text => setTextMessage(text)}
            />
            <Icon
              name="send"
              type="feather"
              color="tomato"
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                //sendMessage(typevalue);
                Keyboard.dismiss;
                setTextMessage('');
                imagePickerCraftOverlay();
                setImagePicked('');
                //changeTextInputHeight(80);
                //changeInputBarFlex(0.14);
              }}
            />
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
          pubnub
            .publish(
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
                meta: {type: 'b'},
              },
              function (status, response) {
                StartFrame(response.timetoken);
              },
            )
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      } else {
        if (message) {
          pubnub
            .sendFile({
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
              meta: {type: 'b'},
            })
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      if (message) {
        pubnub
          .sendFile({
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
            meta: {type: 'b'},
          })
          .catch(err => console.log(err));
      } else {
      }
    };

    return (
      <Overlay
        isVisible={cameraPickerCraftVisible}
        onBackdropPress={cameraPickerCraftOverlay}
        overlayStyle={styles.camera_picker_craft_overlay}>
        <SafeAreaView style={styles.camera_picker_craft_items_view}>
          <Image
            style={{width: windowWidth, height: windowWidth}}
            source={{uri: cameraPicked}}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.camera_picker_craft_keyboard_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={styles.camera_picker_craft_text}
              multiline
              onChangeText={text => setTextMessage(text)}
            />
            <Icon
              name="send"
              type="feather"
              color="tomato"
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                //sendMessage(typevalue);
                Keyboard.dismiss;
                setTextMessage('');
                cameraPickerCraftOverlay();
                setCameraPicked('');
                //changeTextInputHeight(80);
                //changeInputBarFlex(0.14);
              }}
            />
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
    addMessage(messages => [...messages, event]);
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
    //pubnub.subscribe({channels: channelsHere, withPresence: true});
    pubnub.subscribe({channels: channelsHere});
    if (!channelOnGoing) {
      //console.log(channelOnGoing + 'on going or not');
      //console.log(nowTimeStamp + 'on going subcrube time stamp');
      pubnub.fetchMessages(
        {
          channels: [channelsHere],
          includeMeta: true,
          end: nowTimeStamp,
          count: 25, // default/max is 25 messages for multiple channels (up to 500)
        },
        function (status, response) {
          //console.log(response);
          addOldMessages(response);
          changeOldMessagesResolve(true);
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
          //console.log(response + 'response for on going ');
          addOldMessages(response);
          changeOldMessagesResolve(true);
        },
      );
    }
    pubnub.addListener({message: handleMessage});
    //pubnub.addListener({presence: handleHereNowResponse});
    pubnub.addListener({file: handleMessage});
  }, [pubnub, channelsHere]);

  function LiveMessagesView() {
    if (!old_messages_resolve) {
      return (
        <ScrollView
          style={styles.body_scroll_view}
          contentContainerStyle={styles.body_scroll_view_content_container}
        />
      );
    } else {
      if (Object.entries(old_messages.channels).length === 0) {
        //console.log('old messages not there');
        return (
          <ScrollView
            style={styles.body_scroll_view}
            contentContainerStyle={styles.body_scroll_view_content_container}>
            {messages.map((message, index) => (
              <ShowMessage Message={message} />
            ))}
          </ScrollView>
        );
      } else {
        //console.log(old_messages.channels[channelIdHere]);
        //console.log(old_messages.channels[channelIdHere] + 'map array');
        //console.log('old messages are there');
        return (
          <ScrollView
            style={styles.body_scroll_view}
            contentContainerStyle={styles.body_scroll_view_content_container}>
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

  function StartFrame(startTime) {
    //console.log(startTime + 'start time sent here');
    if (messages.length === 0) {
      var config = {
        method: 'post',
        url:
          'https://a4550691-a64c-4de4-938d-80e73d8f8c1f.mock.pstmn.io/new_frame/club_id',
        headers: {'content-type': 'application/json'},
        data: {
          start_time: startTime / 10000000,
          end_time: startTime / 10000000 + 43200,
          club_id: clubID,
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
          pubnub
            .publish(
              {channel: channelsHere[0], message, meta: {type: type_message}},
              function (status, response) {
                StartFrame(response.timetoken);
              },
            )
            .then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      } else {
        if (message) {
          pubnub
            .publish({
              channel: channelsHere[0],
              message,
              meta: {type: type_message},
            })
            .then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      if (message) {
        pubnub
          .publish({
            channel: channelsHere[0],
            message,
            meta: {type: type_message},
          })
          .then(() => changeTypevalue(''))
          .catch(err => console.log(err));
      } else {
      }
    };

    return (
      <View style={{flex: input_bar_flex}}>
        <View style={styles.textinputview}>
          <AutoGrowingTextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              fontFamily: 'GothamRounded-Book',
              color: '#fff',
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
          <Icon
            name="send"
            type="feather"
            color="tomato"
            onPress={() => {
              if (!channelOnGoing) {
                sendMessageNewFrame(typevalue);
              } else {
                sendMessageOldFrame(typevalue);
              }

              //sendMessage(typevalue);
              Keyboard.dismiss;
              changeTypevalue('');
              changeTextInputHeight(80);
              changeInputBarFlex(0.14);
            }}
          />
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
          pubnub
            .publish(
              {
                channel: channelsHere[0],
                message,
                meta: {type: 'g', image_url: imageSelected},
              },
              function (status, response) {
                StartFrame(response.timetoken);
              },
            )
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      } else {
        if (message) {
          pubnub
            .publish({
              channel: channelsHere[0],
              message,
              meta: {type: 'g', image_url: imageSelected},
            })
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      if (message) {
        pubnub
          .publish({
            channel: channelsHere[0],
            message,
            meta: {type: 'g', image_url: imageSelected},
          })
          //.then(() => changeTypevalue(''))
          .catch(err => console.log(err));
      } else {
      }
    };

    return (
      <Overlay
        isVisible={imageSelectorCraftVisible}
        onBackdropPress={imageSelectorCraftOverlay}
        overlayStyle={styles.image_selector_craft_overlay}>
        <SafeAreaView style={styles.image_selector_craft_items_view}>
          <Image
            style={{width: windowWidth, height: windowWidth}}
            source={{uri: imageSelected}}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.image_selector_craft_keyboard_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={styles.image_picker_craft_text}
              multiline
              onChangeText={text => setTextMessage(text)}
            />
            <Icon
              name="send"
              type="feather"
              color="tomato"
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                //sendMessage(typevalue);
                Keyboard.dismiss;
                setTextMessage('');
                imageSelectorCraftOverlay();
                setImageSelected('');
                //changeTextInputHeight(80);
                //changeInputBarFlex(0.14);
              }}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Overlay>
    );
  }

  const [imageSearch, changeImageSearch] = useState('love');

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
        if (message) {
          pubnub
            .publish(
              {
                channel: channelsHere[0],
                message,
                meta: {type: 'f', image_url: gifSelected},
              },
              function (status, response) {
                StartFrame(response.timetoken);
              },
            )
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      } else {
        if (message) {
          pubnub
            .publish({
              channel: channelsHere[0],
              message,
              meta: {type: 'f', image_url: gifSelected},
            })
            //.then(() => changeTypevalue(''))
            .catch(err => console.log(err));
        } else {
        }
      }
    };
    const sendMessageOldFrame = message => {
      if (message) {
        pubnub
          .publish({
            channel: channelsHere[0],
            message,
            meta: {type: 'f', image_url: gifSelected},
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
          <Image
            style={{width: windowWidth, height: windowWidth}}
            source={{uri: gifSelected}}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.gif_selector_craft_keyboard_view}>
            <TextInput
              placeholder="type..."
              placeholderTextColor="#fafafa50"
              style={styles.gif_selector_craft_text}
              multiline
              onChangeText={text => setTextMessage(text)}
            />
            <Icon
              name="send"
              type="feather"
              color="tomato"
              onPress={() => {
                if (!channelOnGoing) {
                  sendMessageNewFrame(textMessage);
                } else {
                  sendMessageOldFrame(textMessage);
                }

                //sendMessage(typevalue);
                Keyboard.dismiss;
                setTextMessage('');
                imageSelectorCraftOverlay();
                setImageSelected('');
                //changeTextInputHeight(80);
                //changeInputBarFlex(0.14);
              }}
            />
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
          source={{uri: item.item.images.downsized.url}}
          style={{width: (windowWidth - 10) / 2, height: windowWidth / 2}}
        />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#050505"
        containerStyle={styles.header_container}>
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

export default connect(mapStateToProps)(DirectChatScreen);

const styles = StyleSheet.create({
  modal_search_view_wrap: {
    width: windowWidth,
    height: 60,
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
    backgroundColor: '#f1f4f9',
    width: windowWidth,
    borderRadius: 10,
  },
  body_scroll_view_content_container: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#050505',
    alignItems: 'center',
  },
  header_container: {borderBottomWidth: 0},
  center_header_view: {flexDirection: 'column'},
  center_header_club_name: {
    color: '#fff',
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
    height: windowHeight * 0.7,
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
    height: windowHeight * 0.7,
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
    height: windowHeight * 0.7,
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
    height: windowHeight * 0.7,
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
});
