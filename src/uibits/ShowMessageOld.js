import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//props.Message.meta.type
function ShowMessageOld(props) {
  if ('d' === 'd') {
    return <Text style={styles.text2}>{props.Message.message}</Text>;
  } else {
    return <Text style={styles.text}>{props.Message.message}</Text>;
  }
}

export default ShowMessageOld;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GothamRounded-Book',
  },
  text2: {
    fontFamily: 'GothamRounded-Book',
    color: 'purple',
  },
});
