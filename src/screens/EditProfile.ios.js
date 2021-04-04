import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Avatar, Button} from 'react-native-elements';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function EditProfile({navigation}) {
  const [username, setUsername] = useState('anarchy');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header_text}>edit profile</Text>
      <View style={styles.username_edit_view_wrap}>
        <Text style={styles.item_title_text}>username</Text>
        <TextInput
          style={styles.username_input}
          maxLength={14}
          defaultValue={username}
        />
      </View>
      <View style={styles.dp_edit_view_wrap}>
        <Text style={styles.item_title_text}>display picture</Text>
      </View>
      <View style={styles.save_button_view_wrap}>
        <Button
          raised
          buttonStyle={styles.save_button_style}
          containerStyle={styles.save_button_container_style}
          titleStyle={styles.save_button_title_style}
          title="save changes"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header_text: {
    fontFamily: 'GothamRounded-Bold',
    fontSize: 21,
    alignSelf: 'center',
    marginVertical: 20,
  },
  save_button_title_style: {
    fontFamily: 'GothamRounded-Medium',
    fontSize: 15,
    color: '#fafafa',
  },
  save_button_style: {
    height: 50,
    width: 140,
    borderRadius: 25,
    backgroundColor: '#36b37e',
  },
  save_button_container_style: {},
  item_title_text: {
    fontFamily: 'GothamRounded-Book',
    color: '#050505',
    fontSize: 15,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },

  username_input: {
    backgroundColor: '#f0f0f0',
    fontFamily: 'GothamRounded-Medium',
    fontSize: 17,
    color: '#050505',
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    borderRadius: 10,
  },
  dp_edit_view_wrap: {
    marginHorizontal: 20,
    marginVertical: windowHeight * 0.025,
    height: windowHeight * 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username_edit_view_wrap: {
    marginHorizontal: 20,
    marginVertical: windowHeight * 0.025,
    height: windowHeight * 0.1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  save_button_view_wrap: {
    marginHorizontal: 20,
    marginVertical: windowHeight * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
