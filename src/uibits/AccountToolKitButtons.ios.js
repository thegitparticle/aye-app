import React from 'react';
import {Pressable, View, Image, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function AccountToolKitButtons() {
  const navigation = useNavigation();

  return (
    <View style={styles.third_block_view}>
      <Pressable
        style={styles.edit_icon_view_wrap}
        onPress={() => navigation.navigate('Network')}>
        <Image
          source={require('/Users/san/Desktop/toastgo/assets/edit_icon.png')}
          style={styles.edit_icon}
        />
      </Pressable>
      <Pressable
        style={styles.settings_icon_view_wrap}
        onPress={() => navigation.navigate('SettingsScreen')}>
        <Image
          source={require('/Users/san/Desktop/toastgo/assets/settings_icon.png')}
          style={styles.settings_icon}
        />
      </Pressable>
    </View>
  );
}

export default AccountToolKitButtons;

const styles = StyleSheet.create({
  third_block_view: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.05,
    marginHorizontal: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  edit_icon_view_wrap: {
    backgroundColor: '#e2e9f3',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  settings_icon_view_wrap: {
    backgroundColor: '#e2e9f3',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  edit_icon: {
    width: 25,
    height: 25,
  },
  settings_icon: {
    width: 24.5,
    height: 25,
  },
});
