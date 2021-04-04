import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ShowMessage(props) {
  if (props.Message.userMetadata.type === 'd') {
    return <Text style={styles.text2}>{props.Message.message}</Text>;
  } else if (props.Message.userMetadata.type === 'b') {
    return (
      <View>
        <FastImage
          source={{uri: props.Message.file.url}}
          style={styles.b_type_image}>
          <Text>{props.Message.message.test}</Text>
          <Text>{props.Message.file.name}</Text>
        </FastImage>
      </View>
    );
  } else {
    return <Text style={styles.text}>{props.Message.message}</Text>;
  }
}

export default ShowMessage;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'GothamRounded-Book',
  },
  text2: {
    fontFamily: 'GothamRounded-Book',
    color: 'purple',
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
});
