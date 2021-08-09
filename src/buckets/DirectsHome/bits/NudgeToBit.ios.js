/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import axios from 'axios';
import {GetDirectsList} from '../../../redux/DirectsListActions';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {GetMyNudgeToList} from '../../../redux/MyNudgeToListActions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import ThemeContext from '../../../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

// const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function NudgeToBit(props) {
  const theme = useContext(ThemeContext);
  var current_user_id = state_here.MyProfileReducer.myprofile.user.id;

  const id_here_making =
    String(current_user_id) + '_' + String(props.NudgeTo.id) + '_d';

  const dispatch = useDispatch();
  function StartDirectConvo() {
    var res = [];
    showMessage({
      message: 'Starting a conversation 3..2..1.. hooray!',
      type: 'info',
      backgroundColor: 'mediumseagreen',
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

  return (
    <View style={styles.overall_view}>
      <View style={styles.left_side_things}>
        <FastImage
          source={{uri: props.NudgeTo.profile_pic}}
          style={styles.avatar_of_user}
          size={68}
        />
        <View style={styles.text_block_view}>
          <Text
            style={{
              ...theme.text.subhead_medium,
            }}>
            {props.NudgeTo.name}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => StartDirectConvo()}>
        <SquircleView
          style={{
            height: 30,
            width: windowWidth * 0.2,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          squircleParams={{
            cornerSmoothing: 1,
            cornerRadius: 10,
            fillColor: theme.colors.friends_prime,
          }}>
          <Text
            style={{
              ...theme.text.smallest,
              color: theme.colors.full_light,
            }}>
            START
          </Text>
        </SquircleView>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(NudgeToBit);

const styles = StyleSheet.create({
  left_side_things: {
    flexDirection: 'row',
  },
  subtitle_view: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
