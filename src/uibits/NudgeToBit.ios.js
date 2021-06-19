import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import axios from 'axios';
import {GetDirectsList} from '../redux/DirectsListActions';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {GetMyNudgeToList} from '../redux/MyNudgeToListActions';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function NudgeToBit(props) {
  var current_user_id = state_here.MyProfileReducer.myprofile.user.id;

  //https://apisayepirates.life/api/users/start_chat/<int:user_id_1>/<int:user_id_2>/<str:channel_id_string>/

  const navigation = useNavigation();

  const id_here_making =
    String(current_user_id) + '_' + String(props.NudgeTo.id) + '_d';

  const dispatch = useDispatch();
  function StartDirectConvo() {
    var res = [];
    showMessage({
      message: 'Starting a conversation 3..2..1.. hooray!',
      type: 'info',
      backgroundColor: 'mediumseagreen',
      //backgroundColor: 'indianred',
    });

    axios
      .get(
        'https://apisayepirates.life/api/users/start_chat/' +
          String(current_user_id) +
          '/' +
          String(props.NudgeTo.id) +
          '/' +
          id_here_making +
          '/',
      )
      .then(response => (res = response.data))
      .then(() => {
        ReactNativeHapticFeedback.trigger('impactHeavy', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        });
      })
      .then(() => {
        dispatch(GetDirectsList(current_user_id));
        dispatch(dispatch(GetMyNudgeToList(current_user_id)));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function ShowStartButton(props) {
    if (props.OnlyUserId === 0) {
      return <View />;
    } else {
      return (
        <Button
          raised
          title="START"
          type="solid"
          containerStyle={styles.AddButtonContainer}
          titleStyle={styles.AddButtonTitle}
          buttonStyle={styles.AddButton}
          onPress={() => StartDirectConvo()}
        />
      );
    }
  }

  return (
    <View style={styles.overall_view}>
      <Pressable
        style={styles.left_side_things}
        onPress={() =>
          navigation.navigate('OtherProfile', {
            other_user_id: props.NudgeTo.id,
          })
        }>
        <FastImage
          source={{uri: props.NudgeTo.profile_pic}}
          style={styles.avatar_of_user}
          size={68}
        />
        <View style={styles.text_block_view}>
          <Text style={styles.user_name}>{props.NudgeTo.name}</Text>
        </View>
      </Pressable>

      <ShowStartButton OnlyUserId={props.NudgeTo.id} />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(NudgeToBit);

const styles = StyleSheet.create({
  AddButton: {
    //backgroundColor: '#3f9ffe',
    backgroundColor: '#7D4DF9',
    borderRadius: windowHeight * 0.018,
    height: windowHeight * 0.036,
    width: windowWidth * 0.17,
  },
  AddButtonContainer: {
    borderRadius: windowHeight * 0.018,
    width: windowWidth * 0.17,
    height: windowHeight * 0.036,
    backgroundColor: 'transparent',
  },
  AddButtonTitle: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: Platform.OS === 'ios' ? 13 : 12,
    marginTop: Platform.OS === 'android' ? -3 : 0,
    paddingVertical: 0,
  },
  left_side_things: {
    flexDirection: 'row',
  },
  subtitle_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle_icon: {},
  subtitle_text: {
    marginLeft: 5,
    color: '#7D4DF9',
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
  },
  subtitle_text_not_new: {
    marginLeft: 5,
    color: '#06090e25',
    fontFamily: 'GothamRounded-Book',
    fontSize: 13,
  },
  avatar_of_user: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  overall_view: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    alignItems: 'center',
  },
  text_block_view: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  user_name: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
  },
  ongoing_frame_text: {
    fontFamily: 'GothamRounded-Book',

    fontSize: 13,
    color: '#06090e',
  },
});
