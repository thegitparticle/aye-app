/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import EachRecoItem from './EachRecoItem';
import axios from 'axios';
import _ from 'lodash';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function RecosOverlay(props) {
  const [rec, setRec] = useState(['loading', 'loading', 'loading', 'loading']);

  var res = [];

  useEffect(() => {
    axios
      .get(
        'https://apisayepirates.life/api/users/recommend_images/' +
          String(props.UserID) +
          '/' +
          props.TypeValue,
      )
      .then(response => (res = response.data))
      .then(() => setRec(_.concat(res[0], res[1])))
      .catch(err => {
        console.log(err);
      });
  }, [props.TypeValue]);

  function HandleSettingChosenMedia(link) {
    props.SetChosenMedia(link);
  }

  function HandleSettingChosenMediaEmpty() {
    props.SetChosenMediaEmpty();
  }

  return (
    <ScrollView
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
        <EachRecoItem
          Item={item}
          SetChosenMediaEmpty={HandleSettingChosenMediaEmpty}
          SetChosenMedia={HandleSettingChosenMedia}
        />
      ))}
    </ScrollView>
  );
}

export default RecosOverlay;
