import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
  SafeAreaView,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {LOGOUT} from '../redux/types';
import {connect} from 'react-redux';

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
      <View style={styles.log_out_button_view_wrap}>
        <Button
          raised
          type="clear"
          //        containerStyle={styles.log_out_button_container_style}
          titleStyle={styles.log_out_button_title_style}
          title="log out"
          onPress={() => dispatch({type: LOGOUT})}
        />
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
    flexDirection: 'row',
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
});
