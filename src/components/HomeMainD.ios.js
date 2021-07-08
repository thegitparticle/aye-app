/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Linking,
  Pressable,
} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import HeaderAtHome from '../components/HeaderAtHome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view-tgp';
import ClubsHomeD from './ClubsHome';
import DirectsHomeD from './DirectsHome';
import IconlyDirectIcon from '../uibits/IconlyDirectIcon';
import IconlyHomeClubsIcon from '../uibits/IconlyHomeClubsIcon';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import Contacts from 'react-native-contacts';
import ThemeContext from '../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';
// import {showMessage, hideMessage} from 'react-native-flash-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function HomeMainD({dispatch, navigation}) {
  const theme = useContext(ThemeContext);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'clubs', title: 'clubs', icon: 'home'},
    {key: 'directs', title: 'directs', icon: 'send'},
  ]);

  const [giveContactsVisible, setGiveContactsVisible] = useState(false);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const [updateBannerVisible, setUpdateBannerVisible] = useState(false);
  const current_app_version = '1.0.2';

  useEffect(() => {
    var res_here = [];
    requestUserPermission();
    axios
      .get('https://apisayepirates.life/api/clubs/app_version_apple/')
      .then(response => (res_here = response.data))
      .then(response =>
        setUpdateBannerVisible(!(current_app_version === res_here[0].version)),
      )
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    Contacts.checkPermission().then(permission => {
      if (permission === 'undefined') {
        console.log('undefined permissions');
      }
      if (permission === 'authorized') {
        console.log('all cool, have the permissions');
      }
      if (permission === 'denied') {
        setGiveContactsVisible(true);
      }
    });
  }, []);

  const renderScene = SceneMap({
    clubs: ClubsHomeD,
    directs: DirectsHomeD,
  });

  function renderIconHere({route, focused}) {
    if (route.title === 'clubs') {
      if (focused) {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyHomeClubsIcon Color="black" />
          </View>
        );
      } else {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyHomeClubsIcon Color="grey" />
          </View>
        );
      }
    } else {
      if (focused) {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyDirectIcon Color="black" />
          </View>
        );
      } else {
        return (
          <View style={styles.tab_icon_view}>
            <IconlyDirectIcon Color="grey" />
          </View>
        );
      }
    }
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tab_bar_indicator}
      style={styles.tab_bar}
      renderIcon={renderIconHere}
      // eslint-disable-next-line react-native/no-inline-styles
      tabStyle={{backgroundColor: 'transparent'}}
    />
  );

  return (
    <View style={styles.overall_view}>
      <HeaderAtHome />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        tabBarPosition="bottom"
        // eslint-disable-next-line react-native/no-inline-styles
        sceneContainerStyle={{
          overflow: 'visible',
          backgroundColor: '#fff',
        }}
        style={styles.tab_view}
      />
      <Overlay isVisible={giveContactsVisible} fullScreen>
        <View style={styles.contacts_banner_view}>
          <View style={styles.contacts_banner_text_wrap}>
            <Text
              style={{
                ...theme.text.title_2,
                color: theme.colors.full_dark,
                marginVertical: 20,
                maxWidth: windowWidth * 0.9,
                textAlign: 'center',
              }}>
              Aye needs access to your contacts to connect you with your friends
              seemlessly.
            </Text>
            <Text
              style={{
                ...theme.text.subhead,
                color: theme.colors.mid_dark,
                marginVertical: 20,
                maxWidth: windowWidth * 0.9,
                textAlign: 'center',
              }}>
              Allow contacts to be accessed by us in a secure way and connect
              with your best friends on Aye.
            </Text>
          </View>
          <Pressable
            style={{
              marginVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              Linking.openSettings();
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
                fillColor: theme.colors.success_green,
              }}>
              <Text
                style={{...theme.text.title_3, color: theme.colors.full_light}}>
                Go to settings
              </Text>
            </SquircleView>
          </Pressable>
        </View>
      </Overlay>
      <Overlay isVisible={updateBannerVisible} fullScreen>
        <View style={styles.update_banner_view}>
          <Text style={styles.update_banner_text_main}>
            We are improving Aye!
          </Text>
          <Text style={styles.update_banner_text_update_line}>
            Please update the app for a better experience
          </Text>
          <Button
            buttonStyle={styles.update_button}
            containerStyle={styles.update_button_container}
            titleStyle={styles.update_button_title}
            title="Update"
            onPress={() => Linking.openURL('https://bit.ly/aye_app_store')}
          />
        </View>
      </Overlay>
    </View>
  );
}

export default HomeMainD;

const styles = StyleSheet.create({
  overall_view: {
    flex: 1,
    backgroundColor: '#fff',
  },

  update_banner_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  update_banner_text_main: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
    color: '#050505',
    marginVertical: 20,
  },
  update_banner_text_update_line: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#05050575',
    marginVertical: 20,
  },

  update_button_title: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#FFFFFF',
  },
  update_button_container: {
    alignSelf: 'center',
    marginVertical: 20,
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
  update_button: {
    height: 60,
    width: 160,
    borderRadius: 30,
    backgroundColor: '#36b37e',
  },

  tab_view: {
    //flex: 1,
    backgroundColor: 'transparent',
    //overflow: 'visible',
  },
  tab_bar: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    color: '#000',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 160,
    marginBottom: windowHeight * 0.05,
    borderRadius: 30,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  tab_bar_indicator: {
    width: 0,
  },
  tab_icon_view: {
    alignItems: 'center',
    alignContent: 'center',
    height: 60,
    paddingTop: 2.5,
  },
  tab_icon: {},

  contacts_banner_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contacts_banner_text_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});