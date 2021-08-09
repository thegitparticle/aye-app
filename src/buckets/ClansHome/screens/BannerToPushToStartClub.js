/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import ThemeContext from '../../../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function BannerToPushToStartClub() {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  if (state_here.MyClubsReducer.myclubs.length === 0) {
    return (
      <View style={styles.empty_banner_view}>
        <LottieView
          source={require('/Users/san/Desktop/toastgo/assets/dancing_blob.json')}
          autoPlay
          loop
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: windowHeight * 0.025,
          }}
        />
        <Text
          style={{
            ...theme.text.title_3,
            color: theme.colors.mid_dark,
            maxWidth: windowWidth * 0.9,
            textAlign: 'center',
            marginVertical: windowHeight * 0.025,
          }}>
          Aye is the most fun way to talk with your bestie groups!!!
        </Text>

        <TouchableOpacity
          style={{
            marginVertical: windowHeight * 0.025,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('StartClub')}>
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
              fillColor: theme.colors.success_green,
            }}>
            <Text
              style={{...theme.text.title_3, color: theme.colors.full_light}}>
              start clan
            </Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
    );
  } else if (state_here.MyClubsReducer.myclubs.length <= 3) {
    if (windowHeight > 770) {
      return (
        <TouchableOpacity
          style={{
            marginVertical: windowHeight * 0.05,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('StartClub')}>
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
              fillColor: theme.colors.success_green,
            }}>
            <Text
              style={{...theme.text.title_3, color: theme.colors.full_light}}>
              start clan
            </Text>
          </SquircleView>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            marginTop: windowHeight * 0.05,
            marginBottom: windowHeight * 0.15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.success_green,
            width: windowWidth * 0.4,
            height: windowWidth * 0.15,
            borderRadius: windowHeight * 0.1,
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('StartClub')}>
          <Text style={{...theme.text.title_3, color: theme.colors.full_light}}>
            start clan
          </Text>
        </TouchableOpacity>
      );
    }
  } else {
    if (windowHeight > 770) {
      return (
        <TouchableOpacity
          style={{
            marginTop: windowHeight * 0.05,
            marginBottom: windowHeight * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('StartClub')}>
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
              fillColor: theme.colors.success_green,
            }}>
            <Text
              style={{...theme.text.title_3, color: theme.colors.full_light}}>
              start clan
            </Text>
          </SquircleView>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            marginTop: windowHeight * 0.05,
            marginBottom: windowHeight * 0.15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.success_green,
            width: windowWidth * 0.4,
            height: windowWidth * 0.15,
            borderRadius: windowHeight * 0.1,
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('StartClub')}>
          <Text style={{...theme.text.title_3, color: theme.colors.full_light}}>
            start clan
          </Text>
        </TouchableOpacity>
      );
    }
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(BannerToPushToStartClub);

const styles = StyleSheet.create({
  empty_banner_view: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: windowHeight * 0.7,
  },
  banner_view: {
    backgroundColor: '#36b37e',
    marginVertical: windowHeight * 0.1,
    width: windowWidth * 0.95,
    height: windowWidth * 0.7,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    fontSize: 17,
    color: '#36b37e',
  },
  start_club_button_container_style: {
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  start_club_button_style: {
    height: 50,
    width: 150,
    borderRadius: 30,
    backgroundColor: '#FFF',
    //backgroundColor: 'transparent',
  },

  start_club_button_title_style_more: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#FFFFFF',
  },
  start_club_button_container_style_more: {
    alignSelf: 'center',
    marginVertical: windowHeight * 0.1,
    backgroundColor: 'transparent',
    shadowColor: '#36b37e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 2,
  },
  start_club_button_style_more: {
    height: 60,
    width: 160,
    borderRadius: 30,
    backgroundColor: '#36b37e',
  },
});
