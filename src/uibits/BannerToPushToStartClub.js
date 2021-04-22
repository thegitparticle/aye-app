import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function BannerToPushToStartClub() {
  const navigation = useNavigation();

  if (state_here.MyClubsReducer.myclubs.length <= 3) {
    return (
      <View style={styles.banner_view}>
        <FastImage
          style={styles.banner_image}
          source={require('/Users/san/Desktop/toastgo/assets/dog_3d.png')}
        />
        <Button
          buttonStyle={styles.start_club_button_style}
          containerStyle={styles.start_club_button_container_style}
          titleStyle={styles.start_club_button_title_style}
          title="start club"
          onPress={() => navigation.navigate('StartClub')}
        />
      </View>
    );
  } else {
    return (
      <Button
        buttonStyle={styles.start_club_button_style_more}
        containerStyle={styles.start_club_button_container_style_more}
        titleStyle={styles.start_club_button_title_style_more}
        title="start club"
        onPress={() => navigation.navigate('StartClub')}
      />
    );
  }
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(BannerToPushToStartClub);

const styles = StyleSheet.create({
  banner_view: {
    backgroundColor: '#36b37e',
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
    fontSize: 17,
    color: '#36b37e',
  },
  start_club_button_container_style: {
    alignSelf: 'center',

    backgroundColor: 'transparent',
  },
  start_club_button_style: {
    height: 60,
    width: 160,
    borderRadius: 30,
    backgroundColor: '#FFF',
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
