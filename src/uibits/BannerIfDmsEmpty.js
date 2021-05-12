import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
//import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function BannerIfDmsEmpty() {
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;

  if (NudgeToData.length > 0) {
    if (NudgeToData[0].userid === 0) {
      return (
        <ImageBackground
          style={styles.banner_view}
          imageStyle={{borderRadius: 20}}
          source={require('/Users/san/Desktop/toastgo/assets/direct_banner_1.gif')}>
          <Button
            clear
            buttonStyle={styles.start_club_button_style}
            containerStyle={styles.start_club_button_container_style}
            titleStyle={styles.start_club_button_title_style}
            title="start club to invite your friends onto Aye"
          />
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          style={styles.banner_view}
          imageStyle={{borderRadius: 20}}
          source={require('/Users/san/Desktop/toastgo/assets/direct_banner_1.gif')}>
          <Button
            clear
            buttonStyle={styles.start_club_button_style}
            containerStyle={styles.start_club_button_container_style}
            titleStyle={styles.start_club_button_title_style}
            title="start talking to your friends below"
          />
        </ImageBackground>
      );
    }
  } else {
    return (
      <ImageBackground
        style={styles.banner_view}
        imageStyle={{borderRadius: 20}}
        source={require('/Users/san/Desktop/toastgo/assets/direct_banner_1.gif')}>
        <Button
          clear
          buttonStyle={styles.start_club_button_style}
          containerStyle={styles.start_club_button_container_style}
          titleStyle={styles.start_club_button_title_style}
          title="start club to invite your friends onto Aye"
        />
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(BannerIfDmsEmpty);

const styles = StyleSheet.create({
  banner_view: {
    //backgroundColor: '#008DFF',
    marginVertical: windowHeight * 0.1,
    width: windowWidth * 0.95,
    height: windowWidth * 0.7,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',

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
    fontSize: 17,
    color: '#FFFFFF',
  },
  start_club_button_container_style: {
    alignSelf: 'center',
    marginBottom: windowWidth * 0.125,
    backgroundColor: 'transparent',
  },
  start_club_button_style: {
    //height: 60,
    //width: 160,
    //borderRadius: 30,
    backgroundColor: 'transparent',
  },
});
