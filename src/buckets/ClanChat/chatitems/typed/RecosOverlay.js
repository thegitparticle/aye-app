/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo} from 'react';
import {ScrollView, Dimensions, View} from 'react-native';
import EachRecoItem from './EachRecoItem';
import axios from 'axios';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function RecosOverlay(props) {
  const [rec, setRec] = useState(['', '', '', '']);

  var res = [];

  useEffect(() => {
    // console.log(props.TypeValue + ' ' + 'TYPE VALUE reco in typed clan');
    var full_sentence = props.TypeValue;

    var s_word = props.SelectedValue;

    const empty_recos = [
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_yes.jpeg',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_say_no.jpeg',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_ok.gif',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_fuck_off.gif',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_how_ya_doin.gif',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_nope.gif',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_yes.gif',
      'https://aye-media-bucket.s3.us-west-2.amazonaws.com/default_chat_images/default_lol.gif',
    ];

    if (full_sentence.length > 0) {
      if (s_word.length > 2) {
        axios
          .get(
            'https://apisayepirates.life/api/users/recommend_images/' +
              String(props.UserID) +
              '/' +
              s_word +
              '/' +
              'False',
          )
          .then(response => (res = response.data))
          .then(() => setRec(_.concat(res[0], res[1])))
          .catch(err => {
            console.log(err + 'reco error');
          });
      } else {
        axios
          .get(
            'https://apisayepirates.life/api/users/recommend_images/' +
              String(props.UserID) +
              '/' +
              props.TypeValue +
              '/' +
              'True',
          )
          .then(response => (res = response.data))
          .then(() => setRec(_.concat(res[0], res[1])))
          .catch(err => {
            console.log(err + 'reco error');
          });
      }
    } else {
      setRec(empty_recos);
    }
  }, [props.TypeValue, props.SelectedValue]);

  function HandleSettingChosenMedia(link) {
    props.SetChosenMedia(link);
  }

  return (
    <View
      keyboardShouldPersistTaps="always"
      style={{
        height: windowHeight * 0.1,
        width: windowWidth,
        backgroundColor: 'transparent',
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{
          height: windowHeight * 0.1,
          width: windowWidth,
          backgroundColor: 'transparent',
          borderRadius: 0,
        }}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {rec.map((item, index) => (
          <EachRecoItem Item={item} SetChosenMedia={HandleSettingChosenMedia} />
        ))}
      </ScrollView>
    </View>
  );
}

export default RecosOverlay;
