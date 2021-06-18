/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import ThemeContext from '../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function BannerIfDmsEmpty() {
  const theme = useContext(ThemeContext);
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;

  if (NudgeToData.length > 0) {
    if (NudgeToData[0].userid === 0) {
      return (
        <View
          style={{
            marginVertical: windowHeight * 0.05,
            height: windowHeight * 0.3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...theme.text.header,
              color: theme.colors.mid_dark,
              maxWidth: windowWidth * 0.9,
              textAlign: 'center',
              marginVertical: windowHeight * 0.015,
            }}>
            Tap START below to talk with your friends!!!
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            marginVertical: windowHeight * 0.05,
            height: windowHeight * 0.3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...theme.text.header,
              color: theme.colors.mid_dark,
              maxWidth: windowWidth * 0.9,
              textAlign: 'center',
              marginVertical: windowHeight * 0.015,
            }}>
            Tap START below to talk with your friends!!!
          </Text>
        </View>
      );
    }
  } else {
    return (
      <View
        style={{
          marginVertical: windowHeight * 0.05,
          height: windowHeight * 0.6,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...theme.text.title_3,
            color: theme.colors.mid_dark,
            maxWidth: windowWidth * 0.9,
            textAlign: 'center',
            marginVertical: windowHeight * 0.015,
          }}>
          No direct messages.
        </Text>
        <Text
          style={{
            ...theme.text.header,
            color: theme.colors.mid_dark,
            opacity: 0.5,
            maxWidth: windowWidth * 0.9,
            textAlign: 'center',
            marginVertical: windowHeight * 0.015,
          }}>
          Invite friends onto Aye to start talking!!!
        </Text>
        <Pressable
          style={{
            marginVertical: windowHeight * 0.05,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SquircleView
            style={{
              width: windowWidth * 0.8,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 15,
              fillColor: theme.colors.friends_prime,
            }}>
            <Text
              style={{...theme.text.title_3, color: theme.colors.full_light}}>
              invite friends
            </Text>
          </SquircleView>
        </Pressable>
      </View>
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
