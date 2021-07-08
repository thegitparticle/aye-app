/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import {GetDirectsList} from '../redux/DirectsListActions';
import {showMessage} from 'react-native-flash-message';
import ThemeContext from '../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';
import Iconly from '../pnstuff/Iconly';

var state_here = {};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function TheAyeScreen({navigation, dispatch}) {
  var current_user_id = state_here.MyProfileReducer.myprofile.user.id;
  const theme = useContext(ThemeContext);

  function StartDirectConvoWithFounder() {
    const randomValue = Math.random();

    var chosenValue = randomValue < 0.5 ? 82 : 81;
    var chosenName = randomValue < 0.5 ? 'Sanjit' : 'Aditya';

    const id_here_making =
      String(current_user_id) + '_' + String(chosenValue) + '_d';

    var res = [];
    axios

      .get(
        'https://apisayepirates.life/api/users/start_chat/' +
          String(current_user_id) +
          '/' +
          String(chosenValue) +
          '/' +
          id_here_making +
          '/',
      )
      .then(() => navigation.goBack())
      .then(() => dispatch(GetDirectsList(current_user_id)))
      .then(() =>
        showMessage({
          message: `Go to Direct chats list, message ${chosenName}`,
          type: 'info',
          //backgroundColor: 'mediumseagreen',
          backgroundColor: '#7d4df9',
        }),
      )
      .catch(err => {
        console.log(err);
      });
  }

  function RenderThingsList() {
    return (
      <View style={styles.things_list_view_wrap}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}
          onPress={() => StartDirectConvoWithFounder()}>
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
              fillColor: theme.colors.mid_light,
            }}>
            <Text style={{...theme.text.title_3, color: theme.colors.mid_dark}}>
              talk to founder
            </Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.containerview}>
      <ImageBackground
        source={require('/Users/san/Desktop/toastgo/assets/space_background.jpeg')}
        style={styles.bg_image}>
        <View style={styles.header_logo_view}>
          <Header
            rightComponent={
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.goBack()}>
                <Iconly
                  name="ChevronDownBroken"
                  color={theme.colors.full_light}
                  size={30}
                />
              </TouchableOpacity>
            }
            backgroundColor="#fafafa00"
            containerStyle={styles.header_container_style}
          />
          <Image
            source={require('/Users/san/Desktop/toastgo/assets/logo_ypop_2.png')}
            style={styles.logo_style}
          />
        </View>
        <View>
          <RenderThingsList />
        </View>
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = state => {
  state_here = state;
  return state_here;
};

export default connect(mapStateToProps)(TheAyeScreen);

const styles = StyleSheet.create({
  containerview: {
    backgroundColor: '#fafafa',
    flex: 1,
    justifyContent: 'space-between',
  },
  bg_image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_logo_view: {
    alignItems: 'center',
  },
  header_container_style: {
    borderBottomWidth: 0,
  },
  logo_style: {
    width: windowWidth * 0.4 * 1.37,
    height: windowWidth * 0.4,
    marginVertical: windowHeight * 0.05,
  },
  things_list_view_wrap: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    marginVertical: windowHeight * 0.05,
  },
  things_list_item_view: {
    width: windowWidth * 0.9,
    height: 50,
    backgroundColor: '#FFFFFF90',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowHeight * 0.01,
  },
  things_list_item_view_talk_founder: {
    width: windowWidth * 0.9,
    height: 50,
    backgroundColor: '#7d4df995',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowHeight * 0.01,
  },
  things_item_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
  },
  things_item_text_talk_founder: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: '#FFFFFF',
  },
});
