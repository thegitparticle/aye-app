import React from 'react';
import {View, Text, Dimensions, StyleSheet, Pressable} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};
function HeaderAtHome({navigation, dispatch}) {
  function HeaderLeft() {
    return (
      <View style={styles.header_left_view_wrap}>
        <View style={styles.header_left_image_wrap}>
          <FastImage
            style={styles.header_left_image}
            source={require('/Users/san/Desktop/toastgo/assets/logo_ypop_2.png')}
          />
        </View>
      </View>
    );
  }

  function HeaderRight() {
    return (
      <View style={styles.header_right_view_wrap}>
        <Pressable onPress={() => navigation.navigate('MyModalMyProfile')}>
          <FastImage
            style={styles.header_right_image}
            source={{
              uri:
                'https://apisayepirates.life' +
                state_here.MyProfileReducer.myprofile.image,
              priority: FastImage.priority.normal,
            }}
          />
        </Pressable>
      </View>
    );
  }

  function HeaderMiddle() {
    return <View />;
  }

  return (
    <Header
      backgroundColor="#Fafafa"
      containerStyle={styles.header_container}
      barStyle="dark-content">
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight />
    </Header>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HeaderAtHome);

const styles = StyleSheet.create({
  header_left_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_right_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_left_image: {
    width: 40 * 1.37,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 0,
  },
  header_right_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  header_container: {
    borderBottomWidth: 0,
    borderBottomColor: '#06090e10',
    height: windowHeight * 0.125,
  },
  header_title_this_page: {
    fontSize: 25,
    fontFamily: 'GothamRounded-Medium',
    marginHorizontal: 10,
  },
  header_title_this_page_view: {
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
    height: windowHeight * 0.06,
  },

  header_left_image_wrap: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header_right_view_wrap: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
