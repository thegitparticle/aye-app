import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {GetMyProfile} from '../redux/MyProfileActions';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function EditProfile({navigation, dispatch}) {
  const [showImagePicked, setShowImagePicked] = useState();
  useEffect(() => {
    dispatch(GetMyProfile(state_here.MyProfileReducer.myprofile.user.phone));
    setShowImagePicked(state_here.MyProfileReducer.myprofile.image);
  }, [dispatch]);

  const profileupdateid = state_here.MyProfileReducer.myprofile.id;

  const [imagePicked, setImagePicked] = useState();
  const [imagePickedMime, setImagePickedMime] = useState();
  const [imagePickedName, setImagePickedName] = useState();

  function SaveChanges() {
    const data = new FormData();

    if (imagePicked !== null) {
      data.append('bio', 'blahed');
      data.append('image', {
        uri: imagePicked,
        type: imagePickedMime,

        name: imagePickedName,
      });
    } else {
      data.append('bio', 'else, blahed');
      data.append('image', imagePicked);
    }

    var res = {};

    var config = {
      method: 'put',
      url:
        'https://apisayepirates.life/api/users/profile-update/' +
        profileupdateid +
        '/',
      headers: {
        //...data.getHeaders(),
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios(config)
      .then(response => (res = response.data))
      //.then(console.log(res + 'res back'))
      .then(() => navigation.goBack())
      //.then(() => setShowjoinspinner(false))

      //.catch((err) => console.log(err))
      .catch(e => console.log(e));
  }

  function SelectNewDP() {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
    }).then(image => {
      //console.log(image);
      setImagePicked(image.sourceURL);
      setShowImagePicked(image.sourceURL);
      //setImagePicked(image.path);
      setImagePickedMime(image.mime);
      setImagePickedName(image.filename);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>edit profile</Text>
      <View style={styles.dp_edit_view_wrap}>
        <Text style={styles.item_title_text}>display picture</Text>
        <Pressable
          style={styles.image_warp_view}
          onPress={() => {
            SelectNewDP();
          }}>
          <FastImage
            source={{
              uri: showImagePicked,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: windowHeight * 0.12,
              height: windowHeight * 0.12,
              borderRadius: windowHeight * 0.06,
              backgroundColor: '#05050510',
            }}
          />
        </Pressable>
      </View>
      <View style={styles.save_button_view_wrap}>
        <Button
          buttonStyle={styles.save_button_style}
          containerStyle={styles.save_button_container_style}
          titleStyle={styles.save_button_title_style}
          title="save changes"
          onPress={() => SaveChanges()}
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(EditProfile);

const styles = StyleSheet.create({
  image_warp_view: {
    //alignContent: 'center',
    width: windowWidth - 40,
    marginVertical: 40,
    alignItems: 'center',
  },
  header_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    alignSelf: 'center',
    marginVertical: 20,
  },
  save_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#fafafa',
  },
  save_button_style: {
    height: 50,
    width: 140,
    borderRadius: 25,
    backgroundColor: '#36b37e',
  },
  save_button_container_style: {},
  item_title_text: {
    fontFamily: 'GothamRounded-Book',
    color: '#050505',
    fontSize: 15,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },

  username_input: {
    backgroundColor: '#f0f0f0',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#050505',
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    borderRadius: 10,
  },
  dp_edit_view_wrap: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 80,
    height: windowHeight * 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  save_button_view_wrap: {
    marginHorizontal: 20,
    marginVertical: windowHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
