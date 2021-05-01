import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-elements';
//import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function BannerIfDmsEmpty() {
  return (
    <View style={styles.banner_view}>
      <Image
        style={styles.banner_image}
        source={require('/Users/san/Desktop/toastgo/assets/dog_3d.png')}
      />
      <Button
        clear
        buttonStyle={styles.start_club_button_style}
        containerStyle={styles.start_club_button_container_style}
        titleStyle={styles.start_club_button_title_style}
        title="start talking to your friends below"
      />
    </View>
  );
}

export default BannerIfDmsEmpty;

const styles = StyleSheet.create({
  banner_view: {
    backgroundColor: '#008DFF',
    marginVertical: windowHeight * 0.1,
    width: windowWidth * 0.95,
    height: windowWidth * 0.7,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#36b37e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 2,
  },
  banner_image: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },
  start_club_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#FFFFFF',
  },
  start_club_button_container_style: {
    alignSelf: 'center',

    backgroundColor: 'transparent',
  },
  start_club_button_style: {
    //height: 60,
    //width: 160,
    //borderRadius: 30,
    backgroundColor: 'transparent',
  },
});
