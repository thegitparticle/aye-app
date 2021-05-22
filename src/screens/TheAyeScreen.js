import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  Linking,
  Pressable,
} from 'react-native';
import {Header} from 'react-native-elements';
import BackChevronDownIcon from '../uibits/BackChevronDownIcon';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function TheAyeScreen() {
  function RenderThingsList() {
    return (
      <View style={styles.things_list_view_wrap}>
        <Pressable style={styles.things_list_item_view}>
          <Text style={styles.things_item_text}>Talk to us</Text>
        </Pressable>

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
            rightComponent={<BackChevronDownIcon />}
            backgroundColor="#fafafa00"
            containerStyle={styles.header_container_style}
          />
          <Image
            source={require('/Users/san/Desktop/toastgo/assets/zcool_aye_logo.png')}
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

export default TheAyeScreen;

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
    width: windowWidth * 0.65,
    height: windowWidth * 0.25,
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
    backgroundColor: '#FFFFFF75',
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
