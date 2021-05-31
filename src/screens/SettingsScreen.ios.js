import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  SafeAreaView,
  Pressable,
  Linking,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {LOGOUT} from '../redux/types';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function SettingsScreen({navigation, dispatch}) {
  function SettingItem(props) {
    return (
      <View style={styles.SettingItemViewWrap}>
        <Text style={styles.SettingItemText}>{props.SettingName}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={true ? '#074ee8' : '#fff'}
          ios_backgroundColor="#3e3e3e"
          //onValueChange={toggleSwitch}
          value={props.value}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>settings</Text>
      <Divider style={styles.log_out_divider} />

      <View style={styles.things_list_view_wrap}>
        <Pressable
          style={styles.things_list_item_view}
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/ayespaces/Privacy-Policy-b2f432d16d88458281babd62457df2b4',
            )
          }>
          <Text style={styles.things_item_text}>Privacy Policy</Text>
        </Pressable>
        <Pressable
          style={styles.things_list_item_view}
          onPress={() =>
            Linking.openURL(
              'https://www.notion.so/ayespaces/Terms-of-Service-93d01782de4042708a5c10decaa1484c',
            )
          }>
          <Text style={styles.things_item_text}>T & C</Text>
        </Pressable>
        <View style={styles.log_out_button_view_wrap}>
          <Button
            raised
            type="clear"
            //        containerStyle={styles.log_out_button_container_style}
            titleStyle={styles.log_out_button_title_style}
            title="log out"
            onPress={() => {
              dispatch({type: LOGOUT});
              AsyncStorage.clear();
            }}
          />
        </View>
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
  log_out_button_view_wrap: {
    marginHorizontal: 20,
    marginVertical: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  log_out_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#EC193E',
  },

  log_out_button_container_style: {},
  log_out_divider: {
    height: 1,
    alignSelf: 'center',
    width: windowWidth * 0.8,
    backgroundColor: '#e1e8ee',
  },

  things_list_view_wrap: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.05,
  },
  things_list_item_view: {
    width: windowWidth * 0.9,
    height: 50,
    backgroundColor: '#11111110',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowHeight * 0.01,
  },
  things_item_text: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 21,
  },
});
