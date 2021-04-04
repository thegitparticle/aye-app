import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

function NudgeToBit(props) {
  return (
    <View style={styles.overall_view}>
      <FastImage
        source={{uri: props.NudgeTo.avatar}}
        style={styles.avatar_of_user}
        size={68}
      />
      <View style={styles.text_block_view}>
        <Text style={styles.user_name}>{props.NudgeTo.name}</Text>
      </View>
    </View>
  );
}

export default NudgeToBit;

const styles = StyleSheet.create({
  subtitle_view: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle_icon: {},
  subtitle_text: {
    marginLeft: 5,
    //color: Platform.OS === 'ios' ? '#2dbbff' : 'rgb(109, 187, 253)',
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
    //marginHorizontal: 20,
    color: '#06090e',
  },
});
