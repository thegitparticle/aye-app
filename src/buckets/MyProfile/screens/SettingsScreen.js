/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  SafeAreaView,
  Pressable,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {LOGOUT} from '../../../redux/types';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../../../themes/Theme';
import {SquircleView} from 'react-native-figma-squircle';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function SettingsScreen({navigation, dispatch}) {
  const theme = useContext(ThemeContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>settings</Text>
      <Divider style={styles.log_out_divider} />

      <View style={styles.things_list_view_wrap}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/ayespaces/Privacy-Policy-b2f432d16d88458281babd62457df2b4',
              )
            }>
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
              <Text
                style={{...theme.text.title_3, color: theme.colors.mid_dark}}>
                privacy policy
              </Text>
            </SquircleView>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}
            onPress={() =>
              Linking.openURL(
                'https://www.notion.so/ayespaces/Terms-of-Service-93d01782de4042708a5c10decaa1484c',
              )
            }>
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
              <Text
                style={{...theme.text.title_3, color: theme.colors.mid_dark}}>
                T & C
              </Text>
            </SquircleView>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: windowHeight * 0.015,
          }}
          onPress={() => {
            dispatch({type: LOGOUT});
            AsyncStorage.clear();
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
              fillColor: theme.colors.danger_red,
            }}>
            <Text
              style={{...theme.text.title_3, color: theme.colors.full_light}}>
              log out
            </Text>
          </SquircleView>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOutClick: () => {
      dispatch({type: LOGOUT});
    },
  };
};

export default connect(mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  header_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    alignSelf: 'center',
    marginVertical: 20,
  },

  log_out_divider: {
    height: 1,
    alignSelf: 'center',
    width: windowWidth * 0.8,
    backgroundColor: '#e1e8ee',
  },

  things_list_view_wrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
