import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {usePubNub} from 'pubnub-react';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function NudgeToBit(props) {
  const pubnub = usePubNub();
  var current_user_id = state_here.MyProfileReducer.myprofile.user.id;
  //console.log(typeof [String(current_user_id), String(props.NudgeTo.userid)]);

  function StartDirectConvo() {
    pubnub.objects.setMemberships(
      {
        uuid: String(props.NudgeTo.userid),

        channels: [
          {
            id:
              String(current_user_id) +
              '_' +
              String(props.NudgeTo.userid) +
              '_d',
            custom: {
              type: 'direct',

              other_user_name:
                state_here.MyProfileReducer.myprofile.user.full_name,
              other_user_image: state_here.MyProfileReducer.myprofile.image,
              other_user_id: state_here.MyProfileReducer.myprofile.user.id,
            },
          },
        ],
      },
      (status, response) => {
        console.log(status);
      },
    );

    pubnub.objects.setMemberships(
      {
        uuid: String(current_user_id),
        channels: [
          {
            id:
              String(current_user_id) +
              '_' +
              String(props.NudgeTo.userid) +
              '_d',
            custom: {
              type: 'direct',

              other_user_name: props.NudgeTo.name,
              other_user_image: props.NudgeTo.avatar,
              other_user_id: props.NudgeTo.id,
            },
          },
        ],
      },
      (status, response) => {
        console.log(status);
      },
    );

    /*
    pubnub.objects.removeChannelMembers({
      channel:
        String(current_user_id) + '_' + String(props.NudgeTo.userid) + '_d',
      uuids: [String(current_user_id), String(props.NudgeTo.userid)],
    });
*/
    console.log('do the axios call to trigger start of direct convo to server');
  }

  return (
    <View style={styles.overall_view}>
      <View style={styles.left_side_things}>
        <FastImage
          source={{uri: props.NudgeTo.avatar}}
          style={styles.avatar_of_user}
          size={68}
        />
        <View style={styles.text_block_view}>
          <Text style={styles.user_name}>{props.NudgeTo.name}</Text>
        </View>
      </View>

      <Button
        raised
        title="START"
        type="solid"
        containerStyle={styles.AddButtonContainer}
        titleStyle={styles.AddButtonTitle}
        buttonStyle={styles.AddButton}
        onPress={() => StartDirectConvo()}
      />
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
