/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useContext} from 'react';
import {View, Dimensions, StyleSheet, Pressable, Text} from 'react-native';
import {Header, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import ThemeContext from '../../../themes/Theme';
import PushSetup from '../../../external/PushSetup';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

var state_here = {};

function HeaderAtHome({dispatch}) {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const HeaderLeft = useMemo(
    () =>
      function HeaderLeftX() {
        return (
          <Pressable
            style={styles.header_left_view_wrap}
            onPress={() => navigation.navigate('TheAyeStackScreens')}>
            <View style={styles.header_left_image_wrap}>
              <FastImage
                style={styles.header_left_image}
                source={require('/Users/san/Desktop/toastgo/assets/logo_ypop_2.png')}
              />
            </View>
          </Pressable>
        );
      },
    [],
  );

  const HeaderRight = useMemo(
    () =>
      function HeaderRightX() {
        return (
          <Pressable
            onPress={() => navigation.navigate('MyProfileModalScreens')}
            style={styles.header_right_view_wrap}>
            <Avatar
              rounded
              containerStyle={styles.header_right_image}
              size={45}
              source={{
                uri: state_here.MyProfileReducer.myprofile.image,
              }}
            />
          </Pressable>
        );
      },
    [],
  );

  function HeaderMiddle() {
    return <View />;
  }

  function HeaderView() {
    return (
      <SquircleView
        style={{
          width: windowWidth,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#00000025',
          shadowOffset: {
            width: 0,
            height: 75,
          },
          shadowOpacity: 0.36,
          shadowRadius: 16.68,
          elevation: 11,
        }}
        squircleParams={{
          cornerSmoothing: 0.7,
          cornerRadius: 30,
          fillColor: '#F8F8F8',
        }}>
        <View
          style={{
            width: windowWidth * 0.9,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: '100%',
          }}>
          <HeaderLeft />
          <HeaderMiddle />
          <HeaderRight />
        </View>
      </SquircleView>
    );
  }
  // }

  return (
    <View style={styles.header_container}>
      {/* <Header
        // elevated={true}
        backgroundColor={theme.colors.full_light}
        containerStyle={styles.header_container}
        barStyle="dark-content">
        <HeaderLeft />
        <HeaderMiddle />
        <HeaderRight />
      </Header> */}
      <Header ViewComponent={HeaderView} barStyle="dark-content" />
      <PushSetup />
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(HeaderAtHome);

const styles = StyleSheet.create({
  header_container: {
    borderBottomWidth: 0,
    borderBottomColor: '#06090e10',
    backgroundColor: 'transparent',
    height: windowHeight * 0.125,
  },
  header_left_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  header_right_view_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: 'indianred',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  header_left_image: {
    width: 40 * 1.37,
    height: 40,
    marginHorizontal: 10,
    borderRadius: 0,
  },
  header_right_image: {
    marginHorizontal: 10,
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
});
