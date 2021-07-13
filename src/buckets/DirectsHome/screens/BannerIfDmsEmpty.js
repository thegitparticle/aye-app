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
import {useNavigation} from '@react-navigation/native';
import ThemeContext from '../../../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function BannerIfDmsEmpty() {
  const theme = useContext(ThemeContext);
  var NudgeToData = state_here.MyNudgeToListReducer.mynudgetolist;
  const navigation = useNavigation();

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
          onPress={() => navigation.navigate('InvitePeopleToApp')}
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
